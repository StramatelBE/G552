#!/bin/bash

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git
WORKDIR=server

# Function to display a loading bar
loading_bar() {
    local duration=$1
    local steps=30 # Width of the loading bar
    local percent step

    echo -n "["
    # Initialize loading bar with blanks
    for ((i=0; i<steps; i++)); do echo -n " "; done
    echo -ne "] 0%%\r["
    
    # Fill the loading bar
    for ((i=0; i<=steps; i++)); do
        sleep $(echo "scale=2; $duration/$steps" | bc)
        percent=$(( (i * 100) / steps ))
        step=$((i*steps/100))
        
        # Move cursor to start of the bar
        echo -ne "\r["
        
        # Fill with #
        for ((j=0; j<i; j++)); do echo -n "#"; done
        
        # Fill the rest with spaces
        for ((k=i; k<steps; k++)); do echo -n " "; done
        
        # Print percentage
        echo -n "] "
        echo -n "${percent}%"
    done
    echo # Move to the next line after completion
}

echo "Starting project initialization..."

echo "Updating software packages..."
sudo apt-get update > /dev/null 2>&1
sudo apt-get upgrade -y > /dev/null 2>&1
loading_bar 3 # Simulate loading for 3 seconds

echo "Installing basic utilities..."
sudo apt-get install -y vim curl wget git > /dev/null 2>&1
loading_bar 3

echo "Cloning repository..."
cd ~
if [ -d "$WORKDIR" ]; then
    echo "Directory $WORKDIR already exists, skipping clone."
else
    git clone $GITHUB_REPOSITORY $WORKDIR > /dev/null 2>&1
fi
loading_bar 3

echo "Installing Node.js..."
~/$WORKDIR/scripts/setup/node_install.sh > /dev/null 2>&1
npm install -g serve > /dev/null 2>&1
loading_bar 3

echo "Installing Node modules..."
~/$WORKDIR/scripts/setup/npm_init.sh > /dev/null 2>&1
loading_bar 3

echo "Building project..."
~/$WORKDIR/scripts/build/project_build.sh > /dev/null 2>&1
loading_bar 3

echo "Running project..."
# Uncomment the next line if your run script outputs to the terminal and you want to keep it running
# ~/$WORKDIR/scripts/run/run.sh > /dev/null 2>&1 & 
loading_bar 3

echo "### PROJECT FULLY INITIALIZED ###"
