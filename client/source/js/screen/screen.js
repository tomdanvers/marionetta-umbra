var template = require('../../templates/screen.hbs');

module.exports = function(elId) {

	var data = {};
	
	var el = document.getElementById(elId);
	el.innerHTML = template(data);

	console.log('Screen(', elId, el, ')');

}