// SCOPE SHADOWING = variabile/parametro con stesso nome di una "variabile padre" 
// Helper per stampare "scope" obj
console.print = function(into, obj) { 
  console.warn(into);
  for (var k in obj ) console.log(k + ': ' + obj[k]);
};

var a = 1, b=2;   //Global
function f(a) {   //Parameter Shadow (*)
  var c = 3;      //Variable (**)
  
  function innerF() {
    var c = 4;    //Variable Shadow (**)
    console.print("Scope all'interno di innerF():",{a:a, b:b, c:c});    
  }
  
  innerF();
  console.print("Scope all'interno di f():",{a:a, b:b, c:c});
}
f(0);             //Argument (*)

console.print("Scope globale:", {a:a, b:b, c:'- NON ACCESSIBILE-'});
//TODO: console.print("Scope globale:", {a:a, b:b, c:c});