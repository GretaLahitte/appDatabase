onmessage = function(evt){
    var base = JSON.parse(evt.data);
    console.log(base);
	var tab=[];
	for ( var key in base.tables){
		var table=base.tables[key];
		
		tab.push('CREATE TABLE '+key+'(\n');
		//console.log(tab);
		//console.log('CREATE TABLES '+key+'(');
		if(table.comment) tab.push('	/*	'+table.comment+' */\n');
		for (var champs in table.fields){
			
			tab.push(...createSqlField(champs, table.fields[champs], base));  // ... means pushing each index (spread operator)
			tab.push(',\n');
		}
		tab.pop( );  //erase last coma
		
		for(var constraint in table.constraints){
			tab.push(',\n	CONSTRAINT '+constraint+' CHECK'+'('+table.constraints[constraint]+')');
		}
		tab.push('\n);\n/*Generated with Greta SQLTool, because sometimes, I look at the stars and go like "Fuck it!"*/\n');
		
		
	}
    
    
   // postMessage("some SQL datas....");
    postMessage(tab.join(''));

}
/**
 * return a sql command list needed to create the table field.
 * @param champs: table field name
 * @param field_desc: field descriptor 
 * @param base: base descriptor
 * 
 * @return tab:a string array of sql commands
 */ 
function createSqlField(champs, field_desc,  base){
	var tab = [];
	var type=field_desc.type;
	var check='';
	var special='';
	if(field_desc.type_extras){
		if(field_desc.type_extras.length){
			type += '('+field_desc.type_extras.length+')';
		}
		//todo check type_extra length or (precision and scale)
	}
	if(field_desc.check){
		check='CHECK ('+field_desc.check+')';
	}
	
	for(var bool in field_desc){
		if(field_desc[bool]===true){
			console.log(bool);
			special +=' '+bool;
		}
	}
	tab.push('	'+champs+'	'+type.toUpperCase()+' '+special.toUpperCase()+' '+check);
	if(field_desc.comment){
		tab.push('	/* '+field_desc.comment+' */');
	}
	
	return tab;
}
