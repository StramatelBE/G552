#!/bin/bash

echo "Starting \033[35m setup \033[0m process..."

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git
WORKDIR=server

# Initialize progress
TOTAL_STEPS=7
CURRENT_STEP=0

function print_progress {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    PERCENT=$(( (CURRENT_STEP * 100) / TOTAL_STEPS ))
    echo -ne "Progress: ["
    for ((i = 0; i < (PERCENT / 10); i++)); do echo -n " \033[32m #"; done
    for ((i = (PERCENT / 10); i < 10; i++)); do echo -n " \033[31m -"; done
    echo -ne "] $PERCENT% - \033[36m $1 \033[0m \r"
    sleep 1 # Simulating time taken for the step
}

#SOFTWARE UPDATE
print_progress "Updating software packages..."
sudo apt update >/dev/null 2>&1
sudo apt upgrade -y >/dev/null 2>&1

#BASIC UTILITIES
print_progress "Installing basic utilities...        "
sudo apt install -y vim curl wget git >/dev/null 2>&1

#CLONE REPOSITORY
print_progress "Cloning repository...               "
cd ~
git clone $GITHUB_REPOSITORY $WORKDIR >/dev/null 2>&1

#NODE INSTALL
print_progress "Installing Node.js...               "
bash ~/$WORKDIR/scripts/setup/node_install.sh >/dev/null 2>&1
npm install -g serve >/dev/null 2>&1

#NODE MODULE INSTALL
print_progress "Installing Node modules...               "
bash ~/$WORKDIR/scripts/setup/npm_init.sh >/dev/null 2>&1

#BUILD
print_progress "Building project...                   "
bash ~/$WORKDIR/scripts/build/project_build.sh >/dev/null 2>&1

#RUN
# Commented out since it might not return control back to the script
# print_progress "Running application...              "
# bash ~/$WORKDIR/scripts/run/run.sh >/dev/null 2>&1

#SERVICE
# Uncomment and modify as needed
# print_progress "Initializing services...            "
# bash ~/$WORKDIR/scripts/services/services_init.sh >/dev/null 2>&1

echo -ne '\n'
echo "### PROJECT FULLY INITIALISED ###"
