// ============================================================================
// Log Analytics Workspace Module
// ============================================================================
// Creates a Log Analytics Workspace for centralized logging and monitoring.
// All Azure resources will send diagnostic logs here for analysis.
// ============================================================================

@description('Azure region for the workspace')
param location string

@description('Environment name (dev, prod)')
param environment string

@description('Project name for resource naming')
param projectName string

@description('Resource tags')
param tags object

@description('Data retention period in days')
param retentionInDays int = (environment == 'prod' ? 90 : 30)

@description('Daily data cap in GB (helps control costs)')
param dailyQuotaGb int = (environment == 'prod' ? 5 : 1)

// ============================================================================
// VARIABLES
// ============================================================================

var workspaceName = 'law-${projectName}-${environment}'

// ============================================================================
// LOG ANALYTICS WORKSPACE
// ============================================================================

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018' // Pay-as-you-go pricing
    }
    retentionInDays: retentionInDays
    workspaceCapping: {
      dailyQuotaGb: dailyQuotaGb
    }
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// ============================================================================
// OUTPUTS
// ============================================================================

output workspaceId string = logAnalyticsWorkspace.id
output workspaceName string = logAnalyticsWorkspace.name
output customerId string = logAnalyticsWorkspace.properties.customerId
