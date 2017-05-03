import {Injectable} from "@angular/core";
import {Base} from "./datas/base";
import {Index} from "./datas/index";


///connection au websocke pour creation du SQL

@Injectable()
export class WorkerProvider{

   
    worker:Worker;
    constructor(){
        //creation du worker
        this.worker = new Worker("./assets/worker.test.js");
        //les listeners
        
    }

    process_SQL(base:Base):Promise<string>{
        return new Promise<string>( (resolve,reject)=>{
            this.worker.onmessage = function(e){
                //renvoie un resultat valide
                console.log(e)
                if(e) resolve(e.data);
                else reject("No response from webworker");
            };
            this.worker.onerror = function(e){
                
                reject(e.message);
            }
            this.worker.postMessage(this.convertToJSON(base));
        });
        
    }

    /**
     * Convertie l'objet Base en json-compliant pour le webworker
     */
    convertToJSON(base:Base){
        let json = {
            db_name:base.db_name,//nom de la base
            host:base.host,//nom de l'host
            port:base.db_port,//le port d'ecoute de la base
            login:base.login,//login utilisateur
            passwrd:base.passwrd,//pass utilisateur
            type:base.db_type,//type de la base, pour l'instant, 'postgresql'

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
                fields: {},
                constraints:{}
            };
            //les fields, c'est un peu plus chaud...
            //si a une property "fields", alors c'est une clé ou index
            //composite...
            for (let field of table.fields){
                let f = {
                    comment: field.comment,
                    primary_key: field.primary_key,
                    index:field.index,
                    not_null:field.not_null,
                    unique: field.unique,
                    default_value: field.default_value,
                    check: field.check,
                    type: field.type
                };
                if((<Index>field).fields){
                    //un index ou clé composite...
                    //recupere les noms des fields necessaires pour la création de la clé
                    f["fields"] = (<Index>field).fields.map(el=>el.name);
                }
                t.fields[field.name] = f;
            }
            //contraintes de tables nom_contrainte => valeur 
            for (let constraint of table.constraints){
                t.constraints[constraint.key] = constraint.values;
            }

            json.tables[table.name] = t;
        }
        //les relations de tables 
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
        return JSON.stringify(json);

    }
}