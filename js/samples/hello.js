//ESEMPIO DI DEFINE CLASSICA CHE RITORNA UNA FUNZIONE hello E CHE USA UNA DIPENDENZA console
define('hello',['console'],function(console){	
	return function(msg) {
		console.log('Ciao ' + msg);
		window.alert('Saluti da ' + msg);	
	};
});