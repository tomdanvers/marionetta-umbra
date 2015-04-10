var TWEEN = require('tween.js');

module.exports = function(id, x, y) {

	console.log('PuppetArm(',id, x, y,')');
	
	var segmentDefinitions = [70, 70, 70, 20];
	var segmentCount = segmentDefinitions.length;
	var segments = [];

	var tweenTO;
	var tweenValues = {x:1, y:1};
	var tween = new TWEEN.Tween(tweenValues);
	var isTweening = false;

	var velX = 0;
	var pointerXOld= 0;

	var velY = 0;
	var pointerYOld = 0;

	var touch = null;

	var api = {
		id: id,
		x: x,
		y: y,
		pointerX: x,
		pointerY: y + 200,
		segmentCount: segmentCount,
		segments: segments,
		update: update,
		getExtremity: getExtremity,
		startTouch: startTouch,
		stopTouch: stopTouch,
		getTouchId: getTouchId
	};

	
	for (var i = 0; i < segmentCount; i++) {
		segments.push(new ArmSegment(i, segmentDefinitions[i]));
	}

	var extremity = segments[segmentCount - 1];

	function update() {

		if (isTweening) {

		} else if (touch === null) {

			velX *= .9;
			velY *= .9;

			api.pointerX += velX;
			api.pointerY += velY;

		} else {

			velX = api.pointerX - pointerXOld;
			velY = api.pointerY - pointerYOld;

		}

		var seg1 = segments[segmentCount - 1];
		seg1.x += (api.pointerX - seg1.x - x) * 0.75;
		seg1.y += (api.pointerY - seg1.y - y)  * 0.75;
		
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

		pointerXOld = api.pointerX;
		pointerYOld = api.pointerY;

		TWEEN.update();

	}	

	function startTouch(id) {

		touch = id;

		tween.stop();
		clearTimeout(tweenTO);

	}	

	function stopTouch() {

		touch = null;

		tweenTO = setTimeout(function() {

			tweenValues.x = api.pointerX;
			tweenValues.y = api.pointerY;
			
			var targetX = api.x;
			var targetY = api.y + 200;

			var diffX = targetX - tweenValues.x;
			var diffY = targetY - tweenValues.y;

			var distance = Math.sqrt(diffX*diffX + diffY*diffY);

			tween
			.to({
				x: targetX,
				y: targetY
			}, distance * 2)
			.onStart(function() {
				velX = velY = 0;
				isTweening = true;
			})
			.onUpdate(function() {
				api.pointerX = tweenValues.x;
				api.pointerY = tweenValues.y;
			})
			.onStop(function() {
				isTweening = false;
			})
			.onComplete(function() {
				isTweening = false;
			})
			.start();

		}, 1000);
		

	}

	function getTouchId() {

		return touch;

	}

	function getExtremity() {
		
		return {
			x: x+extremity.x,
			y: y+extremity.y
		};
	}

	return api;

	function ArmSegment(index, length) {
		
		return {
			x: 0,
			y: 0,
			length: length
		};

	}

}