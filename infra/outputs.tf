# Outputs
output "dynamodb_table_name" {
  description = "crux"
  value       = aws_dynamodb_table.crux_table.name
}

output "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table"
  value       = aws_dynamodb_table.crux_table.arn
}