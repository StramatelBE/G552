#!/bin/bash
WORKDIR=~/server/
BUILDDIR=~/server/build/
FRONTDIR=~/server/frontend
BACKDIR=~/server/backend
DISPDIR=~/server/display

$BACKDIR/build.sh
$FRONTDIR/build.sh
$DISPDIR/build.sh

cp -r $BACKDIR/* $BUILDDIR/backend/
cp -r $FRONTDIR/build $BUILDDIR/frontend/
cp -r $DISPDIR/build $BUILDDIR/display/

$BUILDIR/update-repo.sh
