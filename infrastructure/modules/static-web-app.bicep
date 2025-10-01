// ============================================================================
// Static Web App Module
// ============================================================================
// Provisions Azure Static Web Apps for hosting React frontend and
// Azure Functions backend with managed identity for Key Vault access.
// ============================================================================

@description('Azure region for Static Web App')
param location string

@description('Environment name (dev, prod)')
param environment string

@description('Project name for resource naming')
param projectName string

@description('Resource tags')
param tags object

@description('Application Insights Connection String')
param appInsightsConnectionString string

@description('Application Insights Instrumentation Key')
param appInsightsInstrumentationKey string

@description('GitHub repository URL')
param githubRepoUrl string = ''

@description('GitHub branch for deployment')
param githubBranch string = 'main'

@description('GitHub personal access token (optional)')
@secure()
param githubToken string = ''

@description('SKU tier (Free or Standard)')
@allowed([
  'Free'
  'Standard'
])
param sku string = (environment == 'prod' ? 'Standard' : 'Free')

// ============================================================================
// VARIABLES
// ============================================================================

var staticWebAppName = 'swa-${projectName}-${environment}'

// ============================================================================
// STATIC WEB APP
// ============================================================================

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  identity: {
    type: 'SystemAssigned' // Enable managed identity for Key Vault access
  }
  properties: {
    // GitHub integration (optional - can also deploy via Azure CLI/GitHub Actions)
    repositoryUrl: !empty(githubRepoUrl) ? githubRepoUrl : null
    branch: !empty(githubRepoUrl) ? githubBranch : null
    repositoryToken: !empty(githubToken) ? githubToken : null

    buildProperties: !empty(githubRepoUrl) ? {
      appLocation: '/'
      apiLocation: '/api'
      outputLocation: '/dist'
      appArtifactLocation: 'dist'
    } : null

    // Configuration
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: sku == 'Standard' ? 'Enabled' : 'Disabled'

    provider: !empty(githubRepoUrl) ? 'GitHub' : 'None'
  }
}

// ============================================================================
// APP SETTINGS (Environment Variables)
// ============================================================================
// Note: Key Vault references need to be added manually in Azure Portal or via CLI
// after deployment because Bicep doesn't support the @Microsoft.KeyVault() syntax
// in the appSettings property directly.
//
// After deployment, add these via Azure Portal or CLI:
// - APPINSIGHTS_INSTRUMENTATIONKEY = @Microsoft.KeyVault(SecretUri=...)
// - EMAIL_SMTP_USER = @Microsoft.KeyVault(SecretUri=...)
// - EMAIL_SMTP_PASSWORD = @Microsoft.KeyVault(SecretUri=...)
// - RECIPIENT_EMAIL_ADDRESS = @Microsoft.KeyVault(SecretUri=...)

resource appSettings 'Microsoft.Web/staticSites/config@2023-12-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    // Non-secret configuration
    APPINSIGHTS_INSTRUMENTATIONKEY: appInsightsInstrumentationKey
    APPLICATIONINSIGHTS_CONNECTION_STRING: appInsightsConnectionString
    NODE_ENV: environment
    FUNCTIONS_WORKER_RUNTIME: 'node'
  }
}

// ============================================================================
// OUTPUTS
// ============================================================================

output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output systemAssignedIdentityPrincipalId string = staticWebApp.identity.principalId
output deploymentToken string = staticWebApp.listSecrets().properties.apiKey
