#!/bin/bash

# Script: build.sh
# Confluence: https://traxion.atlassian.net/wiki/spaces/DE/overview
# Owners (slack group): @delivery_team
# Owners: Taras Podolskiy, Mitch Andrews, Vlad Provkin
# Date: May 22, 2024

echo "Start build and test...."
set -e
make

# only run docker build on push
if [[ "$TYPE" = "push" ]]; then
        echo "Building docker containers for integration api and subscription api"
        docker build --platform linux/amd64 -f MicrosoftIntegrationApi/Dockerfile . || exit 1
        docker build --platform linux/amd64 -f SubscriptionApi/Dockerfile . || exit 1
        echo "Build & Test complete..."
        exit 0
fi
