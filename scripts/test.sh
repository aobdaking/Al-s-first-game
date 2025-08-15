#!/bin/bash
# This script starts a simple HTTP server for testing the game.
echo "Starting server at http://localhost:8000"
echo "Press Ctrl+C to stop the server."
python -m http.server 8000
