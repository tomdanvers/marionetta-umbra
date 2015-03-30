
console.log('Main()');

var io = require('socket.io-client');

var screen = io('http://localhost:8000/screen');
screen.on('hello', function (data) {
	console.log('screen', data);
	screen.emit('my other event', { hello: 'back' });
});

var input = io('http://localhost:8000/input');
input.on('hello', function (data) {
	console.log('input', data);
	input.emit('my other event', { hello: 'back' });
});