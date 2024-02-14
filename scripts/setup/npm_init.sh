#!/bin/bash

echo "NODE MODULE INITIALIZATION"

SCRIPTDIR=~/server/scripts/setup
FRONTDIR=~/server/frontend
BACKDIR=~/server/backend
DISPDIR=~/server/display




echo "BACKEND NODE MODULES"
cp $SCRIPTDIR/init.sh $BACKDIR
$BACKDIR/init.sh
echo "FRONTEND NODE MODULES"
cp $SCRIPTDIR/init.sh $FRONTDIR
$FRONTDIR/init.sh
echo "DISPLAY NODE MODULES"
cp $SCRIPTDIR/init.sh $DISPDIR
$DISPDIR/init.sh

echo "### END ###"


