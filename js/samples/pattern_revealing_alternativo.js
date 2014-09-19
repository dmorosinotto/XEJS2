//REVEALING MODULE ALTERNATIVO CON IIFE A CUI PASSO GLOBAL E NOME MODULO DA ESPORRE ALL'ESTERNO
(function(root, moduleName){
	var _privVar, pubVar;			//Variabili private e pubbliche
	function _fn(){ /*...*/ }		//Funzioni private

	//al posto di fare return {... public ...} il modulo 
	//si AUTO-ESPONE nel contesto globale col nome passato
	root[moduleName] = {
		pub: pubVar,
		method: function(){ /*...*/ }
	};
})( this||window , 'NOME_MOD' ); 
//al posto di fare      var NOME_MOD = Revealing(/* con return {...} */);
//eseguo una IIFE a cui passo root = contesto o window + moduleName='NOME_MOD'