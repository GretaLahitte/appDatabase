onmessage = function(evt){
    console.log("youhou, something to do....");
    var base = JSON.parse(evt.data);
    console.log(base);
	var tab=[];
	for (key in base.tables){
		
		tab.push('CREATE TABLE '+key+'(\n');
		//console.log(tab);
		//console.log('CREATE TABLES '+key+'(');
		for (champs in base.tables[key].fields){
			tab.push('	'+champs+'	'+base.tables[key].fields[champs].type+',');
			if(base.tables[key].fields[champs].comment){
				tab.push('	/* '+base.tables[key].fields[champs].comment+' */');
			}
			tab.push('\n');
			//console.log('	'+champs+'	'+base.tables[key].fields[champs].type);	
		}
		tab.push('\n);\n\n');
		
		
	}
    
    
   // postMessage("some SQL datas....");
    postMessage(tab.join(''));

}
