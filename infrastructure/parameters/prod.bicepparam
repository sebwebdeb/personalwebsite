// ============================================================================
// Production Environment Parameters
// ============================================================================
// Parameter file for deploying production infrastructure
// ============================================================================

using '../main.bicep'

// ============================================================================
// REQUIRED PARAMETERS - UPDATE THESE VALUES
// ============================================================================

param environment = 'prod'
param location = 'eastus'
param projectName = 'portfolio'
param ownerName = 'Sebastian Mateus'

// GitHub Configuration (optional - can deploy manually via GitHub Actions)
param githubRepoUrl = 'https://github.com/YOUR-USERNAME/personal-website'
param githubBranch = 'main'
// GitHub token should be provided via command line for security:
// --parameters githubToken=$GITHUB_TOKEN

// Budget Alert Email
param alertEmail = 'contact@sebastianmateus.com'

// Deploy Front Door in production for global CDN and WAF
param deployFrontDoor = true
