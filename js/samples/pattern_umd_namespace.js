//IIFE UMD PATTERN WITH GLOBAL NAMESPACE.HIERARCHY
(function ( root, glbnamesape, definition ) {
    if ( typeof define === 'function' && define.amd ){ // AMD Module        
        define(definition);
    } else if ( typeof module !== 'undefined' && module.exports ) { // Node.js Module       
        module.exports = definition();      
    } else { // spezzo il glbnamesape in sequenza di package=namespace[i] 
             // e crea la corrispondente struttura oggetti        
        var namespaces = glbnamesape.split('.');
        var scope = root;
        for (var i = 0; i < namespaces.length; i++) {
            var packageName = namespaces[i];
            if (scope && i == namespaces.length - 1) {
                scope[packageName] = definition(); //SETTO OGGETTO ALL'ULTIMO LIVELLO
            } else if (typeof scope[packageName] === 'undefined') {
                scope[packageName] = {}; //CREO OGGETTI INTERMEDI
            }
            scope = scope[packageName];
        }
    }
})( this || window || global , 'NAMESPACE.HIERARCHY.GLOB_NAME', function () {
    /* IL CODICE VERO E PROPRIO DEL MODULO VA QUI E ALLA FINE FA return { ... alla RevealingModule ... };
    // private state revealing module pattern
    var _private;
    function _localHelper(p){
        console.log( p || _private);
    };

    // define your module here and return the public API
    return {        
        method: function ( par ) {
                    _localHelper(par);
                }
    };
    */
});