#!/bin/bash

# Script to update version in package.json
# Usage: ./scripts/update-version.sh [version]
# Example: ./scripts/update-version.sh 1.2.3

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 1.2.3"
    exit 1
fi

VERSION=$1

# Validate version format (basic semver check)
if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in semver format (x.y.z)"
    exit 1
fi

echo "Updating version to $VERSION..."

# Update package.json
npm version $VERSION --no-git-tag-version

echo "Version updated successfully!"
echo "Don't forget to:"
echo "1. Commit the changes"
echo "2. Create a release tag: git tag v$VERSION"
echo "3. Push the tag: git push origin v$VERSION"
