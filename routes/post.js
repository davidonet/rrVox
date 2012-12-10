/*
 * GET users listing.
 */
var fs = require("fs");

var words = [];
fs.readFile('./tools/blacklist.txt', 'utf8', function(err, data) {
	words = data.split(/\ *\n/);
});

exports.newTxt = function(req, res) {
	msgWord = req.body.txt.split(/\ /);
	var passed = msgWord.every(function(w, i) {
		return words.every(function(b, j) {
			return w.toLowerCase() != b.toLowerCase();
		});
	});
	if (passed) {
		global.red.rpush('msg', req.body.txt);
		global.io.sockets.emit('newtxt', req.body);
	}
	res.json(req.body);
};
