import {Injectable} from "@angular/core";
import {Base} from "./datas/base";
import {Table} from "./datas/table";
import {Field} from "./datas/field";
import {Relation} from "./datas/relation";
import {Index} from "./datas/index";
import {Enumeration} from "./datas/enumeration";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {generateUUID} from "./datas/utils";

export const FIELD_TYPES = [
        "bigint","bigserial","bit","bit varying","boolean","box","bytea",
        "charcacter varying","character","cidr","circle","date","double precision",
        "inet","integer","interval","line","lseg","macaddr","money","numeric",
        "path","point","polygon","real","smallint","serial","text","time","time with timezone",
        "timestamp","timestamp (TZ)","tsquery","tsvector","txid_snapshot","uuid","xml"
    ];
export const COLUMN_CONSTRAINTS = [
        "NOT NULL","UNIQUE","PRIMARY KEY",
    ]


@Injectable()
export class DBProvider{

    _db:Base;
    db_subject:Subject<Base> = new Subject();


    constructor(){
        
    }
    loadDummyBase(){
        //cree une base toute simple pour les tests...
        //le field pour l'ID client de la table 1
         let _db = new Base({
            //qqs infos d'ordre generales sur la base elle meme et l'utilisateur
            file_url:'a/path',//chemin vers le fichier sql/dump ou enregistrer
            db_name:"nom_de_la_base",
            db_type:"postgres",//ou mysql, mongo....
            db_port:5432,
            host:"host",
            login:"loginUtilisateur",
            passwrd:"passwordUtilisateur",

            
        });


        //ne crée qu'une seule table avec des explications
        let table = new Table({
            name:"GretaSQLTool",
            coords:{
                x:400,
                y:200
            },
            comment:"Thank's for using GretaSQLTool! Click on the burger menu overthere to access table context and add fields, constraints... or anywhere to access main context menu and add new tables or export to sql file",
            fields:[
                new Field({
                    name:"a_simple_field",
                    comment:"This is a simple field, click on the arrow to get the context menu and edit it's properties"
                }),
                new Field({
                    name:"a_simple_id",
                    comment:"This is a primary key, there can only be one, and it's UNIQUE, so you can drag it to another table to make a relation between them",
                    primary_key: true,
                    
                }),
                 new Field({
                    name:"a_simple_index",
                    comment:"This is a index, there can be as much as you want, and IF UNIQUE, you can drag it to another table to make a relation between them",
                    index:true
                }),

            ]
        })

       
        //END DUMMY DATAS
        _db.tables = [
                table,
            ];
        //ajoute les liens 

        this._db = _db;
        this.db_subject.next(_db);

    }
    setCurrentBase(base:Base){
        //validation de la base...
        this._db = base;//previent?
        this.db_subject.next(base);
    }

