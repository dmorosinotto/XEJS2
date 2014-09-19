//ESEMPIO UTILIZZO PER options map + defaults
function doSomething(opt) {
  var defaults = { enable: false, count: 0, title: "", values: [1,2,3] };
  var options = mixIn({}, defaults, opt);     //opzioni correnti con 
                                  //ovverride in base all'opt passate
  //... logica della funzione che usa TUTTE le options
  console.dir(options);
}

//UNITTEST 
doSomething();  //non passando niente ottengo i defaults
doSomething({enable: true, count: 9}); //caso tipico di utilizzo
doSomething({title: "Sovrascrivo e aggiungo TAG", tag: "MERGIATO!"});
doSomething({title: "Attenzione sovrascrivo l'array NON FA MERGE!"
                    , values: [4,5,6,7,8,9]});
doSomething({title: "Fare molta attenzione pechè posso anche ELIMINARE con undefined!!!"
                    , count: null, values: undefined});
                    

function mixIn(target /*, ...mixins*/ ) {
    var i, k, mixin, n = arguments.length;  //numero di argomenti passati mixins* 
    if (n<=1) return target;  //se passo solo target lo ritorno subito invariato
    for(i=0; i<n; i++) {
      mixin = arguments[i]; //elaboro ogni singolo oggetto mixin passato
      for(k in mixin) {     //copiando tutti i membri in target (sovrascivendo)
        if (mixin.hasOwnProperty(k)) target[k] = mixin[k];        
      }
    }
    return target;          //ritorno l'oggetto "aumentato"
}