// -------------------------------------------------- //
// Load dependencies
// -------------------------------------------------- //
const dotenv = require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const Logger = require('../config/logger');
const OAuth = require('./oauth');
const API = require('./api');
const Utility = require('./utility');


// -------------------------------------------------- //
// Set up Express server
// -------------------------------------------------- //
let server = express();
server.use( express.static(__dirname + '../../client' ));
server.use( cookieParser() );
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({ extended: true }) );
server.use( session({
	secret: "r9rW}>F(u>3)'5Mc",
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // default to 7 days
}));

// -------------------------------------------------- //
// Set up routes
// -------------------------------------------------- //
server.get('/', function(req, res){
	res.send('/index.html');
});

server.get('/authorize', function(req, res) {
	let authUrl = OAuth.getAuthUrl(req);
	res.redirect(authUrl);
});

server.get('/callback', function(req, res) {
	OAuth.requestAccessToken(req)
		.then(function(token){
			Utility.writeTokenFile(req.sessionID, token)
				.then(function() {
					res.redirect('/app.html');
				})
				.catch(function(err){
					Logger.error(err, new Date() );
					res.redirect('/');
				})
		}).catch(function(error){
			Logger.error(error, new Date() );
			res.redirect('/');
		});
});

server.get('/refresh', function(req, res) {
	OAuth.refreshToken(req)
		.then(function(token) {
			Utility.writeTokenFile(req.sessionID, token)
				.then(function() {
					res.redirect('/app.html');
				})
				.catch(function(err){
					Logger.error(err, new Date() );
					res.redirect('/');
				})
		}).catch(function(err) {
			Logger.error(err, new Date() );
			res.redirect('/');
		})
});

server.post('/batch', function(req, res) {
	if (!req.body.request) {
		res.send("No request was provided.");
	} else {
		Utility.readTokenFile(req.sessionID)
			.then(function(token) {
				API.makeBatchRequest(req.body.request, JSON.parse(token).access_token)
					.then(function(data){
						res.json(data);
					})
					.catch(function(error) {
						Logger.error(error, new Date() );
						res.redirect('/');
					});
			})
			.catch(function(err){
				Logger.error(err, new Date() );
				res.redirect('/');
			})

	}
});

module.exports = server;