    createEmptyTable(){
        return new Table({});
    }
    /**
     * ajoute une nouvelle table a la base, verifie la validité des données...
     */
    add_table(table:Table){
        //validate datas????
        //verifie validité:
        //no null
        if(!table.name) throw "Invalid: a table must have a name...";
        //pas d'espaces authorisé
        if(!/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/i.test(table.name)) throw "Invalid name: valid expression must be [a-zA-Z_]{1}[a-zA-Z0-9_]+";
        //verifie si n'existe pas deja 
        for (let t of this._db.tables){
            if(t.name == table.name) throw "Invalid name: a table name must be unique!";
        }
        this._db.tables.push(table);
    }
    removeTable(table:Table){

        
        //supprime les relations en premiers
        //JEF Style looping
        for (let i=this._db.relations.length; i--;){
            let rel = this._db.relations[i];

            if(rel.from.table == table){
                //supprime les fields annexes dans to !!!!!!!!
                this._db.relations.splice(i,1);
                let t = rel.to.table;
                let f = rel.to.field;

                let j=t.fields.indexOf(f);
                if(j>=0) t.fields.splice(j,1);
                
            } else if(rel.to.table == table){
                //no need
                this._db.relations.splice(i,1);
                
            } 
        }
        //supprime ta table
        let i = this._db.tables.indexOf(table);
        if(i>=0) this._db.tables.splice(i,1);



    }
    addDataType(type:Enumeration){

        if(!type.key) throw "Invalid: a custom type must have a name...";
        //pas d'espaces authorisé
        if(!/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/i.test(type.key)) throw "Invalid name: valid expression must be [a-zA-Z_]{1}[a-zA-Z0-9_]+";
        if(!type.values) throw "Invalid type value: must provide comma sperated values";

        
        //verifie que n'existe pas deja
        for(let en of this._db.enumerations){
            if (en.key == type.key) throw "Invalid type, already exists";
        }
        //sinon, enregistrer
        this._db.enumerations.push(type);
        //ajoute aux types de données
        FIELD_TYPES.push(type.key);
    }
    addFieldTo(field:Field, table:Table){
        //ajoute un id
        field.id = generateUUID();
        if(field.primary_key){
            field.primary_key = false;
            return this.addPKFieldTo(field, table);
        }
        if(!field.name) throw "Invalid: a field must have a name...";
        //pas d'espaces authorisé
        if(!/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/i.test(field.name)) throw "Invalid name: valid expression must be [a-zA-Z_]{1}[a-zA-Z0-9_]+";
        //verifie si n'existe pas deja 
        for (let t of table.fields){
            if(t.name == field.name) throw "Invalid name: a field name must be unique in a table!";
        }
        table.fields.push(field);

        //if is pk

    }
    removeField(infos){
        console.log("remove field");
        let table = infos.table;
        let field = infos.field;
        
        //verifie si appartient a un composite, si oui, refuse?
        for(let f of table.fields){
            if(f.fields && f.fields.indexOf(field)>=0){
                //refuse suppression
                throw "Impossible to delete: this field is use in a composite index. Try first to delete '"+f.name+"' first.";
            }
        }
        
        //supprime les relations si existent
        //JEF Style looping
        for (let i=this._db.relations.length; i--;){
            let rel = this._db.relations[i];

            if(rel.from.field == field){
                //supprime les fields annexes dans to !!!!!!!!
                this._db.relations.splice(i,1);
                let t = rel.to.table;
                let f = rel.to.field;

                let j=t.fields.indexOf(f);
                if(j>=0) t.fields.splice(j,1);
                
            } else if(rel.to.field == field){
                //no need
                this._db.relations.splice(i,1);
                
            } 
        }
        //supprime ta table
        let i = table.fields.indexOf(field);
        if(i>=0) table.fields.splice(i,1);


    }
    addPKFieldTo(field:Field, table:Table){
        this.addFieldTo(field,table);
        let p = new Index({});
        p.fields=[field];
        p.name = field.name;
        //p.is_unique = true;
        p.method = "btree";
        table.pk = p;//enregistrer
        //comme le field est la clé, on en profite 
        field.primary_key = true;
        //field.unique = true;
        
    }

    getTableById(id:any):Table{
        for (let t of this._db.tables){
            if(t.id == id) return t;
        }

    }

    makeRelation(from, to_table){
        //crée un nouveau element dans la table ciblfr
        let cf = null;
        
        if(from.field.fields){
            
            //un index composite, a voir....
            //cree les champs necessaires dans la table?
            cf = new Index({
                name:from.field.name+"_"+from.table.name,
                type:from.field.type, //???
                fields: from.field.fields
            });
        } else {
            //un champs simple
            cf = new Field({
                name:from.field.name+"_"+from.table.name,
                type:from.field.type //???
            });
        }
        cf.index = true;//parceque
        cf.is_reference = true; //parceque

        
        this.addFieldTo(cf, to_table);
        //cree les relations dans chaque table 
        let relation = new Relation({
                    id:generateUUID(),
                    
                    from:from,
                    to:{
                        table: to_table,
                        field: cf,
                    }
        });
        //ajoute aux differentes tables
        // to_table.relations.push(relation);
        // from.table.relations.push(relation);
        //ajoute au global pour le dessin
        this._db.relations.push(relation);
    }

