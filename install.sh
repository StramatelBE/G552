#!/bin/bash

echo -e "Starting \033[35m setup \033[0m process..."

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git
WORKDIR=server

# Initialize progress
TOTAL_STEPS=7
CURRENT_STEP=-1

function print_progress {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    PERCENT=$(( (CURRENT_STEP * 100) / TOTAL_STEPS ))
    echo -ne "Progress: ["
    for ((i = 0; i < (PERCENT / 10); i++)); do echo -ne "\033[33m#\033[0m"; done
    for ((i = (PERCENT / 10); i < 10; i++)); do echo -ne "\033[31m-\033[0m"; done
    echo -ne "] \033[32m $PERCENT\033[0m% - \033[36m $1 \033[0m \r"
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
print_progress "Running application...              "
# bash ~/$WORKDIR/scripts/run/run.sh >/dev/null 2>&1

#SERVICE
print_progress "Initializing services...            "
# bash ~/$WORKDIR/scripts/services/services_init.sh >/dev/null 2>&1

echo -ne '\n'
echo -e "\033[34m#\033[0m#\033[31m# \033[34mPROJECT \033[0m SUCCESSFULLY \033[31m INITIALIZED \033[0m \033[34m#\033[0m#\033[31m#"
