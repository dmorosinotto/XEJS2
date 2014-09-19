require(['pretty','console'],function(pretty,console){
	//UNIT TEST pretty
	var p=pretty;
	console.log(p());
	console.log(p(null));
	console.log(p(undefined));
	console.log(p('ciao'));
	console.log(p(7.89));
	console.log(p([1,2,3]));
	console.log(p({a:'pippo', b:'pluto'}, new Date()));
	console.log(p({arr:[4,5,6]},function(){return null},/^(\w+)$/));
});