var app = require('http').createServer(httpHandler)
var io = require('socket.io')(app);

app.listen(8000);

function httpHandler (request, response) {

  	response.writeHead(200, {'Content-Type': 'text/html' });
    response.end('<html><body>This is a simple Node Server</body></html>', 'binary');

}

var screen = io
	.of('/screen')
	.on('connection', function (socket) {
  		socket.emit('hello', { hello: 'screen' });
		socket.on('my other event', function (data) {
    		console.log(data);
  		});
	});

var input = io
	.of('/input')
	.on('connection', function (socket) {
  		socket.emit('hello', { hello: 'input' });
		socket.on('my other event', function (data) {
    		console.log(data);
  		});
	});