import {Injectable} from "@angular/core";
import {Base} from "./datas/base";
import {Index} from "./datas/index";


///connection au websocke pour creation du SQL

@Injectable()
export class WorkerProvider{

   
    worker:Worker;
    constructor(){
        //creation du worker
        this.worker = new Worker("./assets/worker.test.2.js");
        //les listeners
        
    }

    process_SQL(base:string):Promise<string>{
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
            this.worker.postMessage(base);
        });
        
    }

    
}