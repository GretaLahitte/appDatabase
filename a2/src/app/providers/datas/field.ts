import {generateUUID} from "./utils";



export class Field{
    id:string;
    name:string;
    comment:string;
    type:string;
    
    //les contraintes possibles pour un field:
    primary_key:boolean = false;
    index:boolean  = false; //doit creer un index
    not_null:boolean = false;//ne peut pas etre null
    unique: boolean = false;//doit etre unique 
    default_value: string = "";//valeur si pas de données
    check:string = "";//check expression doit etre true

    __elem:any;

    
    constructor (args){
        args=args || {};
        this.id = args.id === undefined ? generateUUID() : args.id;
        this.name = args.name;
        this.comment = args.comment;
        //voir le reste, type, ....
        this.type = args.type || 'text';
        this.primary_key = args.primary_key || false;
    }
}