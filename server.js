var http = require('http'),
    fs = require('fs'),
    files = {},
    debug = true,
    port = process.env.PORT || 8080;

var respond = function (file, res) {
    var contentType;
    switch (file.ext) {
        case "css":
            contentType = "text/css";
            break;
        case "html":
            contentType = "text/html";
            break;
        case "js":
            contentType = "application/javascript";
            break;
        case "ico":
            contentType = "image/ico";
            break;
        case "htc":
            contentType = "text/x-component";
            break;
        default:
            contentType = "text/plain";
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(file.content);
};

var serveAssets = function (req, res) {
    var file = req.url === '/' ? 'index.html' : req.url;
    if (!files[file] || debug) {
        try {
            files[file] = {
                content: fs.readFileSync('build' + "/" + file),
                ext: file.split(".").pop().toLowerCase()
            }
        } catch (err) {
            res.writeHead(404, {'Content-Type': 'plain/text'});
            res.end('Missing resource: ' + file);
            return;
        }
    }
    respond(files[file], res);
};

module.exports = http.createServer(function (req, res) {
    serveAssets(req, res);
}).listen(port);

console.log("Listening on port " + port + '...');