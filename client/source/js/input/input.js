var template = require('../../templates/input.hbs');

module.exports = function(elId) {
	
	var data = {};
	
	var el = document.getElementById(elId);
	el.innerHTML = template(data);

	console.log('Input(', elId, el, ')');

	var width = 300;
	var height = 500;

	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	el.appendChild(canvas);

	canvas.addEventListener('touchstart', function(event) {

		var touch = event.changedTouches[0];

		console.log('start', touch.identifier);
		
		if (touch.identifier === 0) {

			if (touch.clientX < width*.5) {
				armLeft.setPointer(pointers[0]);
				armRight.setPointer(pointers[1]);
			} else {
				armLeft.setPointer(pointers[1]);
				armRight.setPointer(pointers[0]);
			}
			
		}
		

	});

	canvas.addEventListener('touchmove', function(event) {

		var touch;
		for (var i = 0; i < event.changedTouches.length; i++) {
			touch = event.changedTouches[i];
			if (touch.identifier < 2) {
				pointers[touch.identifier].x = touch.clientX;
				pointers[touch.identifier].y = touch.clientY;
			}
		}

		event.preventDefault();
		
	});

	var ctx = canvas.getContext('2d');

	var pointers = [
		{
			x: 0,
			y: 0
		},
		{
			x: 0,
			y: 0
		}
	];

	var armLeft = new Arm('left', width*.3, height*.5, pointers[0]);
	var armRight = new Arm('right', width*.7, height*.5, pointers[1]);

	var arms = [];
	arms.push(armLeft);
	arms.push(armRight);

	console.log(arms);

	requestAnimationFrame(update);

	function update() {

		armLeft.update();
		armRight.update();

		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,width,height);

		var arm;
		var segment;
		for(var i = 0; i < arms.length; i ++) {

			arm = arms[i];
			// console.log(i, arm.id, arm.x, arm.y)

			ctx.beginPath();
			for(var j = 0; j < arm.segmentCount; j ++) {
				segment = arm.segments[j];

				if (j === 0) {
					ctx.moveTo(arm.x + segment.x, arm.y + segment.y);
				} else {
					ctx.lineTo(arm.x + segment.x, arm.y + segment.y);
				}
			
			}
			ctx.stroke(); 

		}

		requestAnimationFrame(update);
	}

	function Arm(id, x, y, pointer) {

		console.log('Arm(',id, x, y,')');

		var segmentDefinitions = [70, 70, 70, 20];
		var segmentCount = segmentDefinitions.length;
		var segments = [];

		var pointer = pointer;
		
		for (var i = 0; i < segmentCount; i++) {
			segments.push(new Segment(i, segmentDefinitions[i]));
		}

		function update() {

			var seg1 = segments[segmentCount - 1];
			seg1.x += (pointer.x - seg1.x - x) * 0.075;
			seg1.y += (pointer.y - seg1.y - y)  * 0.075;
			
			var i = segmentCount - 1;
			while ( --i ) {

				var seg0 = segments[i];
				var seg1 = segments[i + 1];
				var a = Math.atan2(seg0.y - seg1.y, seg0.x - seg1.x);
				seg0.x = seg1.x + Math.cos(a) * seg1.length;
				seg0.y = seg1.y + Math.sin(a) * seg1.length;

			}

			var i = 0, seg0, seg1;
			while ( seg0 = segments[i++]) {

				if (i > 1) {
					var seg1 = segments[i - 2];
					var a = seg0.a = Math.atan2(seg0.y - seg1.y, seg0.x - seg1.x);
					seg0.x = seg1.x + Math.cos(a) * seg0.length;
					seg0.y = seg1.y + Math.sin(a) * seg0.length;
				}

			}

		}	

		function setPointer(value) {
			
			if (pointer) {
				value.x = pointer.x;
				value.y = pointer.y;
			}

			pointer = value;

		}

		return {
			id: id,
			x: x,
			y: y,
			segmentCount: segmentCount,
			segments: segments,
			update: update,
			setPointer: setPointer
		};

	}

	function Segment(index, length) {
		
		return {
			x: 0,
			y: 0,
			length: length
		}

	}



}