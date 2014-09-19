//IIFE UMD PATTERN
(function ( root, glbname, definition ){  
	if ( typeof define === 'function' && define.amd ){ // AMD Module		
		define(definition);
	} else if ( typeof module !== 'undefined' && module.exports ) { // Node.js Module		
		module.exports = definition();		
	} else { // Assign to common namespaces or simply the global object (window)		
		root[glbname] = definition();
	}
})( this || window || global, 'GLOBAL_MODULE_NAME', function () {
/* IL CODICE VERO E PROPRIO DEL MODULO VA QUI E ALLA FINE FA return { ... alla RevealingModule ...};
	//private state (internals)
	var _x;
	var _f = function() { console.log(arguments); };

	//public revealing module pattern
	return {
		alias:function() {
          _f(_x);
        }
	};
*/
});