#!/bin/bash
# This script starts a simple HTTP server for running the production build.
echo "Starting production server at http://localhost:8000"
echo "Serving files from the 'production' directory."
echo "Make sure you have run './scripts/build.sh' first."
echo "Press Ctrl+C to stop the server."
python3 -m http.server 8000 --directory production
