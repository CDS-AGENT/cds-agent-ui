# CDS Agent UI - Deployment Guide

## 🏗️ Architecture Overview

This project uses a **dual-branch automated deployment strategy**:

- **`main`** - Development and source code
- **`deploy`** - Production builds and GitHub Pages deployment

### Automated Workflow

1. Push to `main` triggers auto-deployment
2. Changes are automatically merged to `deploy` branch
3. GitHub Pages deploys from `deploy` branch
4. Live site updates automatically

## � Quick Start

### Automatic Deployment (Recommended)

Simply push to the main branch - everything else is automated:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The automated workflow will:

- Merge changes to deploy branch
- Install dependencies
- Run linting and build
- Deploy to GitHub Pages
- Update live site

### Manual Deployment Scripts

For manual deployments, use the provided scripts:

**Windows (PowerShell):**

```powershell
# Full deployment
.\deploy.ps1

# Skip build (if already built)
.\deploy.ps1 -SkipBuild

# Force deployment (ignore uncommitted changes)
.\deploy.ps1 -Force
```

**Linux/Mac (Bash):**

```bash
# Make executable and run
chmod +x deploy.sh
./deploy.sh
```

## 📋 Configuration

- **Deploy Branch**: `deploy`
- **Live URL**: `https://CDS-AGENT.github.io/cds-agent-ui/`
- **Source Branch**: `main` (development)
- **Build Tool**: Vite + React + TypeScript
- **Workflows**: Auto-deploy + GitHub Pages deployment

## 🔧 Deployment Workflows

### Auto-Deploy Workflow (`.github/workflows/auto-deploy.yml`)

Automatically merges main → deploy on every push:

- Triggers on push to main
- Switches to deploy branch
- Merges main changes
- Pushes to deploy branch

### Deploy Workflow (`.github/workflows/deploy.yml`)

Builds and deploys to GitHub Pages:

- Triggers on push to deploy branch
- Installs Node.js and dependencies
- Runs linting and tests
- Builds production version
- Deploys to GitHub Pages

## 🛠️ GitHub Setup

### Repository Configuration

1. Go to Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `deploy` (not gh-pages)
4. Folder: `/ (root)`

### Workflow Permissions

Ensure GitHub Actions can write to repository:

- Settings → Actions → General
- Workflow permissions: "Read and write permissions"
- Allow GitHub Actions to create and approve pull requests: ✅

## 🏥 Live Features

- ✅ Interactive Healthcare Dashboard with Charts
- ✅ Patient Management System with Search
- ✅ New Visit Check-in Forms
- ✅ Image Upload & Text Extraction
- ✅ Clinical Notes & Diagnosis Reports
- ✅ Responsive Design with Dark Mode
- ✅ Professional Modal Dialogs

## � Monitoring

### GitHub Actions Logs

- Repository → Actions tab
- Click workflow run for detailed logs
- Check individual job steps for errors

### Performance

- Current bundle size: ~741KB (optimized)
- Code splitting enabled
- Asset compression active

## 🐛 Troubleshooting

### Build Failures

1. **Linting errors**: Check ESLint output in workflow logs
2. **TypeScript errors**: Verify type definitions
3. **Missing dependencies**: Ensure package.json is current

### Deployment Issues

1. **404 errors**: Verify base path in vite.config.ts
2. **Workflow failures**: Check repository permissions
3. **Outdated deployment**: Trigger manual deploy workflow

## 🔗 Quick Links

- **Live App**: https://CDS-AGENT.github.io/cds-agent-ui/
- **GitHub Actions**: Repository → Actions tab
- **Pages Settings**: Repository → Settings → Pages

### 📞 Troubleshooting:

- **Protection Rules Error**: Use the `deploy` branch instead of `main`
- **Build Failures**: Check workflow logs in GitHub Actions tab
- **404 Errors**: Verify base path in `vite.config.ts` matches repository name

---

**Last Updated**: August 11, 2025
**Deployment Status**: ✅ Live and Operational
