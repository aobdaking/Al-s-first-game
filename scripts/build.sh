#!/bin/bash
# This script creates a production build by copying files from development to production.
# For a real-world application, this script should be expanded to include
# steps for bundling and minifying JavaScript, CSS, and other assets.

echo "Creating production build..."

# Remove the old production directory to ensure a clean build
if [ -d "production" ]; then
  rm -rf production
fi

# Copy the development directory to production
cp -r development production

echo "Build complete. Production files are in the 'production' directory."
