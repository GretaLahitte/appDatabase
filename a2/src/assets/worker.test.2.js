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
			tab.push(...createSqlField(champs,table.fields[champs],key, base));
			tab.push(",\n");
		}
		tab.pop();
		tab.push('\n);\n');
		
		
	}
    //les indexes globaux
    if(base.indexes) tab.push(...base.indexes);

    //les relations dans la table
    //ex: ALTER TABLE my_table ADD FOREIGN KEY (my_field) REFERENCES my_foreign_table;
    for(var relation of base.relations){
        tab.push(...createSqlRelation(relation, base));
    }
    tab.push("\n\n/*Generated with Greta SQLTool, because sometimes, I look at the stars and go like 'Fuck it!'*/\n");
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
	for (var v of values) t.push("'",v,"',");
    t.pop();    
	t.push("')\n");

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
function createSqlField(champs, field_desc,table_name,  base){

    if(field_desc.type == "Composite"){
        //type composite, voir quoi faire plus tard....
        if(!field_desc.is_reference && field_desc.index){
            //rajoute une contrainte d'index a la table 
            // CREATE UNIQUE INDEX title_idx ON films (title);
            if(!base.indexes) base.indexes = [];
            let idx = ["CREATE "];
            if(field_desc.unique) idx.push("UNIQUE ");
            idx.push("INDEX ",champs," ON ",table_name,"(");
            for(var f of field_desc.fields) idx.push(f,",");
            idx.pop()
            idx.push(");\n");

            base.indexes.push(...idx);
            

        }
        return [];//pour eviter les bugs...

    } else return createSqlSimpleField(champs, field_desc);
   
	
}


/**
 * return sql command list for a simple field 
 * @param champs: name of the field 
 * @param field_desc: simple field description
 * 
 * @return string array: sql commands
 */
function createSqlSimpleField(champs, field_desc){
    //type simple 
        var tab=[];
        var type=[field_desc.type];
        var check='';
        var special=[];


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
            
        //le cas serial
        } else if(field_desc.is_reference && field_desc.type.endsWith("serial")){
            type=[field_desc.type.replace("serial", "int")];
            //probleme: serial simple ) integer?
        }


        if(field_desc.check){
            check='CHECK ('+field_desc.check+')';
        }

        
        if (field_desc.primary_key) special.push(" PRIMARY KEY ");
        else {
            if(field_desc.index) special.push(" INDEX ");
            if(field_desc.unique) special.push(" UNIQUE ");
            if(field_desc.not_null) special.push(" NOT NULL ");
        }

        
        tab.push('	',champs,'	',...type,' ',...special,' ',check);
        if(field_desc.comment){
            tab.push('	/* ',field_desc.comment,' */');
        }

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
            tab.push(...createSqlSimpleField(field,ftable.fields[field]));
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