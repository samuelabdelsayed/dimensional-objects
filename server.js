const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
    // Redirect root to index.html
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Get the absolute path to the file
    filePath = path.join(__dirname, filePath);
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set the default content type
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested resource could not be found.</p>');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}/`);
});