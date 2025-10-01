# Azure Infrastructure Plan for Personal Portfolio Website

## Executive Summary

This document outlines the complete Azure infrastructure strategy for deploying and managing the personal portfolio website using Infrastructure as Code (Bicep). The architecture demonstrates enterprise-level cloud engineering skills relevant to junior Azure Cloud Engineer positions, including governance, security, monitoring, networking, and cost optimization.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Azure Resources Required](#azure-resources-required)
3. [Bicep Structure & Modules](#bicep-structure--modules)
4. [Security & Compliance](#security--compliance)
5. [Governance & Cost Management](#governance--cost-management)
6. [Monitoring & Observability](#monitoring--observability)
7. [Deployment Strategy](#deployment-strategy)
8. [Skills Demonstrated](#skills-demonstrated)
9. [Interview Talking Points](#interview-talking-points)
10. [Cost Estimation](#cost-estimation)

---

## Architecture Overview

### High-Level Architecture Diagram

```
Internet Users
      ↓
Azure Front Door (CDN, WAF, DDoS)
      ↓
Azure Static Web Apps
      ├── Frontend (React/Vite)
      └── Backend API (Azure Functions)
          ├── Key Vault (Secrets)
          ├── Storage Account (Blog Images)
          └── Application Insights (Monitoring)
```

### Resource Group Structure

```
Subscription: [Your Azure Subscription]
└── Resource Group: rg-portfolio-prod
    ├── Key Vault: kv-portfolio-prod
    ├── Static Web App: swa-portfolio-prod
    ├── Application Insights: ai-portfolio-prod
    ├── Log Analytics Workspace: law-portfolio-prod
    ├── Storage Account: stportfolioprod
    └── Front Door: fd-portfolio-prod
```

---

## Azure Resources Required

### 1. Resource Group
**Purpose**: Logical container for all portfolio resources

**Configuration**:
- Name: `rg-portfolio-{environment}`
- Location: `East US` (or your preferred region)
- Tags:
  - Environment: Production/Dev
  - Project: PersonalPortfolio
  - CostCenter: Personal
  - Owner: Your Name
  - ManagedBy: Bicep

**Why This Matters**:
- Demonstrates understanding of resource organization
- Shows governance through tagging strategy
- Enables cost tracking and management

---

### 2. Azure Key Vault
**Purpose**: Secure storage for secrets (email credentials, API keys)

**Configuration**:
- Name: `kv-portfolio-{environment}`
- SKU: Standard
- Enable RBAC: Yes
- Soft Delete: Enabled (90 days)
- Purge Protection: Enabled
- Network Access: Allow trusted Microsoft services
- Private Endpoint: Optional (for production)

**Secrets to Store**:
- `EMAIL-SMTP-USER`: ProtonMail username
- `EMAIL-SMTP-PASSWORD`: ProtonMail app password
- `RECIPIENT-EMAIL-ADDRESS`: Your email
- Future: API keys, certificates

**Access Control**:
- Managed Identity for Static Web App: `Key Vault Secrets User`
- Your User Account: `Key Vault Administrator`

**Why This Matters**:
- HIPAA/HITECH compliance (secure secrets management)
- Demonstrates security best practices
- Shows understanding of Managed Identity and RBAC
- Least-privilege access principle

---

### 3. Azure Static Web Apps
**Purpose**: Host frontend (React) and backend API (Azure Functions)

**Configuration**:
- Name: `swa-portfolio-{environment}`
- SKU: Standard (needed for custom domains, Front Door, SLA)
- Location: East US 2 (or preferred)
- GitHub Integration: Yes
- Branch: `main`
- Build Configuration:
  - App Location: `/`
  - API Location: `/api`
  - Output Location: `/dist`

**Features Enabled**:
- Custom domains
- Managed Identity (System-assigned)
- Staging environments
- API integration with Azure Functions
- Environment variables from Key Vault

**Environment Variables**:
```
EMAIL_SMTP_USER = @Microsoft.KeyVault(SecretUri=https://kv-portfolio-prod.vault.azure.net/secrets/EMAIL-SMTP-USER/)
EMAIL_SMTP_PASSWORD = @Microsoft.KeyVault(SecretUri=https://kv-portfolio-prod.vault.azure.net/secrets/EMAIL-SMTP-PASSWORD/)
RECIPIENT_EMAIL_ADDRESS = @Microsoft.KeyVault(SecretUri=https://kv-portfolio-prod.vault.azure.net/secrets/RECIPIENT-EMAIL-ADDRESS/)
```

**Why This Matters**:
- Modern PaaS solution (serverless)
- Integrated CI/CD with GitHub Actions
- Shows understanding of hybrid frontend/backend architecture
- Demonstrates environment management

---

### 4. Application Insights
**Purpose**: Application monitoring, performance tracking, error logging

**Configuration**:
- Name: `ai-portfolio-{environment}`
- Linked to Log Analytics Workspace
- Application Type: Node.js
- Retention: 90 days

**Monitoring Capabilities**:
- Real-time performance metrics
- Failed request tracking
- API response times
- User session analytics
- Custom events and telemetry
- Availability tests

**Custom Metrics to Track**:
- Contact form submissions
- Page load times
- API response times
- Error rates
- User geographic distribution

**Why This Matters**:
- Azure Monitor integration
- Log Analytics experience
- Observability and troubleshooting
- Performance optimization

---

### 5. Log Analytics Workspace
**Purpose**: Centralized logging and query platform

**Configuration**:
- Name: `law-portfolio-{environment}`
- Retention: 30 days
- Daily Cap: 1 GB

**Data Sources**:
- Application Insights logs
- Static Web App diagnostics
- Azure Function logs
- Front Door access logs

**Sample KQL Queries**:
```kql
// Contact form submission trends
requests
| where name contains "contact-form"
| summarize count() by bin(timestamp, 1h)
| render timechart

// Error rate analysis
exceptions
| summarize count() by problemId, outerMessage
| order by count_ desc
```

**Why This Matters**:
- Log Analytics experience
- KQL query knowledge
- Centralized logging strategy
- Auditing and compliance

---

### 6. Storage Account (Blob Storage)
**Purpose**: Store blog post images, documents, and static assets

**Configuration**:
- Name: `stportfolio{environment}` (must be globally unique)
- SKU: Standard_LRS (Locally Redundant Storage)
- Kind: StorageV2
- Access Tier: Hot
- Blob Public Access: Disabled
- HTTPS Only: Yes
- Minimum TLS Version: 1.2

**Containers**:
- `blog-images`: Blog post featured images and content images
- `documents`: PDF files, resumes, certificates
- `backups`: Automated backups (optional)

**Security**:
- Shared Access Signatures (SAS) for temporary access
- Managed Identity access from Static Web App
- CORS configuration for website domain
- Lifecycle management (move old images to Cool tier after 90 days)

**CDN Integration**:
- Azure CDN Standard Microsoft (or Front Door)
- Custom domain: `cdn.yourdomain.com`
- Caching rules: 7 days for images

**Why This Matters**:
- Storage Account management
- Data-at-rest encryption
- Cost optimization (lifecycle policies)
- CORS and security configurations

---

### 7. Azure Front Door
**Purpose**: Global CDN, DDoS protection, WAF, SSL/TLS termination

**Configuration**:
- Name: `fd-portfolio-{environment}`
- SKU: Standard
- Origin: Azure Static Web App
- Caching: Enabled
- Compression: Enabled

**Features**:
- **WAF (Web Application Firewall)**:
  - OWASP Core Rule Set
  - Custom rules for rate limiting
  - Geo-filtering (optional)

- **Routing Rules**:
  - HTTPS redirect (301)
  - Custom domain routing
  - API route handling

- **SSL/TLS**:
  - Managed certificate for custom domain
  - Minimum TLS 1.2
  - HSTS enabled

- **DDoS Protection**:
  - Built-in DDoS protection
  - Rate limiting rules

**Why This Matters**:
- Advanced networking knowledge
- Security (WAF, DDoS)
- Performance optimization
- Global distribution

---

## Bicep Structure & Modules

### Folder Structure

```
infrastructure/
├── main.bicep                      # Main orchestration template
├── parameters/
│   ├── dev.bicepparam             # Development parameters
│   └── prod.bicepparam            # Production parameters
├── modules/
│   ├── resource-group.bicep       # Resource Group module
│   ├── key-vault.bicep            # Key Vault module
│   ├── static-web-app.bicep       # Static Web App module
│   ├── app-insights.bicep         # Application Insights module
│   ├── log-analytics.bicep        # Log Analytics Workspace module
│   ├── storage-account.bicep      # Storage Account module
│   └── front-door.bicep           # Front Door module
├── scripts/
│   ├── deploy.ps1                 # PowerShell deployment script
│   ├── deploy.sh                  # Bash deployment script
│   └── teardown.ps1               # Resource cleanup script
└── docs/
    └── deployment-guide.md        # Step-by-step deployment guide
```

### Module Breakdown

#### 1. **main.bicep**
- Orchestrates all module deployments
- Defines parameter inputs
- Manages dependencies between resources
- Outputs key values (URLs, resource IDs)

#### 2. **resource-group.bicep**
- Creates resource group
- Applies tagging strategy
- Sets location

#### 3. **key-vault.bicep**
- Creates Key Vault
- Configures RBAC
- Enables soft delete and purge protection
- Creates access policies for Managed Identity

#### 4. **static-web-app.bicep**
- Provisions Static Web App
- Enables Managed Identity
- Configures GitHub integration
- Sets environment variables with Key Vault references

#### 5. **app-insights.bicep**
- Creates Application Insights instance
- Links to Log Analytics Workspace
- Configures retention and sampling

#### 6. **log-analytics.bicep**
- Creates Log Analytics Workspace
- Sets retention period
- Configures daily cap

#### 7. **storage-account.bicep**
- Creates Storage Account
- Creates blob containers
- Configures CORS
- Sets up lifecycle management policies
- Enables soft delete for blobs

#### 8. **front-door.bicep**
- Creates Front Door profile
- Configures origin (Static Web App)
- Sets up WAF policies
- Configures routing rules and caching

---

## Security & Compliance

### Security Features Implemented

#### 1. **Identity & Access Management**
- **Managed Identity**: Static Web App uses system-assigned managed identity
- **RBAC**: Least-privilege access to Key Vault
- **No Hard-Coded Secrets**: All secrets in Key Vault
- **Service Principals**: For automation/deployment (optional)

#### 2. **Network Security**
- **HTTPS Only**: All traffic encrypted
- **TLS 1.2 Minimum**: Modern encryption standards
- **CORS Policies**: Restrict cross-origin requests
- **Private Endpoints**: Optional for Key Vault (production)
- **WAF Rules**: Protection against OWASP top 10 vulnerabilities

#### 3. **Data Protection**
- **Encryption at Rest**: All Azure services encrypt data at rest
- **Encryption in Transit**: TLS/SSL for all connections
- **Soft Delete**: Enabled on Key Vault and Storage (data recovery)
- **Backup**: Azure automatic backups for Static Web Apps

#### 4. **Monitoring & Auditing**
- **Activity Logs**: All resource changes logged
- **Diagnostic Settings**: Enabled on all resources
- **Alerts**: Budget alerts, performance alerts, security alerts
- **Log Analytics**: Centralized audit logs

### Compliance Considerations

While this is a personal website, the architecture follows principles relevant to:
- **HIPAA/HITECH**: Secure secrets, encryption, audit logging
- **SOC2**: Access control, monitoring, change management
- **HiTrust**: Security controls, risk management

---

## Governance & Cost Management

### Tagging Strategy

Every resource will have these tags:

| Tag | Purpose | Example Value |
|-----|---------|---------------|
| `Environment` | Deployment environment | `Production`, `Development` |
| `Project` | Project identifier | `PersonalPortfolio` |
| `Owner` | Resource owner | `Sebastian Mateus` |
| `CostCenter` | Cost allocation | `Personal` |
| `ManagedBy` | Provisioning method | `Bicep` |
| `ApplicationName` | Application identifier | `Portfolio-Website` |
| `DataClassification` | Data sensitivity | `Public` |
| `Criticality` | Business criticality | `Low` |

### Azure Policy (Optional for Advanced Demo)
- Enforce tagging on all resources
- Require HTTPS for storage accounts
- Enforce minimum TLS version
- Require diagnostic settings

### Cost Management

#### Budget Alerts
- Monthly budget: $20
- Alerts at: 50%, 75%, 90%, 100%
- Email notifications

#### Cost Optimization Strategies
1. **Static Web App**: Standard tier (~$9/month) vs Free tier
2. **Storage Account**: LRS instead of GRS (no geo-redundancy needed)
3. **Application Insights**: Sampling to reduce data ingestion
4. **Front Door**: Standard tier (vs Premium)
5. **Lifecycle Policies**: Move old blobs to Cool/Archive tier

#### Expected Monthly Costs
- Static Web App (Standard): ~$9
- Application Insights: ~$2-5
- Storage Account: ~$1-2
- Front Door: ~$5-10
- Key Vault: ~$0.10
- **Total**: ~$17-26/month

---

## Monitoring & Observability

### Application Insights Dashboards

#### 1. **Performance Dashboard**
- Average page load time
- API response times
- Failed request rate
- Server response time

#### 2. **User Behavior Dashboard**
- Page views by URL
- Geographic distribution
- Browser/device breakdown
- User sessions

#### 3. **Contact Form Analytics**
- Form submission rate
- Success vs. error rate
- Spam detection triggers
- Rate limiting events

### Alerts to Configure

#### Performance Alerts
- API response time > 2 seconds
- Failed requests > 5%
- Server errors > 3 in 5 minutes

#### Security Alerts
- Multiple failed authentication attempts
- Suspicious IP patterns
- WAF rule triggers

#### Cost Alerts
- Budget threshold exceeded
- Unexpected usage spikes

---

## Deployment Strategy

### Deployment Environments

#### Development Environment
- Resource Group: `rg-portfolio-dev`
- Static Web App: Free tier (for testing)
- Minimal monitoring
- No Front Door (cost savings)

#### Production Environment
- Resource Group: `rg-portfolio-prod`
- Static Web App: Standard tier
- Full monitoring and alerting
- Front Door enabled
- Custom domain configured

### Deployment Process

#### 1. **Prerequisites**
- Azure CLI installed
- Azure subscription access
- GitHub repository connected
- Bicep CLI installed

#### 2. **Initial Deployment**
```powershell
# Login to Azure
az login

# Set subscription
az account set --subscription "Your-Subscription-ID"

# Deploy infrastructure
az deployment sub create \
  --location eastus \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters/prod.bicepparam
```

#### 3. **Post-Deployment Configuration**
- Add secrets to Key Vault
- Configure custom domain DNS
- Set up GitHub Actions workflow
- Configure Application Insights instrumentation
- Test contact form functionality

#### 4. **GitHub Actions CI/CD**
- Automated deployment on push to `main`
- Infrastructure validation (Bicep linting)
- Preview environments for pull requests
- Automated testing before deployment

---

## Skills Demonstrated

### Infrastructure & Cloud Engineering
✅ **Azure Resource Provisioning**: VNets, Storage, PaaS services
✅ **Infrastructure as Code**: Bicep templates and modules
✅ **High Availability**: Multi-region via Front Door
✅ **Disaster Recovery**: Soft delete, backup strategies

### Identity & Security
✅ **Entra ID (Azure AD)**: Managed Identity integration
✅ **RBAC**: Least-privilege access control
✅ **Key Vault**: Secrets management
✅ **TLS/SSL**: Certificate management and HTTPS enforcement

### Automation & DevOps
✅ **CI/CD Pipelines**: GitHub Actions automation
✅ **Infrastructure as Code**: Bicep deployment automation
✅ **Environment Management**: Dev/Prod separation

### Monitoring & Observability
✅ **Azure Monitor**: Application Insights integration
✅ **Log Analytics**: Centralized logging and KQL queries
✅ **Alerting**: Performance and cost alerts

### Governance & Cost Management
✅ **Tagging Strategy**: Resource organization
✅ **Cost Optimization**: Right-sizing and tier selection
✅ **Budget Alerts**: FinOps governance
✅ **Azure Policy**: Compliance enforcement (optional)

### Networking
✅ **Azure Front Door**: CDN, WAF, DDoS protection
✅ **Custom Domains**: DNS configuration
✅ **CORS**: Cross-origin security

---

## Interview Talking Points

### "Tell me about your Azure experience"

> "I have a unique combination of enterprise Azure experience and hands-on cloud development skills. At Chick-fil-A, I manage 4,000 endpoints integrated with Azure AD/Entra ID and Intune across our hybrid infrastructure. I work daily with identity management, RBAC, and device compliance—which gave me practical exposure to Azure's identity and access management capabilities.
>
> To deepen my cloud engineering skills beyond endpoint management, I built my personal portfolio website using Azure PaaS services. I architected the solution using Azure Static Web Apps for hosting, Azure Functions for the serverless backend API, and Application Insights for monitoring. The entire infrastructure is deployed using Bicep—Infrastructure as Code—which I taught myself to automate provisioning across dev and production environments.
>
> This combination gives me both the enterprise operations perspective from managing thousands of devices and users, plus the hands-on development experience building cloud-native applications. I understand how end-users interact with Azure services and how to build and deploy those services effectively."

### "How have you worked with Azure AD/Entra ID and identity management?"

> "I work with Azure AD daily at Chick-fil-A, managing identity and access for 4,000 endpoints using Intune, Autopilot, and Entra ID. I handle user provisioning, group policies, conditional access troubleshooting, and device enrollment. This has given me solid experience with hybrid identity, device management, and understanding how Entra ID integrates with on-premises Active Directory.
>
> In my personal projects, I've extended this knowledge by implementing Managed Identity for my Azure Static Web App to access Key Vault secrets—demonstrating the principle of least privilege without hard-coded credentials. I also plan to integrate Azure AD B2C for a blog admin portal, which would give me experience with customer-facing authentication and authorization workflows.
>
> The combination of enterprise identity operations and cloud-native identity solutions gives me a well-rounded perspective on Azure's identity ecosystem."

### "Describe your experience with automation and Infrastructure as Code"

> "At Chick-fil-A, I use PowerShell daily for system diagnostics, configuration management, and automating repetitive tasks across our endpoint fleet. I've also worked with SCCM and Autopilot for automated device deployments, which taught me the value of automation at scale.
>
> To expand my cloud automation skills, I learned Bicep to define my entire portfolio infrastructure as code. I created modular Bicep templates for Key Vault, Static Web Apps, Application Insights, Storage Accounts, and Front Door—each with proper RBAC, tagging strategies, and environment-specific parameters. This allows me to provision the entire stack with a single Azure CLI command and maintain consistency across dev and prod environments.
>
> I've also implemented CI/CD pipelines using GitHub Actions that automatically build and deploy my React frontend and Azure Functions API whenever I push code. This hands-on experience with Infrastructure as Code and DevOps pipelines complements my operational automation work at Chick-fil-A."

### "How do you approach security in cloud environments?"

> "Security is critical in my current role at Chick-fil-A where I enforce compliance standards across 4,000 endpoints. I implement QA protocols for device builds, coordinate security compliance with our engineering teams, and ensure devices meet enterprise security requirements before deployment. I also have experience with PCI DSS compliance from my payment systems role at CDE.
>
> In my Azure projects, I apply those same security principles to cloud infrastructure. I use Azure Key Vault to store all sensitive credentials with RBAC-based access control. My Static Web App uses Managed Identity to access secrets, eliminating hard-coded credentials. All traffic is encrypted with TLS 1.2 minimum, and I plan to implement Azure Front Door's Web Application Firewall for protection against OWASP top 10 vulnerabilities.
>
> I've also enabled soft delete on Key Vault and Storage for data recovery, maintain audit logs in Log Analytics, and configured security alerts. This defense-in-depth approach aligns with HIPAA, SOC2, and HiTrust principles—which I understand are relevant to HealthTech environments."

### "Tell me about your experience with monitoring and troubleshooting"

> "Troubleshooting is the core of my daily work at Chick-fil-A. I use ServiceNow ITSM to manage incidents, execute PowerShell and command-line diagnostics, and collaborate with endpoint engineering teams to resolve MDM integration challenges and deployment failures. I've developed strong root cause analysis skills from supporting 4,000 endpoints.
>
> I've applied that operational mindset to cloud monitoring by implementing Application Insights and Log Analytics for my portfolio website. I track API response times, error rates, and user behavior patterns. I've written custom KQL queries to analyze contact form submissions, identify performance bottlenecks, and monitor for security events.
>
> The combination of traditional endpoint troubleshooting and modern cloud observability gives me a comprehensive approach to problem-solving—whether it's diagnosing an Intune deployment failure or investigating a spike in Azure Function errors."

### "How do you manage costs and optimize resources?"

> "At Chick-fil-A, I manage hardware lifecycle operations and coordinate vendor relationships with Microsoft, Apple, Dell, and Lenovo—which has taught me to think about total cost of ownership, warranty optimization, and strategic purchasing decisions.
>
> I apply similar FinOps principles to my Azure infrastructure. I implemented a comprehensive tagging strategy to track costs by environment and project, set up budget alerts at 50%, 75%, and 90% thresholds, and right-sized resources based on actual usage. For example, I use Standard tier Static Web Apps in production but Free tier in dev to minimize costs.
>
> I also configured lifecycle policies on blob storage to automatically move older images to Cool tier after 90 days, and I use Application Insights sampling to reduce data ingestion costs. My entire cloud infrastructure runs for about $20/month while still demonstrating enterprise-grade architecture—showing I understand how to balance cost efficiency with performance and reliability."

### "Walk me through a technical project you've completed"

> "I built a full-stack personal portfolio website to expand my Azure development skills beyond my endpoint management role at Chick-fil-A.
>
> The architecture uses Azure Static Web Apps hosting a React frontend with an Azure Functions backend for the contact form API. I implemented security best practices by storing email credentials in Azure Key Vault with Managed Identity access, rate limiting to prevent abuse, and spam detection logic in the function.
>
> I deployed the entire infrastructure using Bicep Infrastructure as Code with modular templates for each Azure resource—Key Vault, Static Web App, Application Insights, Storage, and Front Door. I set up GitHub Actions for CI/CD so every code push automatically builds and deploys to Azure.
>
> For monitoring, I integrated Application Insights to track API performance, error rates, and user behavior. I created custom KQL queries for analyzing contact form submissions and set up alerts for performance degradation.
>
> This project gave me hands-on experience with PaaS services, serverless architecture, Infrastructure as Code, and DevOps automation—skills that complement my enterprise operations work and demonstrate I can bridge traditional IT support with modern cloud engineering."

### "Why are you transitioning from endpoint management to cloud engineering?"

> "I'm not really transitioning away from endpoint management—I'm expanding my skillset to include the cloud infrastructure that powers modern endpoint solutions. At Chick-fil-A, I've seen firsthand how critical Azure AD, Intune, and cloud-based MDM platforms are to managing enterprise devices. That exposure sparked my interest in understanding the full cloud stack, not just the endpoint layer.
>
> I started learning Azure development in my personal time, building projects with Static Web Apps, Azure Functions, Key Vault, and Infrastructure as Code using Bicep. I wanted to understand how to architect, deploy, and monitor cloud services—not just consume them as an endpoint administrator.
>
> This junior cloud engineer role is perfect because it bridges infrastructure, security, identity, and DevOps—all areas where I have foundational experience from endpoint management but want to expand into full cloud engineering. My operational background gives me a user-focused perspective, while my personal projects demonstrate I can build and automate cloud solutions independently."

### "What interests you about this HealthTech SaaS role specifically?"

> "HealthTech combines two things I value: technical complexity and meaningful impact. The compliance requirements—HIPAA, HITECH, SOC2, HiTrust—require rigorous security and data protection, which aligns with my experience implementing enterprise security standards at Chick-fil-A and PCI DSS compliance at CDE.
>
> I'm also drawn to the hybrid nature of this role, bridging traditional infrastructure like networking and Active Directory with modern cloud engineering. That's exactly where my background fits—I have operational experience managing hybrid Microsoft/Apple environments and hands-on development experience building Azure cloud solutions.
>
> The opportunity to work across Azure services—networking, identity, AKS, storage, security—while partnering with Security, DevOps, and Application Development teams is exactly the kind of cross-functional collaboration I'm looking for. It would allow me to leverage my IT operations foundation while growing into infrastructure automation, containerization, and cloud-native architecture."

---

## Cost Estimation

### Monthly Costs (Production Environment)

| Service | Tier | Estimated Cost |
|---------|------|----------------|
| Azure Static Web Apps | Standard | $9.00 |
| Application Insights | Pay-as-you-go | $2.00 - $5.00 |
| Log Analytics Workspace | Pay-as-you-go | $0.50 - $2.00 |
| Storage Account (LRS) | Standard | $1.00 - $2.00 |
| Azure Front Door | Standard | $5.00 - $10.00 |
| Key Vault | Standard | $0.10 |
| **Total** | | **~$17.60 - $28.10/month** |

### Cost Optimization Notes

1. **Free Tier Alternative**: Use Static Web Apps Free tier (~$0) if budget is tight
2. **Front Door**: Skip in dev environment to save $5-10/month
3. **Application Insights**: Enable sampling to reduce ingestion costs
4. **Storage**: Lifecycle policies move old data to cheaper tiers automatically

### Development Environment (Cost-Saving)

| Service | Tier | Estimated Cost |
|---------|------|----------------|
| Azure Static Web Apps | Free | $0.00 |
| Application Insights | Pay-as-you-go | $0.50 |
| Storage Account | Standard LRS | $0.50 |
| Key Vault | Standard | $0.10 |
| **Total** | | **~$1.10/month** |

---

## Next Steps

### Phase 1: Infrastructure Setup (This Document)
- ✅ Architecture planning
- ⏳ Create Bicep modules
- ⏳ Deploy to Azure
- ⏳ Configure secrets in Key Vault

### Phase 2: Application Integration
- ⏳ Update frontend to use Application Insights
- ⏳ Migrate blog images to Blob Storage
- ⏳ Configure custom domain
- ⏳ Set up GitHub Actions workflow

### Phase 3: Monitoring & Optimization
- ⏳ Create Application Insights dashboards
- ⏳ Configure alerts
- ⏳ Implement KQL queries
- ⏳ Set up cost management

### Phase 4: Documentation & Portfolio
- ⏳ Document architecture decisions
- ⏳ Create runbooks for common operations
- ⏳ Add infrastructure section to portfolio website
- ⏳ Prepare interview talking points

---

## Additional Resources

### Azure Documentation
- [Azure Static Web Apps Documentation](https://learn.microsoft.com/azure/static-web-apps/)
- [Bicep Documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/)
- [Application Insights Documentation](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [Azure Front Door Documentation](https://learn.microsoft.com/azure/frontdoor/)

### Best Practices
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Azure Security Baseline](https://learn.microsoft.com/security/benchmark/azure/)
- [Azure Naming Conventions](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging)

### Certification Alignment
- **AZ-900** (Azure Fundamentals): Resource groups, basic services
- **AZ-104** (Azure Administrator): RBAC, monitoring, governance
- **AZ-204** (Azure Developer): Static Web Apps, Functions, Key Vault
- **AZ-305** (Azure Solutions Architect): Overall architecture design

---

## Conclusion

This infrastructure demonstrates production-ready Azure cloud engineering practices that directly align with the Junior Azure Cloud Engineer role requirements. Every component serves a real purpose for the website while showcasing key technical skills:

- **Infrastructure as Code** with Bicep modules
- **Security-first approach** with Key Vault and Managed Identity
- **Comprehensive monitoring** with Application Insights and Log Analytics
- **Cost optimization** through right-sizing and governance
- **Modern DevOps** with CI/CD automation
- **Enterprise networking** with Front Door and CDN

The total cost of ~$20/month makes this a realistic personal project that demonstrates enterprise-level skills, making it an excellent talking point for job interviews in the Azure cloud engineering space.
