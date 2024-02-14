#!/bin/bash

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git

WORKDIR=server

#SOFTWARE UPDATE
sudo apt update
sudo apt upgrade -y

#BASIC UTILITIES
sudo apt install -y vim curl wget git

#CLONE REPOSITORY
cd ~
git clone $GITHUB_REPOSITORY $WORKDIR

#NODE INSTALL
~/$WORKDIR/scripts/setup/node_install.sh
npm install -g serve

#NODE MODULE INSTALL
~/$WORKDIR/scripts/setup/npm_init.sh

#BUILD
~/$WORKDIR/scripts/build/build.sh

#START SCRIPT COPY
cp ~/$WORKDIR/scripts/run/startBackend.sh ~/$WORKDIR/build/backend
cp ~/$WORKDIR/scripts/run/startFrontend.sh ~/$WORKDIR/build/frontend
cp ~/$WORKDIR/scripts/run/startDisplay.sh ~/$WORKDIR/build/display

#SERVICE INITIALIZATION
sudo cp ~/$WORKDIR/scripts/services/* /etc/systemd/system/
sudo systemctl enable frontend.service
sudo systemctl enable backend.service
sudo systemctl enable display.service






