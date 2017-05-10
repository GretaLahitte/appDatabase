var CAN_HAVE_EXTRAS = ["character varying","character","bit","bit varying","numeric"];

onmessage = function(evt){
    var base = JSON.parse(evt.data);
	var tab=[]; //pour stocker les commandes SQL 
	base.indexes=[];

	console.log(base);

	//enumerations
	for (var en in base.enumerations) tab.push(...createSqlEnum(en, base.enumerations[en]));
	
	//les tables de la base
	for ( var key in base.tables){
		var table=base.tables[key];
		if(table.comment){
			tab.push('/*' ,table.comment, '*/\n');
		}
		tab.push('CREATE TABLE ',key,' (\n');
		
		for (champs in table.fields){
			var cto = createSqlField(champs,table.fields[champs],key,base);
			if(cto.length > 0) tab.push('   ',...cto);
			
		}
		tab.pop();
		tab.push('\n);\n\n');
		
		
	}
	tab.push('\n\n');
	//les index
    tab.push(...base.indexes);
    
    //les relations
    for(var relation of base.relations){
       //console.log(relation);
        tab.push(...createSqlRelation(relation, base));
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
function createSqlField(champs, field_desc,tableName,  base){
	var tab = [];
	var type=[field_desc.type];
	var check='';
	var special=[];
	var indexes=base.indexes;
	
	
	if(field_desc.type=='Composite'){
		indexes.push('CREATE ');
		if(field_desc.unique){
			indexes.push(' UNIQUE');
		}
		indexes.push(' INDEX ',champs,' ON ',tableName,' (');
		for (var val of field_desc.fields){  //usage de of au lieu de in!
			indexes.push(val,', ');
		}
		indexes.pop();
		indexes.push(');\n');
		return tab
		
	}
	
	if(CAN_HAVE_EXTRAS.indexOf(field_desc.type)>= 0 && field_desc.type_extras && field_desc.type !=="Composite"){
		var extra = field_desc.type_extras;
		type.push('(');

		if(extra.length){
			type.push(extra.length);
		} else if(extra.precision){
			//et le reste...
			type.push(""+extra.precision);
			if(extra.scale) type.push(",",extra.scale);
		}
		type.push(')');
		
	}


	if(field_desc.check){
		check='CHECK ('+field_desc.check+')';
	}
	
	if(field_desc.index){
//		special.push(' INDEX');
		base.indexes.push('CREATE INDEX ',champs,'_',tableName,' ON ',tableName,'(',champs,');\n');
	}
	
	if(field_desc.not_null){
		special.push(' NOT NULL');
	}
	if(field_desc.primary_key){
		special.push(' PRIMARY KEY');
	}
	if(field_desc.unique){
		special.push(' UNIQUE');
	}
	tab.push(champs,'    ',...type,' ',...special,' ',check);
	if(field_desc.comment){
		tab.push('	/* ',field_desc.comment,' */');
	}
	
	tab.push(",\n");
	return tab;
}

/**
 * create sql commands for relation
 * @param relation: relation descriptor 
 * @param base: base descriptor 
 * 
 * @return string array: sql commands
 */
function createSqlRelation(relation, base ){

    var tab=[];
    
    var to_table = relation.to.table;
    var to_field = relation.to.field;
    var from_table = relation.from.table;
    var from_field = relation.from.field;

    //doit verifier si les types sont composites
    var ftable = base.tables[from_table];
    var ff = ftable.fields[from_field];
    
    if(ff.fields){
       
        //des composites, doit créer les champs dans la base cible
        var new_fields=[];
        for(var field of ff.fields){
            tab.push("ALTER TABLE ",to_table," ADD COLUMN ");
            tab.push(...createSqlField(field,ftable.fields[field],to_table,base));
            tab.pop();
            tab.push(";\n");
            new_fields.push(field);
        }
        tab.push("ALTER TABLE ",to_table," ADD FOREIGN KEY (");
        for(var nf of new_fields) tab.push(nf,",");
        tab.pop();

        tab.push(") REFERENCES ",from_table,"(");
        for(var nf of new_fields) tab.push(nf,",");
        tab.pop();

        tab.push(");\n");

    //des types simples...
    } else tab.push ("ALTER TABLE ",to_table," ADD FOREIGN KEY (",to_field,") REFERENCES ",from_table,"(",from_field,");\n");
    return tab;
}

