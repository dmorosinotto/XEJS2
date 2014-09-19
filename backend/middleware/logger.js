//Inizializzo la console per il logging
var verbose = (process.env.NODE_ENV && process.env.NODE_ENV.substr(0,3).toLowerCase()) === 'dev';
console.log("VERBOSE=",verbose);
require('./consoleColor').colorizeConsole();
//faccio require del modulo UMD pretty usabile sia da RequireJS che da CommonJS/Node
var pretty = require('../../js/samples/pretty');


//Semplice Middleware che logga tutte le richieste 
exports.logReq = function(req,res,next) {
	//console.log('%s - %s %s',(new Date()).toISOString(), req.method, req.url);
	console.log(pretty((new Date()).toISOString(), req.method, req.url));
	console.info(verbose ?  {body: req.body, query: req.query} : 'OK');
	next();
};

//Semplice Middleware che fa da error handle e logga l'errore sulla console e ritorna 500
exports.logErr =  function logger(err, req, res, next) {
	if (!err) return next();
	//console.warn('%s - %s %s',(new Date()).toISOString(), req.method, req.url);
	console.warn(pretty((new Date()).toISOString(), req.method, req.url));
  console.error(err.message);
  if (verbose) console.info(err.stack);  
  res.status(500).end(err.message);
};