var http = require('http');
var server = http.createServer(function (request, response) {
	console.log(request.url);
	response.writeHead(200, {'Content-Type': 'text/html' });
    response.end('<html><body>This is a simple Node Server</body></html>', 'binary');
});

server.listen(8000);