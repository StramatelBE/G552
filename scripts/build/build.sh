#!/bin/bash
WORKDIR=~/home/$USER/server/
BUILDDIR=~/home/$USER/server/build/


cd $WORKDIR/backend
npm i
cp -r * $BUILDDIR/backend/
cd $WORKDIR/frontend
npm i
npm run build
cp -r build $BUILDDIR/frontend/
cd $WORKDIR/display
npm i
npm run build
cp -r build $BUILDDIR/display/
