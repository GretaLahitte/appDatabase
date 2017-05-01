import {generateUUID} from "./utils";



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


export class Field{
    id:string;
    name:string;
    comment:string;
    type:string;
    
    //les contraintes possibles pour un field:
    index:boolean  = false; //doit creer un index
    not_null:boolean = false;//ne peut pas etre null
    unique: boolean = false;//doit etre unique 
    default_value: string = "";//valeur si pas de données
    check:string = "";//check expression doit etre true

    __elem:any;

    
    constructor (args){
        args=args || {};
        this.id = args.id || generateUUID();
        this.name = args.name;
        this.comment = args.comment;
        //voir le reste, type, ....
        this.type = args.type || 'text';
        
    }
}