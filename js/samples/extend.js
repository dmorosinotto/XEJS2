function extend(target) {
  var i, k, mixin, l = arguments.length; //numero di argomenti passati
  if (l<=1) return target; //se passo solo target lo ritorno invariato
  for(i=0; i<l; i++) {
    mixin = arguments[i]; //elaboro ogni singolo oggetto mixin passato
    for(k in mixin) { //copiando in target SOLO i membri che non c'erano
      if (!(k in target)) target[k] = mixin[k];        
    }
  }
  return target;
}

//UNIT TEST
console.dir(
  extend({}, {enable: true, count: 9}
            , {title: "MERGE del title e TAG", tag: "MERGIATO!"}
            , {title: "NON Sovrascrivo title, ma Aggiungio l'array!"
                    , values: [4,5,6,7,8,9]}
            , {enable: false, count: 0, title: "NON SOVRASCRIVE NIENTE!"
                    , values: [1,2,3] }
      )
);