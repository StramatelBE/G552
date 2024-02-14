#!/bin/bash
WORKDIR=~/home/$USER/server/
BUILDDIR=~/home/$USER/server/build/
FRONTDIR=~/home/$USER/server/frontend/
BACKDIR=~/home/$USER/server/backend/
DISPDIR=~/home/$USER/server/display/

$BACKDIR/build.sh
$FRONTDIR/build.sh
$DISPDIR/build.sh

cp -r $BACKDIR/* $BUILDDIR/backend/
cp -r $FRONTDIR/build $BUILDDIR/frontend/
cp -r $DISPDIR/build $BUILDDIR/display/

$BUILDIR/update-repo.sh
