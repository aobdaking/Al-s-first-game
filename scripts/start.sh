#!/bin/bash

# This script starts the development server by running the server.py helper script.
python3 scripts/server.py
# This script starts a live-reloading server for developing the game.
echo "Starting development server with live reload..."
echo "Serving files from the 'development' directory."
echo "Your browser will automatically refresh when you save changes."
echo "Press Ctrl+C to stop the server."
python3 -m livereload development/
