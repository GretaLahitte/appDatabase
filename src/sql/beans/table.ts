/**
 * Les informations pour les tables de la base
 * 
 * SQL:
 * 
 * CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] table_name ( [
  { column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
    | table_constraint
    | LIKE parent_table [ like_option ... ] }
    [, ... ]
] )
[ INHERITS ( parent_table [, ... ] ) ]
[ WITH ( storage_parameter [= value] [, ... ] ) | WITH OIDS | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE tablespace ]



where column_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL |
  NULL |
  CHECK ( expression ) |
  DEFAULT default_expr |
  UNIQUE index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE action ] [ ON UPDATE action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

and table_constraint is:

[ CONSTRAINT constraint_name ]
{ CHECK ( expression ) |
  UNIQUE ( column_name [, ... ] ) index_parameters |
  PRIMARY KEY ( column_name [, ... ] ) index_parameters |
  EXCLUDE [ USING index_method ] ( exclude_element WITH operator [, ... ] ) index_parameters [ WHERE ( predicate ) ] |
  FOREIGN KEY ( column_name [, ... ] ) REFERENCES reftable [ ( refcolumn [, ... ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE action ] [ ON UPDATE action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

and like_option is:

{ INCLUDING | EXCLUDING } { DEFAULTS | CONSTRAINTS | INDEXES | STORAGE | COMMENTS | ALL }

index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:

[ WITH ( storage_parameter [= value] [, ... ] ) ]
[ USING INDEX TABLESPACE tablespace ]

exclude_element in an EXCLUDE constraint is:

{ column | ( expression ) } [ opclass ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]


qqs explications:
[ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ]:
    GLOBAL | LOCAL: obsolète
    TEMPORARY | TEMP: la table est temporaire et sera détruite a la fin de la session
    UNLOGGED: bcps plus rapide, mais si crash, aucun moyen de récuperer les données perdues

    INHERITS: une ou plusieurs table parent de la(les)quelle hériter les champs: les noms dans
    les tables parents doivent etre differents, sauf si les types sont identiques (ex: id). 
    idem pour les contraintes. Les modifs dans une des tables parents seront recpercutées dans les
    tables enfants

    LIKE idem que inherit, mais les tables ne sont pas liées (les modifs ne sont pas 
    répercutées). Si option "INCLUDING DEFAUTLS", les valeurs par defaut sont récupérées
    si option "INCLUDING CONSTRAINTS": inclus les contraintes, 'INCLUDING INDEXES': inclue les 
    index et primary key, INCLUDE STORAGE, INCLUDE COMMENTS (pour tout importer: INCLUDING ALL)
    les noms de colonnes DOIVENT etre differents (sinon, erreur)

    CONSTRAINT nom: nom d'une contrainte sur la table
 */

import {generateUUID} from "../utils";
import Field from "./field";
import Index from "./index";


export default class Table{
    uuid:string; //identifiant unique de la table
    name:string;//le nom de la table (doit aussi etre unique dans la base)
    comment:string; //un commentaire sur la table 

    is_global: boolean = false;//obsolète, GLOBAL | LOCAL, on garde que parceque ca existe
    is_temp: boolean = false;//permet de créer une base temporaire
    is_unlogged: boolean = false;//table loggée ou pas

    inherits_from:Array<Table> = [];//les tables dont elle hérite, tout changement sera répercuté
    like:Array<Table> = [];//la ou les tables dont on reprend la structure
    like_options:Array<string> = [];//options pour les likes (voir plus haut)

    storage_params:string = "";//le storage params: custom ou WITH OIDS ou without OIDS
    on_commit:string = "";//quoi faire lors du commit: PRESERVE ROWS | DELETE ROWS | DROP
    tablespace:string = "";//l'espace de nom, voir a quoi ca correspond !TODO

   
    fields: Array<Field>;//le differentes colonnes de la table
    //relations: Array<Relation>;

    //les contraintes....
    //constraints:Array<Enumeration> = [];
    //les clés indexs
    indexes:Array<Index> = []
    
    private __elem:any;//le composant graphique, n'interresse que moi... 
    private coords:{x:number, y:number};//coordonnées x,y sur la page: voir si toujours utile?
    private selected: boolean;//probleme, ca devrait plutot aller dans le composant


    constructor(){
        this.uuid = generateUUID();//genere un code unique pour la table...
    }

}