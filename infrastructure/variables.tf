# Google Cloud general variables
variable "gc_billing_account_id" {
  type        = string
  description = "Google Cloud billing account ID"
  nullable    = false
}

# Google Cloud project variables
variable "gc_project_id" {
  type        = string
  description = "ID of the Google Cloud project"
  nullable    = false
}
variable "gc_project_name" {
  type        = string
  description = "Name of the Google Cloud project"
  nullable    = false
}

# Firebase variables
variable "fb_database_location" {
  type        = string
  description = "Location where the database will be created"
  nullable    = false
}
variable "fb_storage_location" {
  type        = string
  description = "Location where the storage bucket will be created"
  nullable    = false
}
variable "fb_web_app_name" {
  type        = string
  description = "Name of the Web Application"
  nullable    = false
}

# GitHub variables
variable "gh_repository_name" {
  type        = string
  description = "Name of the Web Application"
  nullable    = false
}