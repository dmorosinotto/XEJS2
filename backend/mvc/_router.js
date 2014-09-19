var express = require('express');
var bodyParser = require('body-parser');


// Inizializzo un oggetto router per configurare il routing e i middleware usati in questa "porzione di sito" /MVC
var router = express.Router();

// middleware di Express per ritornare le risorse statiche, rimappate in /css /js e /images - sono poi usate nelle View con @Url.Content(...)
router.use('/css/', express.static(__dirname + '/Content'));
router.use('/js/', express.static(__dirname + '/Scripts'));
router.use('/images/', express.static(__dirname + '/Images'));

// middleware di Express per fare il parse delle "forms" application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false })); 

// middleware di Express per fare il parse del JSON application/json
router.use(bodyParser.json());

// middleware per usare Razor come engine di render (sovrascrive res.render)
router.use(useRazor());

// configuro le route per /Home in un file esterno (controller MVC)
router.use('/Home', require('./Controllers/HomeController'));

// configuro le route per /Values in un file esterno (controller API)
router.use('/Values', require('./Controllers/ValuesController'));

// default route /Home/Index, altrimenti fa render pagine Errore
router.get('*', function(req,res) {
	if (req.path === '/') {		
		res.redirect(req.baseUrl + '/Home/Index');
	} else {
		res.View('Shared/Error');
	}
});
	
exports = module.exports = router; 





//HELPER semplice Middleware che espone il render con sintassi Razor ( supporta @model, @ViewBag, @renderBody e @renderSection )
function useRazor() {
	// creo una closure in cui istanzio e inizializzo l'engine di Razor
	var razor = require('kally-razor')({ 
  					root: __dirname + '/Views/',
  					layout: 'Shared/_Layout.cshtml', 
  					baseUrl: '/mvc' //path di base usata per risolvere ~/ quando chiamo @Url.Content(...)
				});
	
	// funzione middleware espone l'helper res.View(v,m) e che usa il render Razor per ritornare l'html della view cshtml passata
	return function(req,res,next) {		
		res.render = razor.render.bind(razor);
		res.View = function(viewName, model) {
			model = model || {};
			viewName = viewName.lastIndexOf('.')==-1 ? viewName+'.cshtml' : viewName;
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end( razor.render(viewName, model) );
		};
		next();
	};
}