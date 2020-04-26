#!/bin/bash

echo "Deploying branch $DEPLOY_BRANCH"
git status
git fetch origin
git checkout $DEPLOY_BRANCH
git stash
git pull origin $DEPLOY_BRANCH
sudo npm install
sudo npm run build
