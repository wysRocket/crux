# Configure the AWS provider
provider "aws" {
  region = "us-east-2"
}

# Cognito User Pool
resource "aws_cognito_user_pool" "crux_pool" {
  name = "crux-user-pool"

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  auto_verified_attributes = ["email"]

  schema {
    attribute_data_type = "String"
    name                = "email"
    required            = true
    mutable             = true
  }
}

resource "aws_cognito_user_pool_client" "crux_client" {
  name         = "crux-app-client"
  user_pool_id = aws_cognito_user_pool.crux_pool.id

  generate_secret     = false
  explicit_auth_flows = ["ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
}

# DynamoDB Table
resource "aws_dynamodb_table" "crux_table" {
  name           = "crux"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "pp-key"

  attribute {
    name = "pp-key"
    type = "S"
  }

  attribute {
    name = "UserID"
    type = "S"
  }

  global_secondary_index {
    name               = "UserIDIndex"
    hash_key           = "UserID"
    projection_type    = "ALL"
  }

  tags = {
    Name        = "crux-table"
    Environment = "production"
  }

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
}


# S3 Bucket
resource "aws_s3_bucket" "crux_bucket" {
  bucket = "crux-file-storage"
}

resource "aws_s3_bucket_ownership_controls" "crux_bucket_ownership" {
  bucket = aws_s3_bucket.crux_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "crux_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.crux_bucket_ownership]

  bucket = aws_s3_bucket.crux_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "crux_bucket_versioning" {
  bucket = aws_s3_bucket.crux_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "crux_bucket_lifecycle" {
  bucket = aws_s3_bucket.crux_bucket.id

  rule {
    id     = "transition-to-ia-and-glacier"
    status = "Enabled"

    transition {
      days          = 75
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 365
      storage_class = "GLACIER_IR"
    }

    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }
}


resource "aws_s3_bucket_public_access_block" "crux_bucket_block" {
  bucket = aws_s3_bucket.crux_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Lambda Functions
resource "aws_iam_role" "lambda_role" {
  name = "crux-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_lambda_function" "presign_url" {
  filename      = "lambda_function.zip"  # You need to create this zip file
  function_name = "crux-presign-url"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
}

resource "aws_lambda_function" "db_ops" {
  filename      = "lambda_function.zip"  # You need to create this zip file
  function_name = "crux-db-ops"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
}

# API Gateway
resource "aws_api_gateway_rest_api" "crux_api" {
  name        = "cruxAPI"
  description = "API for crux operations"
}

resource "aws_api_gateway_resource" "presign_url" {
  rest_api_id = aws_api_gateway_rest_api.crux_api.id
  parent_id   = aws_api_gateway_rest_api.crux_api.root_resource_id
  path_part   = "presign-url"
}

resource "aws_api_gateway_method" "presign_url_post" {
  rest_api_id   = aws_api_gateway_rest_api.crux_api.id
  resource_id   = aws_api_gateway_resource.presign_url.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

resource "aws_api_gateway_integration" "presign_url_lambda" {
  rest_api_id = aws_api_gateway_rest_api.crux_api.id
  resource_id = aws_api_gateway_resource.presign_url.id
  http_method = aws_api_gateway_method.presign_url_post.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.presign_url.invoke_arn
}

resource "aws_api_gateway_authorizer" "cognito" {
  name          = "cognito-authorizer"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = aws_api_gateway_rest_api.crux_api.id
  provider_arns = [aws_cognito_user_pool.crux_pool.arn]
}

# CloudFront
resource "aws_cloudfront_distribution" "crux_distribution" {
  origin {
    domain_name = aws_s3_bucket.crux_bucket.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.crux_bucket.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.crux_oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.crux_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_access_identity" "crux_oai" {
  comment = "OAI for crux S3 bucket"
}

# EC2 and Auto Scaling
resource "aws_launch_template" "crux_template" {
  name_prefix   = "crux-template"
  image_id      = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI (adjust as needed)
  instance_type = "t2.micro"

  user_data = base64encode(<<-EOF
              #!/bin/bash
              echo "Hello from crux EC2 instance" > index.html
              nohup python -m SimpleHTTPServer 80 &
              EOF
  )

  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.crux_sg.id]
  }
}

resource "aws_autoscaling_group" "crux_asg" {
  desired_capacity    = 2
  max_size            = 4
  min_size            = 1
  target_group_arns   = [aws_lb_target_group.crux_tg.arn]
  vpc_zone_identifier = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  launch_template {
    id      = aws_launch_template.crux_template.id
    version = "$Latest"
  }
}

# Load Balancer
resource "aws_lb" "crux_alb" {
  name               = "crux-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}

resource "aws_lb_target_group" "crux_tg" {
  name     = "crux-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

# Route 53
resource "aws_route53_zone" "crux_zone" {
  name = "crux-app.site"
}

resource "aws_route53_record" "crux_record" {
  zone_id = aws_route53_zone.crux_zone.zone_id
  name    = "crux-app.site"
  type    = "A"

  alias {
    name                   = aws_lb.crux_alb.dns_name
    zone_id                = aws_lb.crux_alb.zone_id
    evaluate_target_health = true
  }
}

# VPC and Networking 
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "crux-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "crux-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "crux-public-rt"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-2a"
  map_public_ip_on_launch = true

  tags = {
    Name = "crux-public-1"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-2b"
  map_public_ip_on_launch = true

  tags = {
    Name = "crux-public-2"
  }
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "crux_sg" {
  name        = "crux-sg"
  description = "Security group for crux EC2 instances"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb_sg" {
  name        = "crux-alb-sg"
  description = "Security group for crux ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}