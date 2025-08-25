from livereload import Server
import os

# This script starts a live-reloading server for the 'development' directory.

# Get the absolute path to the repository root (one level up from this script)
repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# Define the path to the development directory
dev_dir = os.path.join(repo_root, 'development')

# Create a new server instance
server = Server()

# Add the development directory to the watch list.
# The server will now monitor this directory for changes.
server.watch(dev_dir + '/')

# Start the server, serving files from the development directory
# on port 5500. The server will automatically open the browser.
print(f"Serving files from: {dev_dir}")
print("Starting server at http://localhost:5500")
print("Watching for changes... Press Ctrl+C to stop.")
server.serve(root=dev_dir, port=5500, open_url_delay=1)
