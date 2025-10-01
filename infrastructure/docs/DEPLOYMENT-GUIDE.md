## Azure Infrastructure Deployment Guide

Complete guide for deploying the personal portfolio website infrastructure to Azure using Bicep.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Deployment Steps](#detailed-deployment-steps)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)
7. [Cost Management](#cost-management)
8. [Teardown](#teardown)

---

## Prerequisites

### Required Tools

1. **Azure CLI** (version 2.50.0 or higher)
   ```powershell
   # Install Azure CLI
   winget install Microsoft.AzureCLI

   # Verify installation
   az --version
   ```

2. **Bicep CLI**
   ```powershell
   # Install Bicep (via Azure CLI)
   az bicep install

   # Verify installation
   az bicep version
   ```

3. **Azure Subscription**
   - Active Azure subscription
   - Contributor or Owner role on the subscription
   - Sufficient quota for resources

### Azure Login

```powershell
# Login to Azure
az login

# List subscriptions
az account list --output table

# Set active subscription
az account set --subscription "YOUR-SUBSCRIPTION-ID"

# Verify current subscription
az account show
```

---

## Quick Start

### Option 1: Using PowerShell Script (Recommended)

```powershell
# Navigate to infrastructure directory
cd infrastructure

# Deploy development environment
.\scripts\deploy.ps1 -Environment dev

# Deploy production environment
.\scripts\deploy.ps1 -Environment prod

# Run What-If analysis (preview changes without deploying)
.\scripts\deploy.ps1 -Environment prod -WhatIf
```

### Option 2: Using Azure CLI Directly

```powershell
# Deploy to development
az deployment sub create \
  --name portfolio-dev-deployment \
  --location eastus \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/dev.bicepparam

# Deploy to production
az deployment sub create \
  --name portfolio-prod-deployment \
  --location eastus \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/prod.bicepparam
```

---

## Detailed Deployment Steps

### Step 1: Prepare Configuration

1. **Update parameter files** with your information:

   Edit `infrastructure/parameters/prod.bicepparam`:
   ```bicep
   param ownerName = 'YOUR NAME'
   param alertEmail = 'your.email@example.com'
   param githubRepoUrl = 'https://github.com/YOUR-USERNAME/personal-website'
   ```

   Edit `infrastructure/parameters/dev.bicepparam` similarly.

2. **Review resource naming**:
   - Resource names are generated automatically based on environment and project name
   - Ensure uniqueness by checking Azure naming conventions

### Step 2: Validate Templates

```powershell
# Validate Bicep syntax
az bicep build --file infrastructure/main.bicep

# Validate deployment (doesn't create resources)
az deployment sub validate \
  --location eastus \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/prod.bicepparam
```

### Step 3: Preview Changes (What-If)

```powershell
# See what resources will be created
az deployment sub what-if \
  --location eastus \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/prod.bicepparam
```

### Step 4: Deploy Infrastructure

```powershell
# Deploy using PowerShell script
.\infrastructure\scripts\deploy.ps1 -Environment prod

# OR deploy using Azure CLI
az deployment sub create \
  --name portfolio-prod-$(date +%Y%m%d-%H%M%S) \
  --location eastus \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/prod.bicepparam \
  --verbose
```

**Expected deployment time**: 5-10 minutes

### Step 5: Capture Deployment Outputs

```powershell
# Get deployment outputs
az deployment sub show \
  --name portfolio-prod-TIMESTAMP \
  --query properties.outputs

# Save to file
az deployment sub show \
  --name portfolio-prod-TIMESTAMP \
  --query properties.outputs > deployment-outputs.json
```

---

## Post-Deployment Configuration

### 1. Add Secrets to Key Vault

After deployment, add your email credentials to Key Vault:

```powershell
# Get Key Vault name from deployment outputs
$kvName = "kv-portfolio-prod-UNIQUE-ID"

# Add secrets
az keyvault secret set --vault-name $kvName --name "EMAIL-SMTP-USER" --value "your.email@protonmail.com"
az keyvault secret set --vault-name $kvName --name "EMAIL-SMTP-PASSWORD" --value "your-app-password"
az keyvault secret set --vault-name $kvName --name "RECIPIENT-EMAIL-ADDRESS" --value "recipient@email.com"

# Verify secrets
az keyvault secret list --vault-name $kvName --output table
```

### 2. Configure Static Web App Environment Variables

The Static Web App needs to reference Key Vault secrets:

```powershell
# Get resource details
$rgName = "rg-portfolio-prod"
$swaName = "swa-portfolio-prod"
$kvUri = "https://$kvName.vault.azure.net"

# Add Key Vault references to Static Web App
# Note: This must be done in Azure Portal UI currently
# Navigate to: Static Web App > Configuration > Application settings
```

**Add these app settings in Azure Portal**:

| Name | Value |
|------|-------|
| `EMAIL_SMTP_USER` | `@Microsoft.KeyVault(SecretUri=${kvUri}/secrets/EMAIL-SMTP-USER/)` |
| `EMAIL_SMTP_PASSWORD` | `@Microsoft.KeyVault(SecretUri=${kvUri}/secrets/EMAIL-SMTP-PASSWORD/)` |
| `RECIPIENT_EMAIL_ADDRESS` | `@Microsoft.KeyVault(SecretUri=${kvUri}/secrets/RECIPIENT-EMAIL-ADDRESS/)` |

### 3. Grant Your User Account Key Vault Access (Optional)

To manage secrets via Azure Portal:

```powershell
# Get your user object ID
$userObjectId = az ad signed-in-user show --query id -o tsv

# Assign Key Vault Administrator role
az role assignment create \
  --role "Key Vault Administrator" \
  --assignee $userObjectId \
  --scope /subscriptions/SUBSCRIPTION-ID/resourceGroups/$rgName/providers/Microsoft.KeyVault/vaults/$kvName
```

### 4. Configure GitHub Actions Deployment (Optional)

If you want GitHub Actions to deploy your app:

```powershell
# Get Static Web App deployment token
az staticwebapp secrets list \
  --name $swaName \
  --resource-group $rgName \
  --query properties.apiKey -o tsv
```

Add this token as a GitHub Secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`.

### 5. Upload Blog Images to Storage

```powershell
# Get storage account name
$storageName = "stportfolioprodUNIQUE"

# Upload images
az storage blob upload-batch \
  --account-name $storageName \
  --destination blog-images \
  --source ./public/blog-images \
  --auth-mode login
```

---

## Verification

### 1. Verify Resource Deployment

```powershell
# List all resources in resource group
az resource list \
  --resource-group rg-portfolio-prod \
  --output table

# Check resource states
az resource list \
  --resource-group rg-portfolio-prod \
  --query "[].{Name:name, Type:type, State:properties.provisioningState}" \
  --output table
```

### 2. Test Static Web App

```powershell
# Get Static Web App URL
$swaUrl = az staticwebapp show \
  --name swa-portfolio-prod \
  --resource-group rg-portfolio-prod \
  --query defaultHostname -o tsv

# Open in browser
Start-Process "https://$swaUrl"
```

### 3. Test Contact Form

Navigate to your website and submit a test contact form to verify:
- Form submission works
- Email is received
- No errors in Application Insights

### 4. Verify Monitoring

```powershell
# Check Application Insights data
az monitor app-insights component show \
  --app ai-portfolio-prod \
  --resource-group rg-portfolio-prod
```

Navigate to Azure Portal:
1. Go to Application Insights resource
2. View "Live Metrics" to see real-time data
3. Check "Failures" for any errors
4. Review "Performance" metrics

### 5. Test Front Door (Production Only)

```powershell
# Get Front Door endpoint
$fdEndpoint = az afd endpoint show \
  --resource-group rg-portfolio-prod \
  --profile-name fdp-portfolio-prod \
  --endpoint-name ep-portfolio-prod \
  --query hostName -o tsv

# Test endpoint
curl "https://$fdEndpoint"
```

---

## Troubleshooting

### Common Issues

#### Issue: "Resource name already exists"

**Solution**: Resource names must be globally unique. The templates use `uniqueString()` but you may need to:
```powershell
# Delete existing resources if it's yours
az group delete --name rg-portfolio-prod --yes
```

#### Issue: "Insufficient quota"

**Solution**: Request quota increase or choose a different region:
```powershell
# Check quota
az vm list-usage --location eastus --output table

# Try different region
.\scripts\deploy.ps1 -Environment prod -Location westus2
```

#### Issue: "Key Vault access denied"

**Solution**: Ensure managed identity has correct permissions:
```powershell
# Verify role assignment
az role assignment list \
  --scope /subscriptions/SUB-ID/resourceGroups/rg-portfolio-prod/providers/Microsoft.KeyVault/vaults/kv-portfolio-prod \
  --output table
```

#### Issue: "Static Web App deployment failed"

**Solution**: Check GitHub Actions workflow or deploy manually:
```powershell
# Get deployment token
$token = az staticwebapp secrets list --name swa-portfolio-prod --resource-group rg-portfolio-prod --query properties.apiKey -o tsv

# Deploy using Azure CLI
az staticwebapp deploy \
  --name swa-portfolio-prod \
  --resource-group rg-portfolio-prod \
  --app-location "/" \
  --api-location "/api" \
  --output-location "/dist"
```

### View Deployment Logs

```powershell
# List deployments
az deployment sub list --output table

# Get deployment details
az deployment sub show --name DEPLOYMENT-NAME

# View deployment operations
az deployment operation sub list --name DEPLOYMENT-NAME
```

### Enable Diagnostic Logging

```powershell
# View Activity Log
az monitor activity-log list \
  --resource-group rg-portfolio-prod \
  --max-events 50 \
  --output table
```

---

## Cost Management

### Monitor Costs

```powershell
# View cost analysis (PowerShell)
az consumption usage list \
  --start-date 2025-01-01 \
  --end-date 2025-01-31 \
  --output table

# Check budget alerts
az consumption budget list --resource-group rg-portfolio-prod
```

### Cost Optimization Tips

1. **Use Free/Standard tiers appropriately**:
   - Dev environment: Free tier Static Web Apps
   - Prod environment: Standard tier only if needed

2. **Enable Application Insights sampling**:
   - Already configured to 50% in dev, 100% in prod
   - Adjust in `app-insights.bicep` if needed

3. **Review Front Door usage**:
   - Only deployed in production
   - Monitor data transfer costs

4. **Set up alerts**:
   - Budget alerts already configured
   - Add custom cost alerts if needed

---

## Teardown

### Delete Resources

**Warning**: This will permanently delete all resources and data.

```powershell
# Delete resource group (and all resources)
az group delete --name rg-portfolio-prod --yes --no-wait

# Delete budget
az consumption budget delete \
  --budget-name budget-portfolio-prod

# Verify deletion
az group exists --name rg-portfolio-prod
```

### Purge Soft-Deleted Resources

Key Vault has purge protection enabled. To completely remove:

```powershell
# List deleted Key Vaults
az keyvault list-deleted

# Purge (only if purge protection is disabled)
az keyvault purge --name kv-portfolio-prod --location eastus
```

---

## Additional Resources

### Azure Documentation
- [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)
- [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [Azure Front Door](https://learn.microsoft.com/azure/frontdoor/)
- [Bicep Documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/)

### Azure Pricing
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)
- [Static Web Apps Pricing](https://azure.microsoft.com/pricing/details/app-service/static/)
- [Front Door Pricing](https://azure.microsoft.com/pricing/details/frontdoor/)

### Support
- [Azure Portal](https://portal.azure.com)
- [Azure Status](https://status.azure.com)
- [Azure Support](https://azure.microsoft.com/support/)

---

**Last Updated**: January 2025
**Maintained for**: Personal Portfolio Website Project
