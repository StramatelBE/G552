#!/bin/bash

read -p "Enter a version number for this build: " VERSION_NUMBER

echo "$VERSION_NUMBER" > metadata/version

echo "Version $VERSION_NUMBER has been saved."

BUILD=G552_BUILD_$VERSION_NUMBER.zip
BUILD_REPO=~/Documents/Stramatel/g552_builds
echo "Building project version: $VERSION_NUMBER."
bash ./scripts/build/project_build.sh > /dev/null 2>&1

echo "Packaging builds..."
zip -9 -r zip/$BUILD build/ > /dev/null 2>&1

echo "Creating checksum..."
sha256sum zip/$BUILD | awk {'print $1'} > metadata/checksum
truncate --size -1 metadata/checksum
echo -n "|" >> metadata/checksum
cat metadata/version >> metadata/checksum
CHECKSUM=$(cat metadata/checksum)
echo "Checksum : $CHECKSUM"

echo "Copying files..."
mkdir $BUILD_REPO/$VERSION_NUMBER
cp zip/$BUILD $BUILD_REPO/$VERSION_NUMBER
cp -r metadata/ $BUILD_REPO/$VERSION_NUMBER
echo "Files copied!"

