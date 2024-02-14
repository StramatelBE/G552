#!/bin/bash

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git
WORKDIR=server


display_progress() {
    local step=$1
    local total_steps=$2
    local percent=$((200*step/total_steps % 2 + 100*step/total_steps))
    local filled_length=$((50*step/total_steps))
    local bar=''

    # Prepare the bar and the empty space
    for ((i=0; i<filled_length; i++)); do
        bar="${bar}#"
    done
    for ((i=filled_length; i<50; i++)); do
        bar="${bar} "
    done

    # Clear the line before printing the new progress
    echo -en "\r\033[K"
    printf "Progress: [%-50s] %s%%" "$bar" "$percent"
}

total_steps=7
current_step=0

update_progress() {
    ((current_step++))
    display_progress $current_step $total_steps
}

echo "Starting project initialization..."
update_progress

echo "Updating software packages..."
sudo apt-get update > /dev/null 2>&1
sudo apt-get upgrade -y > /dev/null 2>&1
update_progress

echo "Installing basic utilities..."
sudo apt-get install -y vim curl wget git > /dev/null 2>&1
update_progress

echo "Cloning repository..."
cd ~
if [ -d "$WORKDIR" ]; then
    echo "Directory $WORKDIR already exists, skipping clone."
else
    git clone $GITHUB_REPOSITORY $WORKDIR > /dev/null 2>&1
fi
update_progress

echo "Installing Node.js..."
~/$WORKDIR/scripts/setup/node_install.sh > /dev/null 2>&1
npm install -g serve > /dev/null 2>&1
update_progress

echo "Installing Node modules..."
~/$WORKDIR/scripts/setup/npm_init.sh > /dev/null 2>&1
update_progress

echo "Building project..."
~/$WORKDIR/scripts/build/project_build.sh > /dev/null 2>&1
update_progress

echo "Running project..."
# Uncomment the next line if your run script outputs to the terminal and you want to keep it running
# ~/$WORKDIR/scripts/run/run.sh > /dev/null 2>&1 &
update_progress

echo -e "\n### PROJECT FULLY INITIALIZED ###"
