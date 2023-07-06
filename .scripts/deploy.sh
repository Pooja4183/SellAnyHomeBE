#!/bin/bash
set -e

echo "Deployment started...for main branch"

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

echo "Installing Dependencies..."
npm install --yes

echo "PM2 Reload"
pm2 reload app_name/id

echo "Deployment Finished!"