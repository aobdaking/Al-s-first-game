import http.server
import socketserver
import os

# Get the absolute path to the repository root (one level up from this script)
repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# Define the path to the development directory
dev_dir = os.path.join(repo_root, 'development')

PORT = 5500

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=dev_dir, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"Serving files from: {dev_dir}")
    print(f"Starting server at http://localhost:{PORT}")
    httpd.serve_forever()
