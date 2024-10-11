# Configure the AWS Provider
provider "aws" {
  region = "us-west-2"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "file-storage-vpc"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "file-storage-public-subnet"
  }
}

# Private Subnet
resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  
  tags = {
    Name = "file-storage-private-subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "file-storage-igw"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "file-storage-cluster"
}

# ECR Repository
resource "aws_ecr_repository" "app" {
  name = "file-storage-app"
}

# S3 Bucket for File Storage
resource "aws_s3_bucket" "file_storage" {
  bucket = "file-storage-app-bucket"
}

# RDS Instance for PostgreSQL
resource "aws_db_instance" "postgres" {
  engine         = "postgres"
  engine_version = "13.7"
  instance_class = "db.t3.micro"
  db_name           = "filestorage"
  username       = "admin"
  password       = "changeme"  # Use AWS Secrets Manager in production
  
  allocated_storage = 20
  storage_type      = "gp2"
  
  multi_az               = false
  db_subnet_group_name   = aws_db_subnet_group.private.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  
  skip_final_snapshot = true
}

# ElastiCache for Redis
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "file-storage-cache"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  port                 = 6379
  
  subnet_group_name    = aws_elasticache_subnet_group.private.name
  security_group_ids   = [aws_security_group.redis.id]
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "file-storage-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public.id]
}

# Security Groups (simplified for brevity)
resource "aws_security_group" "alb" {
  name        = "file-storage-alb-sg"
  description = "ALB Security Group"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs" {
  name        = "file-storage-ecs-sg"
  description = "ECS Security Group"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.alb.id]
  }
}

resource "aws_security_group" "rds" {
  name        = "file-storage-rds-sg"
  description = "RDS Security Group"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }
}

resource "aws_security_group" "redis" {
  name        = "file-storage-redis-sg"
  description = "Redis Security Group"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }
}

# Subnet groups
resource "aws_db_subnet_group" "private" {
  name       = "file-storage-db-subnet-group"
  subnet_ids = [aws_subnet.private.id]
}

resource "aws_elasticache_subnet_group" "private" {
  name       = "file-storage-cache-subnet-group"
  subnet_ids = [aws_subnet.private.id]
}