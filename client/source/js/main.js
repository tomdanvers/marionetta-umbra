
var SocketScreenEvents = require('../../../shared/source/js/constants/socket-screen-events');

var MarionettaUmbraScreen = require('./screen/screen.js');
var MarionettaUmbraInput = require('./input/input.js');

console.log('Main()');

var io = require('socket.io-client');

// Screen
new MarionettaUmbraScreen('screen');

// var screen = io('http://localhost:8000/screen');
// screen.on('connect', function () {

// 	console.log(screen);
// 	console.log('connected to screen');
// 	screen.emit(SocketScreenEvents.ROOM_REQUEST, 'Test Room');

// });

// Input
new MarionettaUmbraInput('input');

// var input = io('http://localhost:8000/input');
// input.on('hello', function (data) {
// 	console.log('input', data);
// 	input.emit('my other event', { hello: 'back' });
// });