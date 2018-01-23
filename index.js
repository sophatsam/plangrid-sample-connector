// -------------------------------------------------- //
// Start up server
// -------------------------------------------------- //
const Logger = require('./config/logger');
const server = require('./server/server');

server.listen(process.env.PORT, function() {
	Logger.info( "Express server listening on port " + process.env.PORT, new Date() );
});