    dropConstraint(what){
        let table = what.table;
        let constraint = what.constraint;

        //JEF Style looping
        for (let i=table.constraints.length; i--;){
            if(constraint == table.constraints[i]){
                table.constraints.splice(i,1);
                break;
            }
        }
    }

    /**
     * Convertie l'objet Base en json-compliant pour le webworker
     * Permet d'eviter les erreurs de redondances cycliques
     */
    convertToJSON(base:Base):Promise<string>{
        return new Promise( (resolve,reject)=>{

       
            let json = {
                db_name:base.db_name,//nom de la base
                db_port:base.db_port,//le port d'ecoute de la base
                db_type:base.db_type,//type de la base, pour l'instant, 'postgresql'

                //informations de connections
                host:base.host,//nom de l'host            
                login:base.login,//login utilisateur
                passwrd:base.passwrd,//pass utilisateur
                
                //les données de la base
                tables:{},//les tables de la base
                relations:[],//ls relations un tableau d'objets {from:{table,field},to:{table,field}} avec table, field = nom de la table ou field visé
                enumerations:{}//les enums (custom types)
            };




            //les enums (custom types):  'nom_type'=>[valeur1,valeur2,valeur3...]
            for (let enumeration of base.enumerations){
                json.enumerations[enumeration.key] = enumeration.values.split(',');
            }


            //les tables 
            for (let table of base.tables){
                
                let t = {
                    comment : table.comment,//commentaires sur la table 
                    fields: {},//les fields possibles de la table 
                    constraints:{},//les contraintes sur cette table ,
                    coords: table.coords //coords de la table (sert uniquement si save to LS)
                };


                //les fields, c'est un peu plus chaud...
                //si a une property "fields", alors c'est une clé ou index
                //composite...
                for (let field of table.fields){
                    //creation d'un nouveau field avec les informations completes
                    let f = {
                        comment: field.comment,//commentaire sur le field string 

                        //Contraintes basiques
                        primary_key: field.primary_key,// boolean si true, ce Field est une clé primaire de la table (1 seule par table)
                        index:field.index,//boolean si true, ce Field est un index 
                        not_null:field.not_null,// boolean si true, ce field peut prendre une valeur NULL 
                        unique: field.unique,//boolean si true, ce field DOIT etre UNIQUE
                        default_value: field.default_value,//any: valeur par defaut du Field si non renseigné
                        check: field.check,//string: contrainte du Field (via CHECK)

                        //type du field 
                        type: field.type, //le type: numeric, text,...
                        type_extras: field.type_extras,//parametres pour les types de Field 
                        //ex: numeric (n,m) => {min:number, max:number}

                        is_reference: field.is_reference,//boolean, si true, Field de type REFERENCES?
                        //dans ce cas, ne doit pas tenir compte des autres infos A PART LE TYPE 
                        //Note: penser a un truc, les serials a transformer en int...
                    };

                    //Dans le cas d'un composite, il y a une property "fields" pointant vers 
                    //les fields référencés... Dans ce cas, le type = COMPOSITE
                    if((<Index>field).fields){
                        //un index ou clé composite...
                        //recupere les noms des fields necessaires pour la création de la clé
                        //simple tableau de string 
                        f["fields"] = (<Index>field).fields.map(el=>el.name);
                    }

                    //enregistre les informations sous forme 
                    // nom_de_la_table => objet Table (permet de les recups plus facilement
                    //dans le worker)
                    t.fields[field.name] = f;
                }


                //contraintes de tables nom_contrainte => valeur (simple string, 
                //pour l'instant, je ne valide pas les contraintes)
                for (let constraint of table.constraints){
                    t.constraints[constraint.key] = constraint.values;
                }

                json.tables[table.name] = t;
            }



            //les relations de tables (en dernier bien sur)
            //un tableau décrivant les relations entre les tables:
            //{ 
            //  from: {table: 'nom de la table d orgine', field:'nom du field source'},
            //  to:{table:'nom de la table cible', field:'nom du field REFERNCES'}
            //}
            for(let relation of base.relations){
                let r = {
                    from:{
                        table: relation.from.table.name,
                        field:relation.from.field.name
                    },
                    to:{
                        table:relation.to.table.name,
                        field: relation.to.field.name
                    }
                };
                json.relations.push(r);
            }


            
            resolve(JSON.stringify(json));

        });
    }

