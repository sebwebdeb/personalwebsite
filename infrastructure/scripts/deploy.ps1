# ============================================================================
# Azure Infrastructure Deployment Script (PowerShell)
# ============================================================================
# This script deploys the personal portfolio infrastructure to Azure using
# Bicep templates with proper validation and error handling.
# ============================================================================

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('dev', 'prod')]
    [string]$Environment,

    [Parameter(Mandatory=$false)]
    [string]$Location = 'eastus',

    [Parameter(Mandatory=$false)]
    [switch]$WhatIf,

    [Parameter(Mandatory=$false)]
    [switch]$SkipValidation
)

# ============================================================================
# CONFIGURATION
# ============================================================================

$ErrorActionPreference = "Stop"
$InformationPreference = "Continue"

$ScriptDir = Split-Path -Parent $PSCommandPath
$InfrastructureDir = Split-Path -Parent $ScriptDir
$ParametersFile = Join-Path $InfrastructureDir "parameters\$Environment.bicepparam"
$MainTemplate = Join-Path $InfrastructureDir "main.bicep"

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = 'White'
    )
    Write-Host $Message -ForegroundColor $Color
}

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-ColorOutput "============================================" "Cyan"
    Write-ColorOutput $Message "Cyan"
    Write-ColorOutput "============================================" "Cyan"
    Write-Host ""
}

function Test-Prerequisites {
    Write-Header "Checking Prerequisites"

    # Check Azure CLI
    try {
        $azVersion = az version --output json | ConvertFrom-Json
        Write-ColorOutput "✓ Azure CLI installed: $($azVersion.'azure-cli')" "Green"
    } catch {
        Write-ColorOutput "✗ Azure CLI not found. Please install: https://aka.ms/installazurecliwindows" "Red"
        exit 1
    }

    # Check Bicep CLI
    try {
        az bicep version
        Write-ColorOutput "✓ Bicep CLI installed" "Green"
    } catch {
        Write-ColorOutput "Installing Bicep CLI..." "Yellow"
        az bicep install
    }

    # Check Azure login
    try {
        $account = az account show --output json | ConvertFrom-Json
        Write-ColorOutput "✓ Logged into Azure" "Green"
        Write-ColorOutput "  Subscription: $($account.name)" "Gray"
        Write-ColorOutput "  ID: $($account.id)" "Gray"
    } catch {
        Write-ColorOutput "✗ Not logged into Azure. Running 'az login'..." "Yellow"
        az login
    }

    # Check template files exist
    if (-not (Test-Path $MainTemplate)) {
        Write-ColorOutput "✗ Main template not found: $MainTemplate" "Red"
        exit 1
    }
    Write-ColorOutput "✓ Main template found" "Green"

    if (-not (Test-Path $ParametersFile)) {
        Write-ColorOutput "✗ Parameters file not found: $ParametersFile" "Red"
        exit 1
    }
    Write-ColorOutput "✓ Parameters file found" "Green"
}

function Invoke-BicepValidation {
    Write-Header "Validating Bicep Templates"

    try {
        Write-ColorOutput "Building Bicep template..." "Yellow"
        az bicep build --file $MainTemplate

        Write-ColorOutput "Validating deployment..." "Yellow"
        $validationResult = az deployment sub validate `
            --location $Location `
            --template-file $MainTemplate `
            --parameters $ParametersFile `
            --output json | ConvertFrom-Json

        if ($validationResult.properties.provisioningState -eq "Succeeded") {
            Write-ColorOutput "✓ Validation successful" "Green"
            return $true
        } else {
            Write-ColorOutput "✗ Validation failed" "Red"
            Write-ColorOutput ($validationResult | ConvertTo-Json -Depth 10) "Red"
            return $false
        }
    } catch {
        Write-ColorOutput "✗ Validation error: $_" "Red"
        return $false
    }
}

function Invoke-Deployment {
    Write-Header "Deploying Infrastructure"

    $deploymentName = "portfolio-$Environment-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

    Write-ColorOutput "Deployment Details:" "Cyan"
    Write-ColorOutput "  Name: $deploymentName" "Gray"
    Write-ColorOutput "  Environment: $Environment" "Gray"
    Write-ColorOutput "  Location: $Location" "Gray"
    Write-ColorOutput "  Template: $MainTemplate" "Gray"
    Write-ColorOutput "  Parameters: $ParametersFile" "Gray"
    Write-Host ""

    if ($WhatIf) {
        Write-ColorOutput "Running What-If analysis..." "Yellow"
        az deployment sub what-if `
            --name $deploymentName `
            --location $Location `
            --template-file $MainTemplate `
            --parameters $ParametersFile
        return
    }

    try {
        Write-ColorOutput "Starting deployment (this may take 5-10 minutes)..." "Yellow"

        $deployment = az deployment sub create `
            --name $deploymentName `
            --location $Location `
            --template-file $MainTemplate `
            --parameters $ParametersFile `
            --output json | ConvertFrom-Json

        if ($deployment.properties.provisioningState -eq "Succeeded") {
            Write-ColorOutput "✓ Deployment successful!" "Green"

            Write-Header "Deployment Outputs"
            $deployment.properties.outputs.PSObject.Properties | ForEach-Object {
                Write-ColorOutput "$($_.Name): $($_.Value.value)" "Gray"
            }

            Write-Header "Next Steps"
            Write-ColorOutput $deployment.properties.outputs.nextSteps.value "Cyan"

            return $true
        } else {
            Write-ColorOutput "✗ Deployment failed" "Red"
            Write-ColorOutput ($deployment | ConvertTo-Json -Depth 10) "Red"
            return $false
        }
    } catch {
        Write-ColorOutput "✗ Deployment error: $_" "Red"
        return $false
    }
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

Write-Header "Azure Infrastructure Deployment - $Environment Environment"

# Step 1: Check prerequisites
Test-Prerequisites

# Step 2: Validate templates
if (-not $SkipValidation) {
    $isValid = Invoke-BicepValidation
    if (-not $isValid) {
        Write-ColorOutput "Deployment aborted due to validation errors" "Red"
        exit 1
    }
}

# Step 3: Deploy
$success = Invoke-Deployment

if ($success) {
    Write-ColorOutput "`nDeployment completed successfully!" "Green"
    exit 0
} elseif ($WhatIf) {
    Write-ColorOutput "`nWhat-If analysis completed" "Yellow"
    exit 0
} else {
    Write-ColorOutput "`nDeployment failed. Check the errors above." "Red"
    exit 1
}
