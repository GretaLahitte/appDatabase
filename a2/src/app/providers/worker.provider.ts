import {Injectable} from "@angular/core";
import {Base} from "./datas/base";

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