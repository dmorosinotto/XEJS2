var edge = require('edge');

// Esempio di funzione .NET richiamata da node grazie ad EDGE.js con codice multiline (trucchetto del /*comment*/ nella function)
var _NETworld = edge.func(function () {/*
    async (input) => { 
        return input.ToString() + " world!";         
    }
*/});

// GET *	catch-all che ritorna 'Hello world!' in modo un po particolare grazie (a EDGE) e alla collaborazione Node.js + .NET
function helloWorld(req,res,next) {
	_NETworld('Hello', function(error, result) {
		if (error) next(new Error(error));
		res.status(200).send(result);
	});
}

exports = module.exports = helloWorld;



// Informazioni su Node: versione e sistema operativo host
function _nodeVer() { return "Node " + process.version + " running on " + process.platform + " " + process.arch; }
console.warn(_nodeVer()); 

// Esempio di funzione .NET richiamata da node grazie ad EDGE.js con codice completamente "in-line" in una stringa
var _dotnetVer = edge.func('async _ => ".NET " + System.Environment.Version.ToString() + " running on " + System.Environment.OSVersion.Platform.ToString(); ');
console.info(_dotnetVer(null,true)); //forza chiamata sincrona da node --> .NET, normalmente si usa callback(err,res)