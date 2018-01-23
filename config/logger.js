const winston = require('winston');
const logger = new winston.Logger({
	level: 'info',
	format: 'winston.format.json()',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'logs/log.json'}),
	]
});

module.exports = logger;