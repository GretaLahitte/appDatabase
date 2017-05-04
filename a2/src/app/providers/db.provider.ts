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



        var t1_id = new Field({
                            id:"uuid1",
                            name:"id"
        });
        //la foregn_key de la table 2
        var t2_fk = new Field({
                            id:"uuid2",
                            name:"id_client"
        });
        //FK de la table 3 (vers table1 et table2)
        var t3_fk = new Field({
                            id:"uuid52",
                            name:"other_commande"
        });
        var t4_fk =new Field({
            id:"uuid53",
            name:"other_again"
        });


        let table1 = new Table({
                id:"anId",//identifiant unique de la tables
                // __db: _db,
                name:'clients',//nom de la table 
                coords:{x:90,y:120},
                selected: false,
                fields:[
                    t1_id,
                    new Field({
                        id:"uuid11",
                        name:"nom_client"
                    }),
                    new Field({
                        id:"uuid12",
                        name:"prenom_client"
                    }),
                    new Field({
                        id:"uuid13",
                        name:"email"
                    }),
                    //et le reste....
                ],
                relations: []
        });
        let table2 = new Table({
                    id:"anId2",//identifiant unique de la tables
                    //  __db: _db,
                    name:'commandes',//nom de la table 
                    coords:{x:400,y:500},
                    selected: false,
                    fields:[
                        new Field({
                            id:"uuid21",
                            name:"id"
                        }),
                        
                        new Field({
                            id:"uuid22",
                            name:"num_commande"
                        }),
                        t2_fk,
                        new Field({
                        id:"uuid23",
                        name:"id_payement"
                    }),
                        //et le reste....
                        
                    ],
                    //met a dispo les relations de cette table 
                    relations:[]
        });
        let table3 = new Table({
                    id:"anId5",//identifiant unique de la tables
                    //  __db: _db,
                    name:'produits',//nom de la table 
                    coords:{x:578,y:316},
                    selected: false,
                    fields:[
                        new Field({
                            id:"uuid51",
                            name:"id"
                        }),
                        new Field({
                            id:"uuid52",
                            name:"label"
                        }),
                        new Field({
                            id:"uuid53",
                            name:"description"
                        }),
                        new Field({
                            id:"uuid54",
                            name:"prix"
                        }),
                        t3_fk,
                        t4_fk
                        //et le reste....
                        
                    ],
                    //met a dispo les relations de cette table 
                    relations:[]
        });

        //les differentes relations entre les tables
        //une relation entre 2 tables
        var relation = new Relation({
                    id:"link1",
                    top:{
                        x: 20,
                        y: 30,
                    },
                    bottom: {
                        x: 400,
                        y: 350
                    },
                    from:{
                        table: table1,
                        field: t1_id,
                        _link: null //ca, c'est vraiement pas beau....
                    },
                    to:{
                        table: table2,
                        field: t2_fk,
                        _link: null
                    }
        });
        // table1.relations.push(relation);
        // table2.relations.push(relation);

        //cree une autre relation 
        var relation2 = new Relation({
                    id:"link2",
                    
                    from:{
                        table: table1,
                        field: t1_id,
                        _link: null //ca, c'est vraiement pas beau....
                    },
                    to:{
                        table: table3,
                        field: t3_fk,
                        _link: null //ca, c'est vraiement pas beau....
                    }
        });
        // table1.relations.push(relation2);
        // table3.relations.push(relation2);
        //et la derniere, on pense toujours a l'inscrire dans la table...
        var relation3 = new Relation({
            id:"link3",
                    top:{
                        x: 20,
                        y: 30,
                    },
                    bottom: {
                        x: 400,
                        y: 350
                    },
                    from:{
                        table: table2,
                        field: t2_fk,
                        _link: null //ca, c'est vraiement pas beau....
                    },
                    to:{
                        table: table3,
                        field: t4_fk,
                        _link: null //ca, c'est vraiement pas beau....
                    }
        });
        // table2.relations.push(relation3);
        // table3.relations.push(relation3);
        
        
        //les relations entre les differentes tables de la base,
        //pour me simplifier la vie, elles sont aussi globales (voir a changer ca plus tard...)
        var relations = [
                //decrit une relation (pas de 1 à n pour l'instant ou de truc comme ca...)
                //entre 2 tables
                relation,
                relation2,
                relation3
            ];
        //END DUMMY DATAS
        _db.tables = [
                table1,
                table2,
                table3
            ];
        _db.relations = relations;
        this._db = _db;

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
        console.log("deleting table: ", table)
        //supprime ta table
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
        field.unique = true;
        
    }

    getTableById(id:any):Table{
        for (let t of this._db.tables){
            if(t.id == id) return t;
        }

    }

    makeRelation(from, to_table){
        //crée un nouveau element dans la table ciblfr
       console.log(from);
        let cf = new Field({
            name:from.field.name+"_"+from.table.name,
            type:from.field.type
        });
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

    
}