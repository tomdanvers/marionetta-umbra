
/* 
 * ================================================
 * robot arm - inverse kinematics
 * http://www.dhteumeuleu.com/the-law-of-robotics
 * Author Gerard Ferrandez - 10 August 2011
 * ------------------------------------------------
 * Released under the MIT license
 * http://www.dhteumeuleu.com/LICENSE.html
 * Last updated: 24 Dec 2012
 * ================================================
 */
 
"use strict";

(function () {
	var scr, pointer, robots = [], transform, transformOrigin;
	// ----- Robot prototype -----
	var Robot = function (span) {
		this.span = span;
		this.armSegments = [];
		this.numSegments = 1;
		this.y = 0;
		// ---- root ----
		this.armSegments.push(
			new ArmSegment (this, false)
		);
		// ---- html defined arms ----
		var s = span.getElementsByTagName("img");
		for (var img, i = 0; img = s[i++];) {
			this.numSegments ++;
			this.armSegments.push(
				new ArmSegment (this, img)
			);
		}
	}
	// ----- animation function -----
	Robot.prototype.anim = function () {
		// ----- tracking mouse -----
		var seg1 = this.armSegments[this.numSegments - 1];
		seg1.x += (pointer.X - seg1.x - this.span.offsetLeft) * 0.075;
		seg1.y += (pointer.Y - seg1.y - this.span.offsetTop)  * 0.075;
		// ----- inverse kinematics -----
		var i = this.numSegments - 1;
		while ( --i ) {
			// ---- bottom up chain ----
			var seg0 = this.armSegments[i];
			var seg1 = this.armSegments[i + 1];
			var a = Math.atan2(seg0.y - seg1.y, seg0.x - seg1.x);
			seg0.x = seg1.x + Math.cos(a) * seg1.length;
			seg0.y = seg1.y + Math.sin(a) * seg1.length;
		}
		var i = 0, seg0, seg1;
		while ( seg0 = this.armSegments[i++]) {
			// ---- up bottom chain ----
			if (i > 1) {
				var seg1 = this.armSegments[i - 2];
				var a = seg0.a = Math.atan2(seg0.y - seg1.y, seg0.x - seg1.x);
				seg0.x = seg1.x + Math.cos(a) * seg0.length;
				seg0.y = seg1.y + Math.sin(a) * seg0.length;
			}
			// ---- CSS 2D transforms animation -----
			if (seg0.img) {
				seg0.css[transform] = "translate(" 
					+ ((0.5 + seg0.x - seg0.sx) | 0) + "px," 
					+ ((0.5 + seg0.y - seg0.sy) | 0) + "px) rotate(" + seg0.a + "rad)";
				seg0.css[transformOrigin] = ((0.5 + seg0.sx) | 0) + "px " 
					+ ((0.5 + seg0.sy) | 0) + "px";
			}
		}
	}
	// ----- Arm prototype -----
	var ArmSegment = function(parent, img) {
		this.img = img;
		//img.draggable = false;
		this.width = 0;
		this.length = 0;
		this.sx = 0;
		this.a = 0;
		this.x = 0;
		if (img) {
			this.css    = img.style;
			this.sy     = Math.round(img.height * 0.5);
			this.length = img.width - this.sy;
			this.sx     = img.width;
		}
		this.y = parent.y;
		parent.y += this.length;
	}
	// ----- main loop -----
	var run = function () {
		// ---- robots ----
		for (var r, i = 0; r = robots[i++];) {
			r.anim();
		}
		// ---- next frame ----
		requestAnimFrame(run);
	}
	// ----- initialization -----
	var init = function () {
		// ---- screen ---- 
		scr = new ge1doot.Screen({
			container: "screen"
		});
		/* ---- pointer ---- */
		pointer = new ge1doot.Pointer({});
		// ----- CSS3 2D transforms browsers prefix detection -----
		var t = ["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"];
		for (var test, i = 0; test = t[i++];) {
			if (typeof document.body.style[test] != "undefined") {
				transform = test;
				transformOrigin = test + "Origin";
				break;
			}
		}
		// ---- instanciate robot arms ----
		var s = document.getElementById("screen").getElementsByTagName("span");
		for (var r, i = 0; r = s[i++];) {
			robots.push(
				new Robot (r)
			);
		}
		pointer.X = scr.width / 2;
		pointer.Y = scr.height / 2;
		// ----- start engine -----
		if (transform) run();
	}
	return {
		// ---- launch script -----
		load : function (params) {
			window.addEventListener('load', function () {
				init();
			}, false);
		}  
	}
})().load();
