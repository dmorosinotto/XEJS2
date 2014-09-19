//Definizione del Namespace A.B.Utils
var A;
(function (A) {
    (function (B) {
        (function (Utils) {
            var _prefix = "Ciao";  //varibile privata
            function prefix(s, p) { //funzione privata 
                return (p || _prefix) + ' ' + s;
            }
            
            Utils.prefix = prefix;  //espongo funzione interna

            function Hello(s) {     //funzione principale
                return prefix(s);
            }
            Utils.Hello = Hello;
        })(B.Utils || (B.Utils = {}));
        var Utils = B.Utils;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

// Using del namespace
var utils = A.B.Utils;
console.log(utils.Hello("Pippo"));
console.warn(utils.prefix("Pippo","Saluti da"));
