//SINGLETON PATTERN
var SINGLETON = (function(){
	var instance;					//Variabile che conterrà l'unica istanza viva

	function init() {
		var _privVar, pubVar;		//Variabili private e pubbliche
		function _fn(){ /*...*/ }	//Funzioni private
		
		return {					//ritorna all'esterno l'interfaccia pubblica del modulo
			pub: pubVar,
			method: function(){ /*...*/ }
		};
	}

	return {						//Logica di istanziazione del singleto una volta sola!
		getInstance: function() {
			if (!instance) instance = init();
			return instance;
		}
	};

})(); //eseguo la IIFE in modo da salvare in SINGLETON l'oggetto che contiene getInstance();