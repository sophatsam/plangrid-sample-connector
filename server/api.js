// -------------------------------------------------- //
// Load dependencies
// -------------------------------------------------- //
const request = require('request');
const Utility = require('./utility');

module.exports = {
	makeBatchRequest: function(req) {
		var self = this;
		return new Promise(function(resolve, reject) {
			Utility.readTokenFile(req.sessionID)
				.then(function(token) {
					let options = {
						url: 'https://io.plangrid.com/batch',
						method: 'POST',
						headers: {
							"Accept": "application/vnd.plangrid+json; version=1",
							"Content-Type": "application/json",
							"Authorization": "Bearer " + JSON.parse(token).access_token,
						},
						json: req.body.request
					}

					self.makeRequest(options)
						.then(resolve)
						.catch(reject)
				})
				.catch(reject);
		});
	},

	makeRequest: function(options) {
		return new Promise(function(resolve, reject) {
			let data = '';
			request(options)
				.on('data', function(chunk) { data += chunk })
				.on('end', function(response) {
					response = JSON.parse(data);
					resolve(response)
				})
				.on('error', function(err) {
					reject(error);
				})
		})
	}
}