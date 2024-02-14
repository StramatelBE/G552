#!/bin/bash

echo "Starting setup process..."

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git
WORKDIR=server

# Initialize progress
TOTAL_STEPS=7
CURRENT_STEP=0

function print_progress {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    PERCENT=$(( (CURRENT_STEP * 100) / TOTAL_STEPS ))
    echo -ne "Progress: ["
    for ((i = 0; i < (PERCENT / 10); i++)); do echo -n "#"; done
    for ((i = (PERCENT / 10); i < 10; i++)); do echo -n "-"; done
    echo -ne "] $PERCENT% - $1\r"
    sleep 1 # Simulating time taken for the step
}

#SOFTWARE UPDATE
print_progress "Updating software packages..."
sudo apt update >/dev/null
sudo apt upgrade -y >/dev/null

#BASIC UTILITIES
print_progress "Installing basic utilities..."
sudo apt install -y vim curl wget git >/dev/null

#CLONE REPOSITORY
print_progress "Cloning repository..."
cd ~
git clone $GITHUB_REPOSITORY $WORKDIR >/dev/null

#NODE INSTALL
print_progress "Installing Node.js..."
bash ~/$WORKDIR/scripts/setup/node_install.sh >/dev/null
npm install -g serve >/dev/null

#NODE MODULE INSTALL
print_progress "Installing Node modules..."
bash ~/$WORKDIR/scripts/setup/npm_init.sh >/dev/null

#BUILD
print_progress "Building project..."
bash ~/$WORKDIR/scripts/build/project_build.sh >/dev/null

#RUN
# Commented out since it might not return control back to the script
# print_progress "Running application..."
# bash ~/$WORKDIR/scripts/run/run.sh >/dev/null

#SERVICE
# Uncomment and modify as needed
# print_progress "Initializing services..."
# bash ~/$WORKDIR/scripts/services/services_init.sh >/dev/null

echo -ne '\n'
echo "### PROJECT FULLY INITIALISED ###"
