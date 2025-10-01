# Azure Infrastructure (Bicep)

Enterprise-grade Azure infrastructure for personal portfolio website, demonstrating cloud engineering best practices with Infrastructure as Code.

## Quick Start

```powershell
# Deploy to development
.\scripts\deploy.ps1 -Environment dev

# Deploy to production
.\scripts\deploy.ps1 -Environment prod

# Preview changes without deploying
.\scripts\deploy.ps1 -Environment prod -WhatIf
```

## Architecture

```
Azure Subscription
└── Resource Group (rg-portfolio-{env})
    ├── Key Vault (secrets management)
    ├── Static Web App (frontend + API)
    ├── Application Insights (monitoring)
    ├── Log Analytics Workspace (logging)
    ├── Storage Account (blog images)
    └── Front Door (CDN, WAF, DDoS) [prod only]
```

## Directory Structure

```
infrastructure/
├── main.bicep                  # Main orchestration template
├── modules/                    # Modular Bicep templates
│   ├── key-vault.bicep
│   ├── key-vault-rbac.bicep
│   ├── log-analytics.bicep
│   ├── app-insights.bicep
│   ├── storage-account.bicep
│   ├── static-web-app.bicep
│   ├── front-door.bicep
│   └── budget.bicep
├── parameters/                 # Environment-specific parameters
│   ├── dev.bicepparam
│   └── prod.bicepparam
├── scripts/                    # Deployment automation
│   └── deploy.ps1
└── docs/                       # Documentation
    └── DEPLOYMENT-GUIDE.md
```

## Skills Demonstrated

✅ Infrastructure as Code (Bicep)
✅ Azure Key Vault + Managed Identity
✅ Application Insights + Log Analytics
✅ Azure Static Web Apps
✅ Azure Front Door (CDN, WAF, DDoS)
✅ RBAC + Least-Privilege Access
✅ Budget Alerts + Cost Management
✅ Tagging Strategy + Governance
✅ Diagnostic Settings + Monitoring
✅ Security Best Practices

## Resources Created

| Resource | Purpose | Estimated Cost/Month |
|----------|---------|---------------------|
| Key Vault | Secrets management | $0.10 |
| Static Web App | Frontend + API hosting | $0-9 (Free-Standard) |
| App Insights | Monitoring & analytics | $2-5 |
| Log Analytics | Centralized logging | $0.50-2 |
| Storage Account | Blob storage for images | $1-2 |
| Front Door | CDN, WAF, DDoS [prod] | $5-10 |
| **Total** | | **$8.60-28.10** |

## Prerequisites

- Azure CLI (`az --version`)
- Bicep CLI (`az bicep version`)
- Azure subscription with Contributor access
- PowerShell 7+ (for deployment script)

## Deployment

See [DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md) for detailed instructions.

### Basic Deployment

1. **Update parameters**:
   Edit `parameters/prod.bicepparam` with your information:
   ```bicep
   param ownerName = 'Your Name'
   param alertEmail = 'your.email@example.com'
   param githubRepoUrl = 'https://github.com/username/repo'
   ```

2. **Login to Azure**:
   ```powershell
   az login
   az account set --subscription "YOUR-SUBSCRIPTION-ID"
   ```

3. **Deploy**:
   ```powershell
   .\scripts\deploy.ps1 -Environment prod
   ```

4. **Add secrets to Key Vault**:
   ```powershell
   az keyvault secret set --vault-name kv-portfolio-prod-UNIQUE --name "EMAIL-SMTP-USER" --value "your.email@protonmail.com"
   az keyvault secret set --vault-name kv-portfolio-prod-UNIQUE --name "EMAIL-SMTP-PASSWORD" --value "your-app-password"
   az keyvault secret set --vault-name kv-portfolio-prod-UNIQUE --name "RECIPIENT-EMAIL-ADDRESS" --value "recipient@email.com"
   ```

## Security Features

- **Managed Identity**: Static Web App uses managed identity to access Key Vault (no hard-coded credentials)
- **RBAC**: Least-privilege access control via Azure RBAC
- **Encryption**: TLS 1.2 minimum, data encrypted at rest and in transit
- **Soft Delete**: Enabled on Key Vault and Storage (7-90 day recovery)
- **WAF**: Web Application Firewall with OWASP rules (production)
- **Audit Logs**: All operations logged to Log Analytics

## Monitoring & Observability

- **Application Insights**: Performance, errors, user analytics
- **Log Analytics**: Centralized logging with KQL queries
- **Diagnostic Settings**: Enabled on all resources
- **Budget Alerts**: Email notifications at 50%, 75%, 90%, 100%

## Cost Optimization

- Dev environment uses Free tier Static Web Apps
- Application Insights sampling (50% dev, 100% prod)
- Storage lifecycle policies (Cool tier after 90 days)
- Front Door only deployed in production
- Daily quota caps on Log Analytics

## Teardown

```powershell
# Delete all resources
az group delete --name rg-portfolio-prod --yes --no-wait

# Delete budget
az consumption budget delete --budget-name budget-portfolio-prod
```

## Documentation

- [INFRASTRUCTURE.md](../INFRASTRUCTURE.md) - Complete architecture and planning document
- [DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md) - Step-by-step deployment instructions

## Interview Talking Points

See [../INFRASTRUCTURE.md#interview-talking-points](../INFRASTRUCTURE.md#interview-talking-points) for prepared responses about this infrastructure.

---

**Built for**: Junior Azure Cloud Engineer role preparation
**Demonstrates**: Enterprise-level cloud engineering skills
**Total Cost**: ~$20/month for full production stack
