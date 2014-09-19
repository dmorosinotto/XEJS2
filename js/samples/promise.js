function req(options) {
  var deferred = Q.defer();
  var xhr = false;
  if (window.XMLHttpRequest) // if Mozilla, Safari etc
    xhr = new XMLHttpRequest();
  else if (window.ActiveXObject){ // if IE
    try { xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e){
    try { xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e){} }
  } else return false;
  
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState !== 4) return;
    if([200,201].indexOf(xhr.status) === -1) {
      deferred.reject(new Error(xhr.status + ' ' + xhr.responseText || ''));
    } else {
      deferred.resolve(e.target.response);
    }
  };
  xhr.onerror = function() {
    deferred.reject(new Error("Network Error"));
  };
  xhr.open(options.method || 'GET', options.url, true);
  xhr.send(options.data || null);
  return deferred.promise;
}

//SINGOLA SENZA GESTIONE ERRORE
console.log('Chiamata singola');
req({url: 'http://localhost:3000/random'})
//.fail(function(e){console.error('!' + e)})
.done(function(x){console.warn('> ' + x);});
console.log('...');

/*
function logCall(url, title) {
  console.log((title || "") + ' calling ' + url + ' ...' );
  return req({url:url})
            .then(function(x){console.info((title||url) + ' return ' + x); return parseInt(x,10);})
            .fail(function(e){console.error((title||url) + ' ERROR ' + e)});
}

function calcola() {
var parallel = Q.all([
      logCall('http://localhost:3000/random/5','GET a wait 5sec'),
      logCall('http://localhost:3000/random/2','GET b wait 2sec')
    ]);  
  return parallel.spread(function(a,b){
    console.dir({a:a, b:b});
    if (!a || !b) throw new Error('VALORI MANCANTI');
    return logCall('http://localhost:3000/calc/'+a+'+'+b);
  });
}

//MULTIPLA (PARALLELA) + CHAIN CONTINUAZIONE FINALE
console.log('Chiamata Multipla (parallela) + Chain continuation')
calcola()
  .then(function(r){console.dir({risultato: r}); return r;})
  .fail(function(e) {console.error(e)})
  .done();
*/  