import http.server
import os

class SingleFileHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Define the file to serve for all routes
        single_file = 'index.html'

        if os.path.isfile(self.translate_path(self.path)):
            super().do_GET()
        else:
            # Otherwise, serve the single file
            self.path = '/' + single_file
            super().do_GET()

PORT = 8000
handler = SingleFileHTTPRequestHandler
httpd = http.server.HTTPServer(('0.0.0.0', PORT), handler)

print(f"Serving on port {PORT}...")
httpd.serve_forever()

