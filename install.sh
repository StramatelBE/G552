#!/bin/bash

GITHUB_REPOSITORY=https://github.com/StramatelBE/G552.git

WORKDIR=server


#SOFTWARE UPDATE
sudo apt update
sudo apt upgrade -y

#INITIALISATION
sudo apt install -y vim curl wget git
cd /home/$USER
git clone $GITHUB_REPOSITORY $WORKDIR
cd /home/$USER/$WORKDIR/scripts/setup/
./install_node.sh
cd ../../
npm install -g serve






