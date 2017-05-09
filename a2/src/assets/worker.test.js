var CAN_HAVE_EXTRAS = ["character varying","character","bit","bit varying","numeric"];

onmessage = function(evt){
    var base = JSON.parse(evt.data);
	var tab=[]; //pour stocker les commandes SQL 
	console.log(base);

	//enumerations
	for (var en in base.enumerations) tab.push(...createSqlEnum(en, base.enumerations[en]));
	
	//les tables de la base
	for ( var key in base.tables){
		var table=base.tables[key];
		
		tab.push('CREATE TABLE ',key,'(\n');
		//console.log(tab);
		//console.log('CREATE TABLES '+key+'(');
		for (champs in table.fields){
			tab.push(...createSqlField(champs,table.fields[champs],base));
			tab.push(",\n");
		}
		tab.pop();
		tab.push('\n);\n');
		
		
	}
    
    tab.push("/*Generated with Greta SQLTool, because sometimes, I look at the stars and go like 'Fuck it!'*/\n");
   // postMessage("some SQL datas....");
    postMessage(tab.join(''));

}

/**
 * create custom type for database
 * ex: CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
 * @param name: enum name 
 * @param values: enum values
 * 
 * @return string Array: sql command list
 */
function createSqlEnum(name,values){
	var t=["CREATE TYPE ",
			name,
			" AS ENUM ("];
	for (var v of values) t.push("'",v,"'");
	t.push(');\n');

	return t;
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

	var type=[field_desc.type];
	var check='';
	var special='';

	if(CAN_HAVE_EXTRAS.indexOf(field_desc.type)>= 0 && field_desc.type_extras){
		var extra = field_desc.type_extras;
		type.push('(');

		if(extra.length){
			type .push(extra.length);
		} else if(extra.precision){
			//et le reste...
			type.push(""+extra.precision);
			if(extra.scale) type.push(",",extra.scale);
		}
		type.push(')');
		//todo check type_extra length or (precision and scale)
	}


	if(field_desc.check){
		check='CHECK ('+field_desc.check+')';
	}

	
	for(var bool in field_desc){
		if(field_desc[bool]===true){
			special +=' '+bool;
		}
	}

	
	tab.push('	',champs,'	',...type,' ',special.toUpperCase(),' ',check);
	if(field_desc.comment){
		tab.push('	/* ',field_desc.comment,' */');
	}
	
	return tab;
}


