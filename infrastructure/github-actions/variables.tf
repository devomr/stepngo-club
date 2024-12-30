# Google Cloud project variables
variable "gc_project_id" {
  type        = string
  description = "ID of the Google Cloud project"
  nullable    = false
}

# GitHub variables
variable "gh_repository_name" {
  type        = string
  description = "Name of the Web Application"
  nullable    = false
}