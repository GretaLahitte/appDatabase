import {generateUUID} from "./utils";

import {Field} from "./field";
import {Relation} from "./relation";
import {Index} from "./index";



export class Table{
    

    id: string;//identifiant, a voir...
    __name:string;//nom de la table, unique
    comment:string; //un commentaire sur la table 
    coords:{x:number, y:number};//coordonnées sur la page
    selected: boolean;
    fields: Array<Field>;
    //relations: Array<Relation>;

    //les contraintes....
    constraints:Array<any> = [];
    //les clés indexs
    indexes:Array<Index> = []
    
    constructor(args){
        args = args || {};
        this.id = args.id || generateUUID();
        this.name = args.name;
        this.comment = args.comment;
        this.coords = args.coords || {x:0,y:0};
        this.selected = args.selected || false;
        this.fields = args.fields || [];

        
        //this.relations = args.relations || [];
    }
    get name(){return this.__name;}
    set name(v){
        
        //sinon, OK
        this.__name = v;
    }

    addIndex(index:Index){
        //verifications....
        this.indexes.push(index);
    }
    hasPK():boolean{
        for(let field of this.fields){            
            if(field.primary_key === true) return true;
        }
        return false;
    }
}