    /**
     * inverse d'au dessus, datas provennant du localstorage
     */
    convertFromJSON(jstr){
        
            let desc = JSON.parse(jstr);
            
            let composites = [];
            //creation du bouzin....

            let base = new Base();
            base.db_name = desc.db_name;
            base.db_port = desc.db_port;
            base.db_type = desc.db_type;
            base.host = desc.host;
            base.login = desc.login;
            base.passwrd = desc.passwrd;

            //les type enums 
            for (let enums of Object.keys(desc.enumerations)){
                let e = new Enumeration();
                e.key = enums;
                e.values = desc.enumerations[enums].join(',');
            }

            for(let table of Object.keys(desc.tables)){
                let d = desc.tables[table];
                let t = new Table();

                //set infos id for later???
                d["id"] = t.id;

                t.name = table;
                t.comment = d.comment;
                t.coords = d.coords;
                
                //les fields
                for (let fkey of Object.keys(d.fields)){
                    let fd = d.fields[fkey];
                    let f =null;

                    if(fd.fields) {
                        f = new Index();
                        //index only datas 
                        f.method = fd.method;
                        f.index_null = fd.index_null;
                        f.null_first = fd.null_first;

                        //les fields references...
                        if(!fd.is_reference)  composites.push({field:f,table:t, ref:fd.fields});
                    }
                    else  f = new Field();

                    f.name = fkey;
                    f.comment = fd.comment;
                    f.type = fd.type;
                    f.type_extras = fd.type_extras;

                    f.primary_key = fd.primary_key;
                    f.index = fd.index;
                    f.not_null = fd.not_null;
                    f.unique = fd.unique;
                    f.default_value = fd.default_value;
                    f.check = fd.check;
                    f.is_reference = fd.is_reference;

                    //push 
                    t.fields.push(f);
                    


                }

                //push la table 
                base.tables.push(t);
            }

            //si des composites, a voir... 
            for (let cmp of composites){
                //recup les fields...
                //uniqument les non-references
                let f = cmp.field;
                let t = cmp.table;

                if(!t) continue;
                let refs = cmp.ref;

                for (let r of refs){
                    f.fields.push(DBProvider.getFieldByName(r, t));
                }

            }

            for(let rel of desc.relations){
                let r = new Relation();
                //recupe les infos depuis from et to 
                let ft = DBProvider.getTableByName(rel.from.table,base);
                let ff = DBProvider.getFieldByName(rel.from.field, ft);
                let tt = DBProvider.getTableByName(rel.to.table,base);
                let tf = DBProvider.getFieldByName(rel.to.field, tt);

                if(tf.fields){
                    //recup les references de from 
                    for (let rf of ff.fields) tf.fields.push(rf);
                }
                r.from = {
                    table:ft,
                    field:ff
                };
                r.to = {
                    table:tt,
                    field:tf
                };

                base.relations.push(r);
            }

            this._db = base;
            this.db_subject.next(base);//previent l'interface...

        
    }

    //qqs helpers methods 
    private static getTableByName(name:string, base:Base):Table{
        for(let t of base.tables){
            if(t.name == name) return t;
        }
        console.log("unknown table name: "+name);
        return null;
    }
    private static getFieldByName(name:string, table:Table):any{
        for(let t of table.fields){
            if(t.name == name) return t;
        }
        console.log("unknown field name: "+name, table);
        return null;
    }
}