# CDS Agent UI - GitHub Pages Deployment Guide

## 🚀 Deployment Setup

This project is configured for GitHub Pages deployment using a dedicated `deploy` branch to avoid protection rule issues.

### 📋 Current Configuration:

- **Deploy Branch**: `deploy` 
- **Live URL**: `https://atom-1106.github.io/cds-agent-ui/`
- **Source Branch**: `main` (development)
- **Build Tool**: Vite + React

### 🔄 Deployment Methods:

#### Method 1: Automatic Deployment (GitHub Actions)
- Push to the `deploy` branch triggers automatic deployment
- Workflow file: `.github/workflows/deploy.yml`

#### Method 2: Manual Deployment
```bash
# Switch to deploy branch
git checkout deploy

# Merge latest changes from main
git merge main

# Deploy manually
npm run deploy

# Push updates
git push origin deploy
```

### 🛠️ Quick Deploy Script:

To deploy latest changes from main:

```bash
# 1. Switch to main and pull latest
git checkout main
git pull origin main

# 2. Switch to deploy branch and merge
git checkout deploy
git merge main

# 3. Deploy
npm run deploy
git push origin deploy
```

### 🏥 Live Features:

- ✅ Interactive Healthcare Dashboard
- ✅ Patient Management System
- ✅ New Visit Check-in Forms
- ✅ Image Upload & Text Extraction
- ✅ Clinical Notes & Diagnosis Reports
- ✅ Responsive Design with Dark Mode

### 🔧 Repository Settings:

Make sure to configure GitHub Pages in repository settings:
1. Go to Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Set folder to `/ (root)`

### 📞 Troubleshooting:

- **Protection Rules Error**: Use the `deploy` branch instead of `main`
- **Build Failures**: Check workflow logs in GitHub Actions tab
- **404 Errors**: Verify base path in `vite.config.ts` matches repository name

---

**Last Updated**: August 11, 2025  
**Deployment Status**: ✅ Live and Operational
