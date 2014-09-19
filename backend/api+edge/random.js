// GET  /api/random/:wait?min=&max=     Simula un'elaborazione (aspettando wait sec) e ritorna un numero random [min-max) o un eccezione
function random(req,res,next) { 
    var wait = parseInt(req.params.wait,10) % 11 || 1;  //leggo nr sec da attendere dalla route (max 10 - def 1s)
    var min = parseInt(req.query.min,10) || 0; //leggo dalla querystring <min> valore inferiore intervallo generatore
    var max = parseInt(req.query.max,10) || 10;//leggo dalla querystring <max> valore superiore intervallo generatore

    var rnd = Math.random();
    if (rnd<0.7) { 
        // il 70% delle volte genero un numero random nell'intervallo [min-max) e lo ritorno dopo <wait> secondi
        setTimeout( function returnRndMinMaxAfterWait() {
                        console.log({estratto: rnd, aspetto: wait+'s'});
                        res.status(200).send( 
                        parseInt( (rnd*1000000000) % (max-min) + min , 10).toString() );
                    }, wait*1000);
    } else if (rnd>0.9) { 
        // il 10% delle volte simulo un'eccezione facendo direttamente il throw (elaborazione sincrona)
        throw new Error("Random Error"); //NOTA: il modo standard di propagare l'errore sarebbe:  next(new Error...);
    } else  { 
        // il restante 20% delle volte simulo un'eccezione Asincrona ossia scatenata dopo l'inizio delle operazioni
        process.nextTick(function(){ 
            next(new Error("Async Random Exception")); //NOTA: se qui faccessi il throw TIRO GIU' IL SERVER NODE!!!!
        }); 
    }
}

exports = module.exports = random;