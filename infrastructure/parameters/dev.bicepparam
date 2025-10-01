// ============================================================================
// Development Environment Parameters
// ============================================================================
// Parameter file for deploying development/testing infrastructure
// ============================================================================

using '../main.bicep'

// ============================================================================
// REQUIRED PARAMETERS - UPDATE THESE VALUES
// ============================================================================

param environment = 'dev'
param location = 'eastus'
param projectName = 'portfolio'
param ownerName = 'Sebastian Mateus'

// GitHub Configuration (optional)
param githubRepoUrl = 'https://github.com/YOUR-USERNAME/personal-website'
param githubBranch = 'dev'

// Budget Alert Email
param alertEmail = 'contact@sebastianmateus.com'

// Skip Front Door in dev to save costs
param deployFrontDoor = false
