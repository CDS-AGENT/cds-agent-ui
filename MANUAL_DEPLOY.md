# Manual Deployment Trigger

If the automatic workflows aren't working, you can manually trigger the deployment using GitHub's web interface:

## Method 1: Manual Workflow Trigger

1. Go to your repository: https://github.com/CDS-AGENT/cds-agent-ui
2. Click on **Actions** tab
3. Click on **Deploy to GitHub Pages** workflow
4. Click **Run workflow** button
5. Select `deploy` branch
6. Click **Run workflow**

## Method 2: Force Push to Deploy Branch

```bash
# Switch to deploy branch
git checkout deploy

# Pull latest from main
git fetch origin main
git reset --hard origin/main

# Force push to trigger deployment
git push --force-with-lease origin deploy
```

## Method 3: Empty Commit to Deploy Branch

```bash
# Switch to deploy branch  
git checkout deploy

# Create empty commit to trigger workflow
git commit --allow-empty -m "trigger deployment"

# Push to trigger workflow
git push origin deploy
```

## Troubleshooting

### Check Workflow Status
- Go to https://github.com/CDS-AGENT/cds-agent-ui/actions
- Look for "Auto Deploy from Main" and "Deploy to GitHub Pages" workflows
- Check if they're running or completed successfully

### Common Issues
1. **Auto-deploy runs but deploy doesn't**: This is because GitHub Actions token pushes don't trigger other workflows by default
2. **Permission issues**: Check repository Actions permissions
3. **Branch protection**: Verify deploy branch allows force pushes from Actions

### Solution Applied
- Added `workflow_run` trigger to deploy.yml
- This should make deploy.yml trigger when auto-deploy.yml completes
- If this doesn't work, manual triggering is the fallback
