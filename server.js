// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

function1= function() {
	console.log("München")
	function3( () => {console.log("London"), function4( function2() ) } )
	}
	function2= function(callback) {
	console.log("Hamburg")
	if (callback)
	callback()
	}
	function3= function(callback) {
	console.log("Berlin")
	if (callback)
	callback()
	}
	function4= function(callback) {
	console.log("Potsdam")
	if (callback)
	callback()
	}
	function2(function1)