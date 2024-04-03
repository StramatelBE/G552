#!/bin/bash

export PATH="/home/STRAMATEL/.nvm/versions/node/v20.11.1/bin:$PATH"
export DISPLAY=:0

VERSION=$(cat ~/builds/builds/selected_version)

cd ~/builds/builds/$VERSION/build/frontend

npm start
