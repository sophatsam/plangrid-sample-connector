// -------------------------------------------------- //
// Load dependencies
// -------------------------------------------------- //
const request = require('request');
const Utility = require('./utility');

module.exports = {
	makeBatchRequest: function(requests, token){
		return new Promise(function(resolve, reject) {
			let options = {
				url: 'https://io.plangrid.com/batch',
				method: 'POST',
				headers: {
					"Accept": "application/vnd.plangrid+json; version=1",
					"Content-Type": "application/json",
					"Authorization": "Bearer " + token,
				},
				json: requests
			}

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
		});
	}
}