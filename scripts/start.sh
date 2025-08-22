#!/bin/bash
# This script starts a live-reloading server for developing the game.
echo "Starting development server with live reload..."
echo "Serving files from the 'development' directory."
echo "Your browser will automatically refresh when you save changes."
echo "Press Ctrl+C to stop the server."
npx live-server development/
