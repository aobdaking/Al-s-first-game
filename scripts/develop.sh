#!/bin/bash
# This script starts a simple HTTP server for developing the game.
echo "Starting development server at http://localhost:8000"
echo "Serving files from the 'development' directory."
echo "Press Ctrl+C to stop the server."
python3 -m http.server 8000 --directory development
