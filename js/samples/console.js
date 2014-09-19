//ESEMPIO DI define CHE ESPONE UN MODULO console (usando pattern Revealing Module)
define(function(){	
	//private state (internals)
	var __consoleDom = document.querySelector("#jsPlayground+.output");
	var __appendMessage = function(message, domClass) {
        var messageDom = document.createElement("xmp");
        if (domClass) {
          messageDom.className = domClass;
        }
        messageDom.appendChild(document.createTextNode(message));
        __consoleDom.appendChild(messageDom);
        __consoleDom.scrollTop = 1e10;
	};
	//reavealing module public interface
	var console = {
      log: function(message) {
        if (!__consoleDom) {
            return window.console.log(message);
        }
        __appendMessage(message);
      },
      info: function(message) {
        return this.log(message);
      },
      warn: function(message) {
        if (!__consoleDom) {
          return window.console.warn(message);
        }
        __appendMessage(message, "warning");
      },
      error: function(message) {
        if (!__consoleDom) {
          return window.console.error(message);
        }
        __appendMessage(message, "error");
      },
      dir: function(obj) {
        if (!__consoleDom) {
          return window.console.log(JSON.stringify(obj, function(k,v) { return (typeof v === 'function') ? '[FUNCTION]' : v; }, '   '));
        }
        __appendMessage(JSON.stringify(obj, function(k,v) { return (typeof v === 'function') ? '[FUNCTION]' : v; }, '   '));
      }
    };
    //exports module
    return console;
});