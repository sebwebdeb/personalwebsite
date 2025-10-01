// ============================================================================
// Main Bicep Template - Personal Portfolio Infrastructure
// ============================================================================
// This template orchestrates the deployment of all Azure resources for the
// personal portfolio website, demonstrating enterprise-level IaC practices.
// ============================================================================

targetScope = 'subscription'

// ============================================================================
// PARAMETERS
// ============================================================================

@description('Environment name (dev, prod)')
@allowed([
  'dev'
  'prod'
])
param environment string

@description('Primary Azure region for resources')
param location string = 'eastus'

@description('Project name for resource naming')
param projectName string = 'portfolio'

@description('Owner name for tagging')
param ownerName string

@description('GitHub repository URL for Static Web App')
param githubRepoUrl string = ''

@description('GitHub repository branch')
param githubBranch string = 'main'

@description('GitHub repository token (optional, for automated setup)')
@secure()
param githubToken string = ''

@description('Deploy Front Door (typically only for production)')
param deployFrontDoor bool = false

@description('Your email address for budget alerts')
param alertEmail string

// ============================================================================
// VARIABLES
// ============================================================================

var resourceGroupName = 'rg-${projectName}-${environment}'
var tags = {
  Environment: environment
  Project: 'PersonalPortfolio'
  Owner: ownerName
  CostCenter: 'Personal'
  ManagedBy: 'Bicep'
  ApplicationName: 'Portfolio-Website'
  DataClassification: 'Public'
  Criticality: environment == 'prod' ? 'Medium' : 'Low'
}

// ============================================================================
// RESOURCE GROUP
// ============================================================================

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

// ============================================================================
// LOG ANALYTICS WORKSPACE
// ============================================================================

module logAnalytics 'modules/log-analytics.bicep' = {
  scope: rg
  name: 'deploy-log-analytics-${environment}'
  params: {
    location: location
    environment: environment
    projectName: projectName
    tags: tags
  }
}

// ============================================================================
// APPLICATION INSIGHTS
// ============================================================================

module appInsights 'modules/app-insights.bicep' = {
  scope: rg
  name: 'deploy-app-insights-${environment}'
  params: {
    location: location
    environment: environment
    projectName: projectName
    tags: tags
    workspaceId: logAnalytics.outputs.workspaceId
  }
  dependsOn: [
    logAnalytics
  ]
}

// ============================================================================
// KEY VAULT
// ============================================================================

module keyVault 'modules/key-vault.bicep' = {
  scope: rg
  name: 'deploy-key-vault-${environment}'
  params: {
    location: location
    environment: environment
    projectName: projectName
    tags: tags
    workspaceId: logAnalytics.outputs.workspaceId
  }
  dependsOn: [
    logAnalytics
  ]
}

// ============================================================================
// STORAGE ACCOUNT
// ============================================================================

module storage 'modules/storage-account.bicep' = {
  scope: rg
  name: 'deploy-storage-${environment}'
  params: {
    location: location
    environment: environment
    projectName: projectName
    tags: tags
    workspaceId: logAnalytics.outputs.workspaceId
  }
  dependsOn: [
    logAnalytics
  ]
}

// ============================================================================
// STATIC WEB APP
// ============================================================================

module staticWebApp 'modules/static-web-app.bicep' = {
  scope: rg
  name: 'deploy-static-web-app-${environment}'
  params: {
    location: location == 'eastus' ? 'eastus2' : location // Static Web Apps not available in all regions
    environment: environment
    projectName: projectName
    tags: tags
    appInsightsConnectionString: appInsights.outputs.connectionString
    appInsightsInstrumentationKey: appInsights.outputs.instrumentationKey
    githubRepoUrl: githubRepoUrl
    githubBranch: githubBranch
    githubToken: githubToken
  }
  dependsOn: [
    appInsights
    keyVault
  ]
}

// ============================================================================
// RBAC - Grant Static Web App Access to Key Vault
// ============================================================================

module keyVaultRbac 'modules/key-vault-rbac.bicep' = {
  scope: rg
  name: 'deploy-key-vault-rbac-${environment}'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    staticWebAppPrincipalId: staticWebApp.outputs.systemAssignedIdentityPrincipalId
  }
  dependsOn: [
    keyVault
    staticWebApp
  ]
}

// ============================================================================
// FRONT DOOR (Optional - Production Only)
// ============================================================================

module frontDoor 'modules/front-door.bicep' = if (deployFrontDoor) {
  scope: rg
  name: 'deploy-front-door-${environment}'
  params: {
    environment: environment
    projectName: projectName
    tags: tags
    staticWebAppDefaultHostname: staticWebApp.outputs.defaultHostname
    workspaceId: logAnalytics.outputs.workspaceId
  }
  dependsOn: [
    staticWebApp
    logAnalytics
  ]
}

// ============================================================================
// BUDGET ALERT
// ============================================================================

module budget 'modules/budget.bicep' = {
  scope: subscription()
  name: 'deploy-budget-${environment}'
  params: {
    budgetName: 'budget-${projectName}-${environment}'
    amount: environment == 'prod' ? 30 : 10
    resourceGroupId: rg.id
    contactEmails: [
      alertEmail
    ]
  }
  dependsOn: [
    rg
  ]
}

// ============================================================================
// OUTPUTS
// ============================================================================

output resourceGroupName string = rg.name
output location string = location
output environment string = environment

// Log Analytics
output logAnalyticsWorkspaceId string = logAnalytics.outputs.workspaceId
output logAnalyticsWorkspaceName string = logAnalytics.outputs.workspaceName

// Application Insights
output appInsightsName string = appInsights.outputs.appInsightsName
output appInsightsConnectionString string = appInsights.outputs.connectionString
output appInsightsInstrumentationKey string = appInsights.outputs.instrumentationKey

// Key Vault
output keyVaultName string = keyVault.outputs.keyVaultName
output keyVaultUri string = keyVault.outputs.keyVaultUri

// Storage Account
output storageAccountName string = storage.outputs.storageAccountName
output blobEndpoint string = storage.outputs.blobEndpoint

// Static Web App
output staticWebAppName string = staticWebApp.outputs.staticWebAppName
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppId string = staticWebApp.outputs.staticWebAppId

// Front Door (if deployed)
output frontDoorEndpoint string = deployFrontDoor ? frontDoor.outputs.frontDoorEndpoint : ''
output frontDoorId string = deployFrontDoor ? frontDoor.outputs.frontDoorId : ''

// Instructions
output nextSteps string = '''
========================================
Deployment Complete! Next Steps:
========================================

1. Add secrets to Key Vault:
   az keyvault secret set --vault-name ${keyVault.outputs.keyVaultName} --name "EMAIL-SMTP-USER" --value "your-email@protonmail.com"
   az keyvault secret set --vault-name ${keyVault.outputs.keyVaultName} --name "EMAIL-SMTP-PASSWORD" --value "your-app-password"
   az keyvault secret set --vault-name ${keyVault.outputs.keyVaultName} --name "RECIPIENT-EMAIL-ADDRESS" --value "recipient@email.com"

2. Configure Static Web App environment variables in Azure Portal:
   - Navigate to: Configuration > Application settings
   - Add Key Vault references for secrets

3. View your website at:
   https://${staticWebApp.outputs.defaultHostname}

4. Monitor with Application Insights:
   https://portal.azure.com/#resource${appInsights.outputs.appInsightsId}

5. Upload blog images to storage:
   Storage Account: ${storage.outputs.storageAccountName}
   Container: blog-images

========================================
'''
