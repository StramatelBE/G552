#!/bin/bash

echo "NODE MODULE INITIALIZATION"

SCRIPTDIR=~/server/scripts/setup
FRONTDIR=~/server/frontend
BACKDIR=~/server/backend
DISPDIR=~/server/display


CUR_POS=$PWD

echo "BACKEND NODE MODULES"
cp $SCRIPTDIR/init.sh $BACKDIR
cd $BACKDIR
$BACKDIR/init.sh
echo "FRONTEND NODE MODULES"
cp $SCRIPTDIR/init.sh $FRONTDIR
cd $FRONTDIR
$FRONTDIR/init.sh
echo "DISPLAY NODE MODULES"
cp $SCRIPTDIR/init.sh $DISPDIR
cd $DISPDIR
$DISPDIR/init.sh

echo "### END ###"
cd $CUR_POS


