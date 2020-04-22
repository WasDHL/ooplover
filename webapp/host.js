var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

var port = 7778;

var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var localFileServer = function (pathname, request, response) {
    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(pathname, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(pathname, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
               } else {
                   var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
};

http.createServer(function (request, response) {
    console.log("REAL--" + request.url)

    // console.log("PROXY-LOCALHOST-- " + request.url);
    //
    //    request.url = request.url.replace('/!/audience/api/', '/');
    //    // proxy.web(request, response, { target: 'http://192.168.10.55:9102'});
    //    proxy.web(request, response, { target: 'http://localhost:9102'});

    var pathname = url.parse(request.url).pathname;

    if (pathname.indexOf('/api/') > -1) {
        // proxy.web(request, response, { target: 'http://localhost:9987'});
        proxy.web(request, response, { target: 'http://101.132.177.143:9987'});
        return;
    }

    var pathname = url.parse(request.url).pathname;

    if (pathname == "/") {
        pathname = "/index.html";
    }

    if(!path.extname(pathname)) { pathname = "/index.html"; }

    var filePathName = path.join("./dist/", pathname);

    console.log("LOCALFILE-- " + filePathName);

    return localFileServer(filePathName, request, response);
}).listen(port);


console.log('Server running at http://127.0.0.1:' + port + '/');






// End
