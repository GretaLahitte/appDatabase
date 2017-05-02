import {Injectable} from "@angular/core";
import {Base} from "./datas/base";

const Worker = require('worker!../../worker.test');
const worker = new Worker();
//connection au websocke pour creation du SQL

@Injectable()
export class WorkerProvider{

   

    constructor(){
        //creation du worker
        //this.worker = new Worker("worker.test.js");
        //les listeners
        
    }

    process_SQL(base:Base):Promise<string>{
        return new Promise<string>( (resolve,reject)=>{
            worker.onmessage = function(e){
                //renvoie un resultat valide
                if(e) resolve(e.data);
                else reject("No response from webworker");
            };
            worker.onerror = function(e){
                reject(e);
            }
            worker.postMessage(this.convertToJSON(base));
        });
        
    }


    convertToJSON(base:Base){
        let json = {
            db_name:base.db_name,
            host:base.host,
            port:base.db_port,
            login:base.login,
            passwrd:base.passwrd,
            type:base.db_type,

            tables:[],
            relations:[],
            enumerations:[]
        };

        return JSON.stringify(json);

    }
}