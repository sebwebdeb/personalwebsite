// ============================================================================
// Storage Account Module
// ============================================================================
// Provisions Azure Storage Account for blog images and static assets with
// blob containers, lifecycle management, and security configurations.
// ============================================================================

@description('Azure region for the storage account')
param location string

@description('Environment name (dev, prod)')
param environment string

@description('Project name for resource naming')
param projectName string

@description('Resource tags')
param tags object

@description('Log Analytics Workspace ID for diagnostics')
param workspaceId string

// ============================================================================
// VARIABLES
// ============================================================================

// Storage account names must be 3-24 characters, lowercase letters and numbers only
var storageAccountName = 'st${projectName}${environment}${uniqueString(resourceGroup().id)}'

// ============================================================================
// STORAGE ACCOUNT
// ============================================================================

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: take(toLower(replace(storageAccountName, '-', '')), 24)
  location: location
  tags: tags
  sku: {
    name: 'Standard_LRS' // Locally redundant storage (cost-effective for non-critical data)
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: false // Security best practice: disable public blob access
    minimumTlsVersion: 'TLS1_2' // Enforce TLS 1.2 minimum
    supportsHttpsTrafficOnly: true // HTTPS only

    // Blob soft delete (data recovery)
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: true
      days: 7
    }

    // Network rules
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Allow' // Can be set to 'Deny' with specific allow rules for production
    }
  }
}

// ============================================================================
// BLOB SERVICE
// ============================================================================

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

// ============================================================================
// BLOB CONTAINERS
// ============================================================================

resource blogImagesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'blog-images'
  properties: {
    publicAccess: 'None' // Private container
  }
}

resource documentsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'documents'
  properties: {
    publicAccess: 'None'
  }
}

resource backupsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'backups'
  properties: {
    publicAccess: 'None'
  }
}

// ============================================================================
// LIFECYCLE MANAGEMENT POLICY
// ============================================================================
// Move older blobs to Cool tier to reduce costs

resource lifecyclePolicy 'Microsoft.Storage/storageAccounts/managementPolicies@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    policy: {
      rules: [
        {
          name: 'move-old-images-to-cool'
          enabled: true
          type: 'Lifecycle'
          definition: {
            filters: {
              blobTypes: [
                'blockBlob'
              ]
              prefixMatch: [
                'blog-images/'
              ]
            }
            actions: {
              baseBlob: {
                tierToCool: {
                  daysAfterModificationGreaterThan: 90
                }
                tierToArchive: {
                  daysAfterModificationGreaterThan: 365
                }
              }
            }
          }
        }
        {
          name: 'delete-old-backups'
          enabled: true
          type: 'Lifecycle'
          definition: {
            filters: {
              blobTypes: [
                'blockBlob'
              ]
              prefixMatch: [
                'backups/'
              ]
            }
            actions: {
              baseBlob: {
                delete: {
                  daysAfterModificationGreaterThan: 30
                }
              }
            }
          }
        }
      ]
    }
  }
}

// ============================================================================
// DIAGNOSTIC SETTINGS
// ============================================================================

resource diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'blob-diagnostics'
  scope: blobService
  properties: {
    workspaceId: workspaceId
    logs: [
      {
        category: 'StorageRead'
        enabled: true
        retentionPolicy: {
          enabled: true
          days: 30
        }
      }
      {
        category: 'StorageWrite'
        enabled: true
        retentionPolicy: {
          enabled: true
          days: 30
        }
      }
      {
        category: 'StorageDelete'
        enabled: true
        retentionPolicy: {
          enabled: true
          days: 30
        }
      }
    ]
    metrics: [
      {
        category: 'Transaction'
        enabled: true
        retentionPolicy: {
          enabled: true
          days: 30
        }
      }
    ]
  }
}

// ============================================================================
// OUTPUTS
// ============================================================================

output storageAccountId string = storageAccount.id
output storageAccountName string = storageAccount.name
output blobEndpoint string = storageAccount.properties.primaryEndpoints.blob
output blogImagesContainerName string = blogImagesContainer.name
output documentsContainerName string = documentsContainer.name
