import {generateUUID} from "./utils";



export class Field{
    id:string;
    name:string;
    comment:string;
    type:string;
    type_extras: any = {};
    
    //les contraintes possibles pour un field:
    primary_key:boolean = false;
    index:boolean  = false; //doit creer un index
    not_null:boolean = false;//ne peut pas etre null
    unique: boolean = false;//doit etre unique 
    default_value: string = "";//valeur si pas de données
    check:string = "";//check expression doit etre true

    is_reference:boolean = false;//indique si est une reference ou un vrai champs
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


    copy(dt:any){
        for(let key of Object.keys(dt)){
            this[key] = dt[key] !== undefined ? dt[key] : this[key];
        }
    }
}