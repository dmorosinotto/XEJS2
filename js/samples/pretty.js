//IIFE UMD SAMPLE: pretty 
(function ( root, glbname, definition ){
  if ( typeof define === 'function' && define.amd ){ 
    define(glbname, definition);      // AMD Module
  } else if ( typeof module !== 'undefined' && module.exports ) { 
    module.exports = definition();    // Node.js Module
  } else { // Assign to current context or global object
    root[glbname] = definition();
  }
})( this || window || global, 'pretty', function () {

//HELPER Funzione che ritorna concatenazione di tutti i parametri passati in formato "leggibile"
return function pretty() {  
  return Array.prototype.reduce.call(arguments,function(acc,item) {    
    var s = (''+item); //coercizione a stringa (internamente chiama toString)
    if (s === '[object Object]') { s = JSON.stringify(item);} //formatta JSON
    return acc+' '+s;
  },'');
  /* // Per chi non è avezzo all' Array.reduce il codice "funzionale" qui sopra equivale a:
  var acc='';
  for(var i=0; i<arguments.lenght; i++) {
    var item = arguments[i];
    var s = (''+item); //coercizione a stringa (internamente chiama toString)
    if (s === '[object Object]') { s = JSON.stringify(item);} //formatta JSON
    acc = acc +  ' ' + s;
  }
  return acc;*/
};
 
});