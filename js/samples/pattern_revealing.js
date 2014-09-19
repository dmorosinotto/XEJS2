//REVEALING MODULE CLASSICO
var NOME_MOD = (function(){
	var _privVar, pubVar;			//Variabili private e pubbliche
	function _fn(){ /*...*/ }		//Funzioni private

	//ritorna all'esterno l'interfaccia pubblica del modulo
	return {
		pub: pubVar,
		method: function(){ /*...*/ }
	};
})(); //eseguo la IIFE in modo da salvare in NOME_MOD l'istanza del modulo (interfaccia pubblica)