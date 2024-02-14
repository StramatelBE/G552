#!/bin/bash
SCRIPTDIR=~/server/scripts/run
BUILDDIR=~/server/build

cp $SCRIPTDIR/startBackend.sh $BUILDDIR/backend/
cp $SCRIPTDIR/startFrontend.sh $BUILDDIR/frontend/
cp $SCRIPTDIR/startDisplay.sh $BUILDDIR/display/
