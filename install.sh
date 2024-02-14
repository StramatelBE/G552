#!/bin/bash

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git
WORKDIR=server

# Function to simulate a loading bar
function loading_bar {
    echo -ne "$1\r"
    sleep 1
    echo -ne '#####                     (33%)\r'
    sleep 1
    echo -ne '#############             (66%)\r'
    sleep 1
    echo -ne '#######################   (100%)\r'
    echo -ne '\n'
}

# SOFTWARE UPDATE
echo "Updating software packages..."
sudo apt update >/dev/null 2>&1
sudo apt upgrade -y >/dev/null 2>&1
loading_bar "Updating software..."

# BASIC UTILITIES
echo "Installing basic utilities..."
sudo apt install -y vim curl wget git >/dev/null 2>&1
loading_bar "Installing utilities..."

# CLONE REPOSITORY
echo "Cloning repository..."
cd ~
git clone $GITHUB_REPOSITORY $WORKDIR >/dev/null 2>&1
loading_bar "Cloning repository..."

# NODE INSTALL
echo "Installing Node.js..."
~/$WORKDIR/scripts/setup/node_install.sh >/dev/null 2>&1
npm install -g serve >/dev/null 2>&1
loading_bar "Installing Node.js..."

# NODE MODULE INSTALL
echo "Installing Node modules..."
~/$WORKDIR/scripts/setup/npm_init.sh >/dev/null 2>&1
loading_bar "Installing modules..."

# BUILD
echo "Building project..."
~/$WORKDIR/scripts/build/project_build.sh >/dev/null 2>&1
loading_bar "Building project..."

# RUN
echo "Running project..."
~/$WORKDIR/scripts/run/run.sh >/dev/null 2>&1
loading_bar "Running project..."

# Uncomment below if you wish to initialize services
# echo "Initializing services..."
# ~/$WORKDIR/scripts/services/services_init.sh >/dev/null 2>&1
# loading_bar "Initializing services..."

echo "### PROJECT FULLY INITIALISED ###"
