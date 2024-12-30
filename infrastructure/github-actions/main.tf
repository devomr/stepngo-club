locals {
  services = toset([
    # MUST-HAVE for GitHub Actions setup
    "iam.googleapis.com",                  # Identity and Access Management (IAM) API
    "iamcredentials.googleapis.com",       # IAM Service Account Credentials API
    "cloudresourcemanager.googleapis.com", # Cloud Resource Manager API
    "sts.googleapis.com",                  # Security Token Service API

    # You can add more apis to enable in the project
  ])

  roles = [
    "roles/resourcemanager.projectIamAdmin", # GitHub Actions identity
    "roles/owner",                           # owner is required to create the Firestore DB
  ]
  github_repository_name = var.gh_repository_name # e.g. yourname/yourrepo
}

resource "google_project_service" "service" {
  project = var.gc_project_id

  for_each = local.services
  service  = each.key

  # Don't disable the service if the resource block is removed by accident.
  disable_on_destroy = false
}

resource "google_service_account" "github_actions" {
  project      = var.gc_project_id
  account_id   = "github-actions"
  display_name = "GitHub Actions"
  description  = "Link to Workload Identity Pool used by GitHub Actions"
}

# Allow to access all resources
resource "google_project_iam_member" "roles" {
  project = var.gc_project_id
  for_each = {
    for role in local.roles : role => role
  }
  role   = each.value
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_iam_workload_identity_pool" "github" {
  provider                  = google-beta
  project                   = var.gc_project_id
  workload_identity_pool_id = "github"
  display_name              = "github"
  description               = "For GitHub Actions"

  # Wait until the required APIs are enabled.
  depends_on = [
    google_project_service.service
  ]
}

resource "google_iam_workload_identity_pool_provider" "github" {
  provider                           = google-beta
  project                            = var.gc_project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "github actions provider"
  description                        = "OIDC identity pool provider for execute GitHub Actions"
  attribute_condition                = "assertion.repository=='${local.github_repository_name}'"
  # See. https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#understanding-the-oidc-token
  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.owner"      = "assertion.repository_owner"
    "attribute.refs"       = "assertion.ref"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }

  # Wait until the required APIs are enabled.
  depends_on = [
    google_project_service.service
  ]
}

resource "google_service_account_iam_member" "github_actions" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${local.github_repository_name}"
}

output "service_account_github_actions_email" {
  description = "Service Account used by GitHub Actions"
  value       = google_service_account.github_actions.email
}

output "google_iam_workload_identity_pool_provider_github_name" {
  description = "Workload Identity Pood Provider ID"
  value       = google_iam_workload_identity_pool_provider.github.name
}