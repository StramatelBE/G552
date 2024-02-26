#!/bin/bash

read -p "Enter a version number for this build: " VERSION_NUMBER

FOLDER=zip/$VERSION_NUMBER
BUILD=$FOLDER/G552_BUILD_$VERSION_NUMBER.zip
BUILD_REPO=~/Documents/Stramatel/g552_builds/builds
METADATA=$FOLDER/metadata
CHECKSUM=$METADATA/checksum
VERSION=$METADATA/version

function check_duplicate_checksums() {
    local new_checksum=$(sha256sum "$BUILD" | awk '{print $1}')
    for dir in zip/*/; do
        if [ -f "${dir}metadata/checksum" ] && [ "$(cat "${dir}metadata/checksum")" == "$new_checksum" ] && [ "${dir}" != "$FOLDER/" ]; then
            local existing_version=$(basename "$dir")
            echo "A similar build with the same checksum exists for version: ${existing_version%/}"
            exit 1
        fi
    done
}

echo "Creating Version Folder"
if [ -d "$FOLDER" ]; then
    echo "This Version directory already exists: $VERSION_NUMBER"
    if [ -f "$CHECKSUM" ]; then
        bash ./scripts/build/project_build.sh > /dev/null 2>&1
        zip -9 -r $BUILD build/ > /dev/null 2>&1
        NEW_CHECKSUM=$(sha256sum $BUILD | awk '{print $1}')
        
        if [ "$NEW_CHECKSUM" != "$(cat $CHECKSUM)" ]; then
            read -p "Checksums are different. Do you want to erase the existing version? (y/n): " user_choice
            if [ "$user_choice" == "y" ]; then
                echo "$NEW_CHECKSUM" > $CHECKSUM
                echo "$VERSION_NUMBER" > $VERSION
                cp -r $FOLDER $BUILD_REPO/$VERSION_NUMBER
                echo "Files copied with new version!"
            else
                echo "Exiting script."
                exit 1
            fi
        else
            echo "Checksums are the same, no need to copy anything."
            exit 1
        fi
    fi
else
    mkdir -p $FOLDER
    mkdir -p $METADATA
    echo "$VERSION_NUMBER" > $VERSION
    echo "Building project version: $VERSION_NUMBER."
    bash ./scripts/build/project_build.sh > /dev/null 2>&1
    echo "Packaging builds..."
    zip -9 -r $BUILD build/* > /dev/null 2>&1
    echo "Creating checksum..."
    sha256sum $BUILD | awk '{print $1'} > $CHECKSUM
    check_duplicate_checksums
    echo "Copying files..."
    cp -r $FOLDER $BUILD_REPO/$VERSION_NUMBER
    echo "Files copied!"
fi
