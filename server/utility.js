// -------------------------------------------------- //
// Load dependencies
// -------------------------------------------------- //
const fs = require('fs');

module.exports = {
	writeTokenFile: function(sessionID, token) {
		return new Promise(function(resolve, reject) {
			fs.writeFile(__dirname + '/tokens/' + sessionID + '.json', JSON.stringify(token), function(err){
				err ? reject(err) : resolve(token);
			})
		});
	},

	readTokenFile: function(sessionID) {
		return new Promise(function(resolve, reject) {
			fs.readFile(__dirname + '/tokens/' + sessionID + '.json', 'utf8', function(err, token) {
				err ? reject(err) : resolve(token);
			});
		});
	}
}