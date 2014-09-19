var _repositoryInMem = ["value1", "value2"];  //variabile che mi fa da "repository" in memory

// Inizializzo un oggetto per configurare il routing i middleware usati in questo "Controller" MVC/Home
var ValuesController = require('express').Router();

// GET values/api
ValuesController.get('/api', function(req,res) {
	// ritorno l'elenco di tutti i valori presenti nel repository
	res.json(_repositoryInMem);
});

// POST values/api
ValuesController.post('/api', function(req,res) {
	// inserisce un elemento nell'elenco e ne ritorna l'indice	
	var value = req.body.newValue;
	//logica validazione del valore passato come {newValue: "..."}
	if(typeof value === 'string') { 
		var idx = _repositoryInMem.length;
		_repositoryInMem[idx] = value || '<valore non specificato>';
		res.status(201).send(idx.toString());
	} else {
		res.status(500).end('Accept ONLY string values!');
	}
});

// Definizione del parametro :id usato nelle route GET /api/:id e DELETE /api/:id
ValuesController.param('id',function(req, res, next, id) {
	//logica validazione parametro id (indice passato)
	var idx = parseInt(id,10);
	//logica validazione id / indice passato
	if (idx>=0 && idx < _repositoryInMem.length) {
		req.idx = idx; //espongo indice come req.idx
		next();
	} else {
		next(new Error('Index out of range!'));
	}
});

// GET values/api/:id
ValuesController.get('/api/:id', function(req,res) {
	// ritorno un singolo valore passando id --> ricava l'indice (req.idx)
	res.status(200).send(_repositoryInMem[req.idx]);
});

// DELETE values/api/:id
ValuesController.delete('/api/:id', function(req,res) {	
	delete _repositoryInMem[req.idx];
	res.status(200).end();
});

// GET values/*.js --> ritorna codice client angular
ValuesController.get("/*.js", function(req,res){
	// uso l'helper res.View() esposto dal middleware per ritornare il file javascript con la logica lato client Angular
	res.View('Values/ngValues.js');
});

// GET values/ --> ritorna HTML (razor) della pagina ngValues
ValuesController.get('*', function(req,res) {
	// uso l'helper res.View() esposto dal middleware per renderizzare una pagina che usa Angular per interagire con l'api REST
	res.View('Values/ngValues.cshtml');
});

exports = module.exports = ValuesController;