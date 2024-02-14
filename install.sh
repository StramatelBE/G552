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
~/$WORKDIR/scripts/build/project_build.sh

#RUN
~/$WORKDIR/scripts/run/run.sh

#SERVICE
# ~/$WORKDIR/scripts/services/services_init.sh

echo "### PROJECT FULLY INITIALISED ###"
