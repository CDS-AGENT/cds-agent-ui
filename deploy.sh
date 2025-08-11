#!/bin/bash

# CDS Agent UI - Quick Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Starting CDS Agent UI Deployment..."

# Function to print colored output
print_status() {
    echo -e "\033[1;34m$1\033[0m"
}

print_success() {
    echo -e "\033[1;32m✅ $1\033[0m"
}

print_error() {
    echo -e "\033[1;31m❌ $1\033[0m"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Ensure we have latest changes
print_status "Fetching latest changes..."
git fetch origin

# Switch to main and pull latest
print_status "Switching to main branch..."
git checkout main
git pull origin main
print_success "Main branch updated"

# Switch to deploy branch
print_status "Switching to deploy branch..."
git checkout deploy

# Merge main into deploy
print_status "Merging main into deploy..."
git merge main --no-edit

# Install dependencies and build
print_status "Installing dependencies..."
npm ci

print_status "Building application..."
npm run build

# Deploy to GitHub Pages
print_status "Deploying to GitHub Pages..."
npm run deploy

# Push deploy branch
print_status "Pushing deploy branch..."
git push origin deploy

print_success "Deployment completed successfully!"
print_success "Live URL: https://atom-1106.github.io/cds-agent-ui/"

# Return to original branch
git checkout "$CURRENT_BRANCH"
print_status "Returned to $CURRENT_BRANCH branch"

echo ""
echo "🎉 Deployment Summary:"
echo "   📦 Built from main branch"
echo "   🚀 Deployed to GitHub Pages"
echo "   🌐 Live at: https://atom-1106.github.io/cds-agent-ui/"
echo "   📋 Deploy branch updated"
echo ""
