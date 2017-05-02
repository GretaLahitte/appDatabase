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
    _history:Array<any> = [];

    getDialogObservable():Observable<any>{
        return this.dlg.asObservable();
    }

    clearDialogs(){
        this._history = [];//vide l'historique
        this.dlg.next(null);
    }
    back(){
        let last = null;
        if(this._history.length > 1){
            //pop les 2 derniers
            this._history.pop();//actuel
            last = this._history[this._history.length -1];
        }
        this.dlg.next(last);
    }
    next(dlg:any){
        this._history.push(dlg);
         this.dlg.next(dlg);

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
        this.next(desc);
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
        this.next(desc);
    }
    pushShowTableProperties(target:Table){
        let desc = {
            title:"Table Properties",
            texte:"table properties...",
            type:"SHOW_TABLE",
            target: target
        };
        this.next(desc);
    }
     pushAddFieldDialog(target:Table){
        let desc = {
            title:"Add Field",
            texte:"Add a new Field to the table",
            type:"ADD_FIELD",
            target:target,
            
        };
        this.next(desc);
    }
    pushAboutDialog(){
        let desc = {
            title:"About",
            texte:"Greta SQLTool v1.0",
            type:"ABOUT",
        };
        this.next(desc);
    }
    pushIndexDialog(target:Table){
        let desc = {
            title:"Add Index",
            texte:"Add an index to the table",
            type:"ADD_INDEX",
            target:target
            
        };
        this.next(desc);
    }
}