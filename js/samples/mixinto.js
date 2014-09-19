//CLASSE Person con color (*) usata per salvare colore preferito
function Person(name, preferredColor) {
  this.name = name;
  this.color = preferredColor;  
}
Person.prototype.likes = function() {
  var ILike = this.name + ' likes ' + this.color; //che valore avrà color?  
  console.log(ILike + '? Yes!');                  //chissa cosa stampa?
  this.Log && this.Log(ILike);    //richiamo il logger metodo (mixInto)! 
};

var Pippo = new Person('Pippo','red');
var Pluto = new Person('Pluto','blue');


//CLASSE Logger con color (*) usata per definire il metodo della console da chiamare
function Logger(on) {
  this.color = on || 'warn';
  this.Log = function(msg) {
    console[this.color](this.color+'>> '+ msg); //chissa quale color legge?
  };  
}
Logger.prototype.switchTo = function(output) {
  this.color = output;                      //quale color va a modificare?
};

var eLog = new Logger();            //Usa default console.warn --> giallo


//AGGANCIA I METODI AL prototype di Person COSI' VALE PER TUTTE LE ISTANZE!!!
mixInto(Person.prototype, eLog);  
//Usando mixIn AVREI ERRORI / SIDE-EFFECTS CONFLITTO SU color
//mixIn(Person.prototype, eLog);   
//mixIn(Pippo, eLog);
console.log('--- UNITTEST ---');
Pippo.likes();
Pluto.likes();
console.log('--- CAMBIO su Logger');
eLog.switchTo('error');     //Cambio il color sul Logger error --> rosso
Pippo.likes();
Pluto.likes();
console.log('--- CAMBIO su Person');
Pluto.switchTo('info');     //Cambio il color da un'istanza (mixInto)!
Pippo.color = 'green';      //Cambio il color dell'istanza Person
Pippo.likes();
Pluto.likes();
console.log('--- VEDIAMO COLOR ---');
console.dir(Pippo);
console.dir(Pluto);
console.dir(eLog);


//MIXINTO AGGANCIA I METODI ALL'OGGETTO MA MANTIENE CONTESTO ORIGINALE OK
function mixInto(target, source /*, ...onlyMethods*/){
  var i, method, n = arguments.length;
  if (n<=1) return target; //se passo solo target lo ritorno subito invariato
  if (n>2) {       //posso passare anche elenco dei metodi da replicare
    for(i=2; i<n; i++) {        
      method = arguments[i];
      if (typeof source[method] === 'function') { //copio solo onlyMethods
          //prima di associare il method a target faccio il bind al source
          target[method] = source[method].bind(source); //mantiene contesto
      }                                      
    }
  } else {         //altrimenti copio tutti i metodi presenti in source
    for(method in source) {     
      if (typeof source[method] === 'function') { //copio TUTTE le funzioni/metodi del source
          //prima di associare il method a target faccio il bind al source
          target[method] = source[method].bind(source); //mantiene contesto
      }                                      
    }
  }
  return target;  //ritorno l'oggetto composto con le funzioni però bindate al source
}


//MIXIN - SOVRASCRIVE E DA ERRORI / SIDEEFFECT X CONFLITTO NOMI
function mixIn(target) {
    var i, k, mixin, l = arguments.length; //numero di argomenti passati
    if (l<=1) return target; //se passo solo target lo ritorno invariato
    for(i=0; i<l; i++) {
      mixin = arguments[i]; //elaboro ogni singolo oggetto mixin passato
      for(k in mixin) {     //copiando tutti i membri in target (sovrascivendo)
        if (mixin.hasOwnProperty(k)) target[k] = mixin[k];        
      }
    }
    return target;
}