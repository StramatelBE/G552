#!/bin/bash

read -p "Enter a version number for this build: " VERSION_NUMBER

echo "$VERSION_NUMBER" > metadata/verion

echo "Version $VERSION_NUMBER has been saved."

BUILD=G552_BUILD_$VERSION_NUMBER.zip

bash ./scripts/build/project_build.sh

zip -r zip/$BUILD build/

sha256sum zip/$BUILD | awk {'print $1'} > metadata/checksum
cat metadata/version >> metadata/checksum

cp zip/$BUILD ~/Documents/Stramatel/g552_builds/
cp -r metadata/ ~/Documents/Stramatel/g552_builds/
