import {generateUUID} from "./utils";

import {Field} from "./field";
import {Relation} from "./relation";
import {Index} from "./index";
import {Enumeration} from "./enumeration";


export class Table{
    

    id: string;//identifiant, a voir...
    __name:string;//nom de la table, unique
    comment:string; //un commentaire sur la table 
    coords:{x:number, y:number};//coordonnées sur la page
    selected: boolean;
    fields: Array<Field>;
    //relations: Array<Relation>;

    //les contraintes....
    constraints:Array<Enumeration> = [];
    //les clés indexs
    indexes:Array<Index> = []
    pk:Index;

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
        let n = index.name;
        for(let t of this.indexes){
            if(t.name == n) throw "Invalid name: index must be unique in table!";
        }
        this.indexes.push(index);
    }
    addConstraint(c:Enumeration){
        let n = c.key;
        for(let t of this.constraints){
            if(t.key == n) throw "Invalid name: constraint must be unique in table!";
        }
        this.constraints.push(c);
    }
    addCompositePK(index:Index){
        if(!index.name){
            //genere la clé?
            index.name = index.fields.map(el=>{
                return el.name;
            }).join('_');
        }
        //marque les clés ???

        this.pk = index;
    }


    
    hasPK():boolean{
        for(let field of this.fields){            
            if(field.primary_key === true) return true;
        }
        return false;
    }
}