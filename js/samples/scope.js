// ESEMPIO DEI VARI CASI DI SCOPING
printScope = function(obj) { 
  // Helper per stampare "scope" obj
  for (var k in obj ) console.log(k + ': ' + obj[k]);
};

var g = 1;          //Global
function f(a) {     //Parameter
  var b = 4;        //Variable
  
  if (e) {          //Hoisting
    var c=5;        //NO Block Scope
  } else {
    c = innerF();   //Hoisting function definition
  }
  console.warn("Scope all'interno di f():"); printScope({a:a, b:b, c:c, d:'- NON ACCESSIBILE -', e:e, g:g}); //TODO: printScope({a:a, b:b, c:c, d:d, e:e, g:g});
  
  function innerF() {
    var d = e ? 666 : 777;  //Function Scope (Private)
    console.warn("Scope all'interno di innerF():"); printScope({a:a, b:b, c:c, d:d, e:e, g:g});
    return d;
  }
}

f(3);               //Argument
var e=2;            //External global (hoisting)
console.warn("Scope 'globale' fuori di tutto:"); printScope({a:'- NON ACCESSIBILE -', b:'- NON ACCESSIBILE -', c:'- NON ACCESSIBILE -', d:'- NON ACCESSIBILE -', e:e, g:g}); //TODO: printScope({a:a, b:b, c:c, d:d, e:e, g:g});