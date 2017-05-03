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
    //indexes:Array<Index> = []
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
        if(index.fields.length == 1){
            let fi:Field = index.fields[0];
            fi.index = true;
            //this.fields.push(fi);
        } else {
            //verifications....
            let n = index.name;
            for(let t of this.fields){
                if(t.name == n) throw "Invalid name: index must be unique in table!";
            }
            index.index = true;
            this.fields.push(index);
        }
        
        //this.indexes.push(index);
    }
    addConstraint(c:Enumeration){
        let n = c.key;
        for(let t of this.constraints){
            if(t.key == n) throw "Invalid name: constraint must be unique in table!";
        }
        this.constraints.push(c);
    }
    addCompositePK(index:any){

        if(index.fields.length == 1){
            //un seul field, pas de création d'index
            index = index.fields[0];
            index.primary_key = true;
        }
        else {
            //plusieurs clés, cree un nouvel element
            if(!index.name){
                //genere la clé?
                index.name = index.fields.map(el=>{
                    return el.name;
                }).join('_');
            }
            index.primary_key = true;
            this.fields.push(index);
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