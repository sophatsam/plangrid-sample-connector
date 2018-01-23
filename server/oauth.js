// -------------------------------------------------- //
// Load dependencies
// -------------------------------------------------- //
const dotenv = require('dotenv').config();
const request = require('request');

const Logger = require('../config/logger');
const Utility = require('./utility');

module.exports = {
	getAuthUrl: function(req) {
		return 'https://io.plangrid.com/oauth/authorize?response_type=code' +
							'&client_id=' + process.env.CLIENT_ID +
							'&redirect_uri=' + process.env.REDIRECT_URI +
							'&state=' + req.sessionID
	},

	requestAccessToken: function(req) {
		var self = this;
		return new Promise(function(resolve, reject) {
			if (!req.query.code){
				reject("No authorization code was provided.");
			} else if (req.query.state !== req.sessionID){
				reject("The request made does not match this session.");
			} else {

				let tokenObject = {
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: 'authorization_code',
					code: req.query.code,
					redirect_uri: process.env.REDIRECT_URI
				}

				self.retrieveAccessToken(tokenObject)
					.then(resolve)
					.catch(reject)
			}
		});
	},

	refreshToken: function(req) {
		var self = this;
		return new Promise(function(resolve, reject) {
			Utility.readTokenFile(req.sessionID)
				.then(function(token){
					let tokenObject = {
						client_id: process.env.CLIENT_ID,
						client_secret: process.env.CLIENT_SECRET,
						grant_type: 'refresh_token',
						refresh_token: JSON.parse(token).refresh_token
					}

					self.retrieveAccessToken(tokenObject)
						.then(resolve)
						.catch(reject)
				})
				.catch(reject);
		})
	},

	retrieveAccessToken: function(tokenObject) {
		return new Promise(function(resolve, reject) {
			let options = {
				method: 'POST',
				url: process.env.TOKEN_HOST,
				form: tokenObject,
				headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
			}

			request(options, function(err, response, body) {
				err ? reject(err) : resolve(JSON.parse(body))
			})
		})
	}
}