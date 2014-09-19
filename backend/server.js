var express = require('express');
var logger = require('./middleware/logger');

// creo e configuro l'applicazione express
var app = express();

// semplice middleware custom per fare il log di tutte le richieste
app.use(logger.logReq);

// middleware di Express che serve/ritorna i file statici (asset) letti dalla cartella /www
app.use(express.static(__dirname + '/www'));
app.use('/lib/', express.static(__dirname + '/../lib'));
app.use('/js/samples/', express.static(__dirname + '/../js/samples'));

// configuro routing per /MVC in un file esterno (utilizzo engine Razor per node x generare pagine HTML a partire dalle View)
app.use("/mvc", require("./mvc/_router"));

// middleware di Express per gestire CORS - abilito richieste CORS (cross-domain) da QUALSIASI Origin!!!
var cors = require('cors')({ /*ATTENZIONE IN PRODUZIONE PASSARE CONFIGURAZIONE {corsOptions} https://www.npmjs.org/package/cors */ });

// GET /random  funzione che genera numeri random oltre a volte tira delle eccezioni
// posso passargli nella route quanti secondi aspettare prima di ritornare (simula elborazione)
// posso passare in querystring i valori min e max per definire l'intervallo dei valori generati
app.get("/random/:wait?", cors, require('./api+edge/random'));	  //con chiamate CORS abilitate!

// GET  /calc/a[+-*/]b   funzione che calcola una operazione tra numeri interi 
// usa una regular expression per catturare i parametri e l'operazione da eseguire + - * /
app.get(/^\/calc\/(\d+)([\+\-\*\/])(\d+)$/, cors, require('./api+edge/calc'));
// GET  /API/calc/stra+strb  funzione che calcola la concatenazione di due stringhe 
// usa sempre la regular expression per catturare i parametri e l'operazione è solo +
app.get(/^\/calc\/(\w+)([\+])(\w+)$/, cors, require('./api+edge/calc'));

// cacth-all che fa fallback ritornando Hello World! in un modo un po' particolare ;-)
app.get("*", require('./api+edge/helloworld'));

//app.use(require('errorhandler'));
app.use(logger.logErr);

// metto in ascolto il server HTTP sulla porta 3000
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Server listening on port %d', server.address().port);
});