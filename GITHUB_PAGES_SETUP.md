# GitHub Pages Configuration Guide

## Required GitHub Repository Settings

To ensure the deployment works correctly, verify these settings in your GitHub repository:

### 1. GitHub Pages Settings

Go to **Repository Settings → Pages**:

- **Source**: "GitHub Actions" (NOT "Deploy from a branch")
- **Custom domain**: Leave empty (unless you have one)
- **Enforce HTTPS**: ✅ Enabled

### 2. Actions Permissions

Go to **Repository Settings → Actions → General**:

- **Actions permissions**: "Allow all actions and reusable workflows"
- **Workflow permissions**: "Read and write permissions"
- **Allow GitHub Actions to create and approve pull requests**: ✅ Enabled

### 3. Environment Settings (Auto-created)

GitHub will automatically create a `github-pages` environment when you first deploy.

You can verify this in **Repository Settings → Environments** after the first successful deployment.

## Workflow Overview

### Dual-Branch Strategy (Proper Approach)

**Why we use two branches:**

- **main branch**: Development and source code
- **deploy branch**: Production builds and GitHub Pages deployment
- **Environment protection**: GitHub Pages rules only allow deployment from deploy branch

### Active Workflows:

#### 1. Auto-Deploy Workflow (`auto-deploy.yml`)

- **Trigger**: Push to main branch
- **Purpose**: Automatically sync main → deploy branch
- **Process**: Reset deploy branch to match main exactly
- **Result**: Triggers the deploy workflow

#### 2. Deploy Workflow (`deploy.yml`)

- **Trigger**: Push to deploy branch (from auto-deploy)
- **Purpose**: Build and deploy to GitHub Pages
- **Process**: Install deps → Build → Upload → Deploy
- **Environment**: github-pages (respects protection rules)

### Deployment Flow:

```
Push to main → auto-deploy.yml → deploy branch → deploy.yml → GitHub Pages
```

### Disabled Workflows:

- `main-deploy.yml.disabled`: Attempted direct deployment from main (blocked by protection rules)

## Troubleshooting

### Common Issues:

1. **"Missing environment" error**: Fixed in latest version
2. **Permission denied**: Check Actions permissions
3. **404 on live site**: Verify Pages source is set to "GitHub Actions"
4. **Build failures**: Check workflow logs in Actions tab

### Verification Steps:

1. **Check workflow status**: Repository → Actions tab
2. **Verify Pages settings**: Repository → Settings → Pages
3. **Test live site**: https://CDS-AGENT.github.io/cds-agent-ui/

## Live Application URL

After successful deployment: **https://CDS-AGENT.github.io/cds-agent-ui/**

The application includes:

- ✅ Interactive Healthcare Dashboard
- ✅ Patient Management System
- ✅ Visit Check-in Forms
- ✅ Image Upload & Text Extraction
- ✅ Clinical Notes & Reports
- ✅ Responsive Design with Dark Mode
