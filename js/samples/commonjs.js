//COMMONJS ESEMPI DI require
var p = [];

// Faccio require di un modulo che espone il costrutture (tramite module.export) 
var Person = require('./Person');
// e lo riuso più volte per creare diverse istanze
p.push( new Person('Pippo') );
p.push( new Person('Pluto') );
p.push( new Person('','Paperino') );
p.push( new Person('Zio','Paperone') );

// oppure se me ne serviva solo una potevo fare direttamente il require e invocere il costruttore
var mr = new require('Person')('Mario','Rossi');
p.push (mr);

// Faccio require di un modulo che espone più proprietà/metodi (tramite exports)
var infos = require('./serverinfos');
// Faccio reuire di un modulo UMD (lo stesso usato anche da AMD)
var pretty = require('./pretty');

// UNITTEST richiamo varie funzioni e stampo oggetti creati
console.log(  pretty('LISTA PERSONE:', p) );
console.info( pretty(infos) );
console.warn( pretty('Running On:', infos.hostedBy()) );
console.error( infos.serverTimeUTC() );