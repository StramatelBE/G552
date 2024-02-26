#!/bin/bash
WORKDIR=~/server/
BUILDDIR=~/server/build
FRONTDIR=~/server/frontend
BACKDIR=~/server/backend
DISPDIR=~/server/display

SCRIPTDIR=~/server/scripts/build

echo "APP BUILDING"

CUR_POS=$PWD

echo "BACKEND BUILD"
cp $SCRIPTDIR/build.sh $BACKDIR/
cd $BACKDIR
$BACKDIR/build.sh
cp -r $BACKDIR/* $BUILDDIR/backend/
cp $BACKDIR/package.json $BUILDDIR/backend/
sudo rm -r $BUILDDIR/backend/node_modules
echo "FRONTEND BUILD"
cp $SCRIPTDIR/build.sh $FRONTDIR/
cd $FRONTDIR
$FRONTDIR/build.sh
cp -r $FRONTDIR/build $BUILDDIR/frontend/
cp $FRONTDIR/package.json $BUILDDIR/frontend/
echo "DISPLAY BUILD"
cp $SCRIPTDIR/build.sh $DISPDIR/
cd $DISPDIR
$DISPDIR/build.sh
cp -r $DISPDIR/build $BUILDDIR/display/
cp $DISPDIR/package.json $BUILDDIR/display/

cd $CUR_POS

