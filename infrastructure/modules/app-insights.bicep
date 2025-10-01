// ============================================================================
// Application Insights Module
// ============================================================================
// Provisions Application Insights for application performance monitoring,
// user analytics, and error tracking linked to Log Analytics.
// ============================================================================

@description('Azure region for Application Insights')
param location string

@description('Environment name (dev, prod)')
param environment string

@description('Project name for resource naming')
param projectName string

@description('Resource tags')
param tags object

@description('Log Analytics Workspace ID')
param workspaceId string

@description('Application type')
param applicationType string = 'web'

@description('Sampling percentage (reduce costs by sampling telemetry)')
param samplingPercentage int = (environment == 'prod' ? 100 : 50)

// ============================================================================
// VARIABLES
// ============================================================================

var appInsightsName = 'ai-${projectName}-${environment}'

// ============================================================================
// APPLICATION INSIGHTS
// ============================================================================

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  tags: tags
  kind: applicationType
  properties: {
    Application_Type: applicationType
    WorkspaceResourceId: workspaceId

    // Sampling configuration
    SamplingPercentage: samplingPercentage

    // Retention
    RetentionInDays: (environment == 'prod' ? 90 : 30)

    // Ingestion mode
    IngestionMode: 'LogAnalytics'

    // Public network access
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// ============================================================================
// OUTPUTS
// ============================================================================

output appInsightsId string = appInsights.id
output appInsightsName string = appInsights.name
output instrumentationKey string = appInsights.properties.InstrumentationKey
output connectionString string = appInsights.properties.ConnectionString
