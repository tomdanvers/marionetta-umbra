var app = require('http').createServer(httpHandler)
var io = require('socket.io')(app);

var SocketScreenEvents = require('./constants/socket-screen-events');

app.listen(8000);

function httpHandler (request, response) {

  	response.writeHead(200, {'Content-Type': 'text/html' });
    response.end('<html><body>This is a simple Node Server</body></html>', 'binary');

}

var rooms = {};

// Screen Connections
var screen = io
	.of('/screen')
	.on('connection', function (socket) {

		// socket.emit('hello', { hello: 'screen' });

		socket.on(SocketScreenEvents.ROOM_REQUEST, function (roomId) {
			
			if (rooms[roomId] === undefined) {
				rooms[roomId] = {id:roomId};
			}


			socket.join(roomId);

			console.log(socket.rooms);

		});

	});

// Input Connections
var input = io
	.of('/input')
	.on('connection', function (socket) {
		// socket.emit('hello', { hello: 'input' });
		// socket.on('my other event', function (data) {
		// 	console.log(data);
		// });
	});