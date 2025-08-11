# CDS Agent UI - Quick Deployment Script (PowerShell)
# This script automates the deployment process for Windows

param(
    [switch]$SkipBuild = $false,
    [switch]$Force = $false
)

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "🔵 $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️ $Message" -ForegroundColor Yellow
}

try {
    Write-Host "🚀 Starting CDS Agent UI Deployment..." -ForegroundColor Cyan
    
    # Check if we're in the right directory
    if (-not (Test-Path "package.json")) {
        Write-Error "package.json not found. Please run this script from the project root."
        exit 1
    }

    # Get current branch
    $currentBranch = git branch --show-current
    Write-Status "Current branch: $currentBranch"

    # Check git status
    $gitStatus = git status --porcelain
    if ($gitStatus -and -not $Force) {
        Write-Warning "You have uncommitted changes. Commit them first or use -Force flag."
        Write-Host "Uncommitted files:"
        git status --short
        exit 1
    }

    # Ensure we have latest changes
    Write-Status "Fetching latest changes..."
    git fetch origin

    # Switch to main and pull latest
    Write-Status "Switching to main branch..."
    git checkout main
    git pull origin main
    Write-Success "Main branch updated"

    # Switch to deploy branch
    Write-Status "Switching to deploy branch..."
    git checkout deploy

    # Merge main into deploy
    Write-Status "Merging main into deploy..."
    git merge main --no-edit

    if (-not $SkipBuild) {
        # Install dependencies and build
        Write-Status "Installing dependencies..."
        npm ci

        Write-Status "Building application..."
        npm run build
    } else {
        Write-Warning "Skipping build process (-SkipBuild flag used)"
    }

    # Deploy to GitHub Pages
    Write-Status "Deploying to GitHub Pages..."
    npm run deploy

    # Push deploy branch
    Write-Status "Pushing deploy branch..."
    git push origin deploy

    Write-Success "Deployment completed successfully!"
    Write-Success "Live URL: https://atom-1106.github.io/cds-agent-ui/"

    # Return to original branch
    git checkout $currentBranch
    Write-Status "Returned to $currentBranch branch"

    Write-Host ""
    Write-Host "🎉 Deployment Summary:" -ForegroundColor Cyan
    Write-Host "   📦 Built from main branch"
    Write-Host "   🚀 Deployed to GitHub Pages"
    Write-Host "   🌐 Live at: https://atom-1106.github.io/cds-agent-ui/"
    Write-Host "   📋 Deploy branch updated"
    Write-Host ""
    
    # Show recent commits
    Write-Host "📝 Recent commits on deploy branch:" -ForegroundColor Cyan
    git log --oneline -5 deploy

} catch {
    Write-Error "Deployment failed: $($_.Exception.Message)"
    
    # Try to return to original branch
    if ($currentBranch) {
        git checkout $currentBranch
        Write-Status "Returned to $currentBranch branch"
    }
    
    exit 1
}
