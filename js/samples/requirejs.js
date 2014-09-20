//sintassi classica di RequireJS con depedency injiection 
//qui faccio anche un alias del modulo hello --> hi
require(['hello'],function(hi) {
  hi('Pippo'); 
});



//supporta anche sintassi alla CommonJS per compatiblità tramite un wrapper interno
//che injietta di defautl queste dipendenze:   ['require','exports','module']
require(['hello'],function(){
	//POSSO SEMPRE USARE require(<moduli_delle_dipendenze>);
	var hello = require('hello');
	hello('Pippo | posso usare require(<moduli_delle_dipendenze>)');
});