//SINGLETON PATTERN 
var mySingleton = (function () {   
  var instance;   //varibile che mantiene l'unica istanza viva del Singleton
 
  //Implementazione del Singleton basato sul REVEALING MODULE / IIFE
  function init() {
    var privateVariable = "I'm private";  //variabili private
    var privateRandomNumber = Math.random();

    function privateMethod(){       //metodo privato non accesibile all'esterno
        console.log( "I am also private" );
        return privateVariable;
    }
 
    //REVELING MODULE CON PARTE PUBBLICA ESPOSTA DIRETTAMENTE NELLA RETURN
    return {       
      publicMethod: function () {     //metodo pubblicao del singleton
          console.log( "The public can see me!" );
          console.warn("but I can use " + privateMethod());          
      },
      getRandomNumber: function() {   //espongo accessor a una variabile privata          
          return privateRandomNumber; 
      }
    }; //fine return
  } //fine init()
 
  //GESTIONE DEL SINGLETON
  return { 
    getInstance: function () {        //ritorno istanza del Singleton 
      if ( !instance ) {                //lo creo una volta sola tramite
        instance = init();          //init() alla prima richiesta
      } 
      return instance;              //poi ritorno sempre stessa istanza
    }
  };

})();

for(var i=0; i<5; i++) {
  //Random generator (praticamente costante) perchè è un singleton!
  console.log(mySingleton.getInstance().getRandomNumber());
}
mySingleton.getInstance().publicMethod();