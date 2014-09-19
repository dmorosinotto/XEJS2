var edge = require('edge');

// Esempio di funzione .NET richiamata da node (grazie a EDGE.js) con parametri in ingresso complessi letti tramite dynamic
// ed inoltre mostra utilizzo di una funzione passata da JS e che viene richiamata in modo asincrono da .NET (interazione!!) 
var _NETadd_sub_cb = edge.func(function () {/*
	async (dynamic input) => { 
    switch((string)(input.oper.op)) {
      case "+":         //calcola soma di due numeri o concatenazione di stringhe
				return await Task.FromResult<string>((input.oper.a + input.oper.b).ToString());
				break;
      case "-":         //calcola sottrazione di due numeri
				return (input.oper.a - input.oper.b).ToString();
				break;
      default:          //tutte altre operazione richiama funzione JS in modo asincrono
				//per richiamare la funzione JS d ain modo dinamico devo castarla e poi eseguire await
				var eval = (Func<object,Task<object>>)input.jseval; 
				return await eval(input.oper); 
    }
  }
*/});


// Funzione che viene richiamta da .NET per fare valutazione al volo degli operatori diversi da + e -
// la firma del metodo deve essere:   (dataFromNET: any, callback: (error, result) => void) => void
// e deve usare la callback per ritornare valori (o eventuale errore) a .NET che poi prosegue il calcolo
function _JSeval(oper, cb) {	
	try {
		console.warn('JS richiamato da .NET esegue eval',oper);
    var res = String(eval(oper.a + oper.op + oper.b)); //SOLO A SCOPO DIMOSTRATIVO USO EVAL!!!
		cb(null, res);	//ritorna il valore valutato a .NET 
	} catch(err) {
		cb(err, null);	//se ci sono errori li propaga a .NET
	}
}



// Funzione che esegue il calcolo dell'operazione passata nella route GET	/api/calc/a+-*/b
// OSS: il calcolo viene fatto passando i parametri a .NET che li legge tramite un dynamic 
// e si incarica del calcolo dell'operazione + e - (e concatenazione stringhe), le altre operazioni
// le demanda a javascript richiamando indietro la funzione _JSevel che valuta * e / tra numeri
exports = module.exports = function calc(req,res,next) { 
	// Creo un'oggetto che uso come payload per passare i parametri a .NET che poi eseguirà il calcolo
	var data = { 
		oper: { 
			a:  Number(req.params[0]) || req.params[0],	//operatore a (può essere numero o stringa)
			op: req.params[1],							//operazione da eseguire +-*/ per i numeri SOLO + per stringhe
			b:  Number(req.params[2]) || req.params[2],	//operatore b (può essere numero o stringa)
		},
		jseval: _JSeval //posso passare anche una function di JS a .NET che la potrà richiamare in modo asincorno
	};
	
  console.log("ESEGUO");  console.dir(data.oper);

	_NETadd_sub_cb(data, function(error, result) {
		if (error) next(new Error(error));
		console.info(".NET ha calcolato e ritornato",result);
		res.status(200).send(result);
	});
};