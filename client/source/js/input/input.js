
var PuppetLimb = require('./puppet/puppet-arm');

var template = require('../../templates/input.hbs');

module.exports = function(elId) {
	
	var data = {};
	
	var el = document.getElementById(elId);
	el.innerHTML = template(data);

	console.log('Input(', elId, el, ')');

	var width = window.innerWidth;
	var height = window.innerHeight;

	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	
	var marionetteSelect = el.childNodes[0];
	var marionetteRender = el.childNodes[2];
	console.log(marionetteSelect)
	console.log(marionetteRender)
	marionetteRender.appendChild(canvas);

	canvas.addEventListener('touchstart', function(event) {

		event.preventDefault();

		var touch = event.changedTouches[0];

		var nearestLimb = getNearestLimb(touch.clientX, touch.clientY);

		nearestLimb.startTouch(touch.identifier);

	});

	canvas.addEventListener('touchmove', function(event) {

		event.preventDefault();

		var touches = event.changedTouches;

		var limb, touch;
		for (var i = 0; i < limbs.length; i++) {
			limb = limbs[i];
			
			for (var j = 0; j < touches.length; j++) {
				touch = touches[j];

				if (limb.getTouchId() === touch.identifier) {
					limb.pointerX = touch.clientX + limb.offsetX;
					limb.pointerY = touch.clientY + limb.offsetY;
				}
			}

		};
		
	});

	canvas.addEventListener('touchend', function(event) {

		event.preventDefault();

		var limb;
		for (var i = 0; i < limbs.length; i++) {
			limb = limbs[i];
		
			if (limb.getTouchId() === event.changedTouches[0].identifier) {
				
				limb.stopTouch();
			}
		}
		
	});

	var ctx = canvas.getContext('2d');

	var limbs = [];
	limbs.push(new PuppetLimb('arm-left', width*.4, height*.5, 15, -65));
	limbs.push(new PuppetLimb('arm-right', width*.6, height*.5, -15, -65));

	requestAnimationFrame(update);

	function update() {

		var i;

		// Update

		for(i = 0; i < limbs.length; i ++) {
			limbs[i].update();
		}

		// Render - Background

		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,width,height);

		// Render - Limbs

		ctx.lineWidth = 5;
		ctx.lineCap = ctx.lineJoin = 'round';

		var limb;
		var segment;
		for(i = 0; i < limbs.length; i ++) {

			limb = limbs[i];

			ctx.beginPath();
			for(var j = 0; j < limb.segmentCount; j ++) {
				segment = limb.segments[j];
				if (j === 0) {
					ctx.moveTo(limb.x + segment.x, limb.y + segment.y);
				} else {
					ctx.lineTo(limb.x + segment.x, limb.y + segment.y);
				}
			
			}
			ctx.stroke(); 

		}

		// Render - Torso

		ctx.beginPath();
		ctx.moveTo(limbs[0].x, limbs[0].y);
		ctx.lineTo(limbs[1].x, limbs[1].y);
		ctx.lineTo(width*.5, limbs[1].y + 60);
		ctx.lineTo(limbs[0].x, limbs[0].y);
		ctx.stroke(); 

		requestAnimationFrame(update);
	}

	function getNearestLimb(x, y) {

		var limb, diffX, diffY, distance, nearest;
		var shortestDistance = Number.MAX_VALUE;

		for( var i=0; i < limbs.length; i ++) {
			limb = limbs[i];
			
			diffX = x - limb.getExtremity().x;
			diffY = y - limb.getExtremity().y;
			distance = Math.sqrt(diffX*diffX + diffY*diffY);

			if (!nearest || distance < shortestDistance) {
				nearest = limb;
				shortestDistance = distance;
			}

		}

		return nearest;

	}



}