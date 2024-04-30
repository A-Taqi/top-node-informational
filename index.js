const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url).pathname;
    const filePath = path.join(__dirname, 'public', urlPath === '/' ? 'index.html' : `${urlPath}.html`);

    const errorPage = fs.readFileSync(path.join(__dirname, 'public', '404.html'), "utf-8", (err, data) => {
        if (err) throw err;
        return data;
      });

    fs.readFile(filePath, (err, data) => {
        const content = err ? errorPage : data;
        const statusCode = err ? 404 : 200;

        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();
    });
    
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));