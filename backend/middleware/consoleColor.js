var COLORS = {
  black:  "\x1b[30m",
  red:    "\x1b[31m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  magenta:"\x1b[35m",  
  cyan:   "\x1b[36m",
  white:  "\x1b[37m"
};

var NOCOLOR = "\x1b[0m";

function _withColor(color, consFn) {
	//ritorna una funzione che fa da proxy verso la consFn passata e che ha
	//settato internamente alla closure il colore, di default usa console.log
	if (!consFn || typeof consFn!=='function' ) consFn = console.log;
	color = color && COLORS[color];
	if (color)  
		return function() {
			if (arguments.length===0) return;
			var args = Array.prototype.slice.call(arguments,0);
			if (typeof args[0] === 'string') {
				args[0] = color + args[0]; //preserva format %s %d ... 
			} else {
				args.unshift(color); //aggiunge colore davanti a tutto
			}
			args.push(NOCOLOR); //alla fine ripristina colore default
			consFn.apply(null,args);
		}
	else 
		return consFn;
}

//esporto di default anche tutte le console pre-settate con i vari colori
for (var col in COLORS) {
	exports[col] = _withColor(col, console.log); 
}

exports.withColor = _withColor;
	
exports.colorizeConsole=function() {
	//imposta i colori di default per le varie funzioni console.xxx
	console.info = _withColor('cyan', console.info);
	console.error = _withColor('red', console.error);
	console.warn = _withColor('yellow', console.warn);
};

exports.colorizeString = function() {
	//modifica String.prototype per aggiungere le proprietà che tornano stringa colorata
	function _strColor(color) { 
		return function() { return color + this + NOCOLOR; };
  }

	for(var col in COLORS) {
		var getter = { get: _strColor(COLORS[col]), enumerable:true, writtable: false, configurable: false };
		if (!String.prototype.hasOwnProperty(col))
			Object.defineProperty(String.prototype, col, getter);
	}
};