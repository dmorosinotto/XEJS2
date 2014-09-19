// Inizializzo un oggetto per configurare il routing i middleware usati in questo "Controller" MVC/Home
var HomeController = require('express').Router();

HomeController.get('/Index', function(req,res) {		
	// uso l'helper res.View() esposto dal middleware per renderizzare con Razor il file cshtml	
	res.View('Home/Index.cshtml');
});

HomeController.get('/About', function(req,res) {
	// uso l'helper res.View() esposto dal middleware per renderizzare con Razor il file cshtml	+ passandogli il @model	
	res.View('Home/About', require('../Models/HostInfo'));
});

exports = module.exports = HomeController;