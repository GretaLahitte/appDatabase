import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

import {Table} from "../providers/datas/table";

/**
 * Chargée de créer les descripteurs de dialogues pour l'application
 */
@Injectable()
export class DialogProvider{

    dlg:Subject<any> = new Subject<any>();


    getDialogObservable():Observable<any>{
        return this.dlg.asObservable();
    }

    clearDialogs(){
        this.dlg.next(null);
    }
    pushDummyDialog(){
        let desc = {
            title:"test",
            texte:"un text de test",
            commands:[
                {
                    label:"OK",
                    action:"OK"
                }
            ]
        };
        this.dlg.next(desc);
    }

    pushAddTableDialog(coords={x:0,y:0}){
        let desc = {
            title:"Add Table",
            texte:"Add a new table to the database",
            type:"ADD_TABLE",
            coords:coords,
            commands:[
                {
                    label:"Add Table",
                    action:"ADD"
                },
                {
                    label:"Add Table & create field",
                    action:"ADD_FIELD"
                }
            ]
        };
        this.dlg.next(desc);
    }
     pushAddFieldDialog(target:Table){
        let desc = {
            title:"Add Field",
            texte:"Add a new Field to the table",
            type:"ADD_FIELD",
            target:target,
            
        };
        this.dlg.next(desc);
    }
    pushAboutDialog(){
        let desc = {
            title:"About",
            texte:"Greta SQLTool v1.0",
            type:"ABOUT",
        };
        this.dlg.next(desc);
    }
}