import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

import Base from "../sql/beans/base";
import Table from "../sql/beans/table";
import {Field} from "../sql/beans/field";
import {Index} from "../sql/beans/index";
import {Enumeration} from "../sql/beans/enumeration";


/**
 * Chargée de créer les descripteurs de dialogues pour l'application
 */
@Injectable()
export class DialogProvider{

    dlg:Subject<any> = new Subject<any>();
    _history:Array<any> = [];

    constructor(){
    }
    
    getDialogObservable():Observable<any>{
        return this.dlg.asObservable();
    }

    //supprime toute la liste des dialogues et supprime de l'ecran
    //supprime aussi l'historique au cas ou...
    clearDialogs(){
        this._history = [];//vide l'historique
        this.dlg.next(null);
    }

    //revient dans l'historique un coup en arriere
    //si plus de données dans l'historique, supprime la boite de dialogue
    back(){
        let last = null;
        if(this._history.length > 0){
            //pop les 2 derniers
            this._history.pop();//actuel
            last = this._history[this._history.length -1];
        }
        this.dlg.next(last);
    }

    //push une nouvelle dialogue à l'ecran
    //ajoute la dialogue courante (si existe) dans l'historique
    next(dlg:any){
        this._history.push(dlg);
         this.dlg.next(dlg);

    }

    //Juste pour les tests
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
    pushAddFieldDialog(target:Table, field?:Field){

        
        let desc =null;
        if(field){
            desc = {
                title:"Edit Field",
                texte:"Edit field datas",
                type:"ADD_FIELD",
                target:target,
                field:field
                
            };
        }else {
            desc = {
                title:"Add Field",
                texte:"Add a new Field to the table",
                type:"ADD_FIELD",
                target:target,
                
            };
        }

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
    pushIndexDialog(target:Table, index?:Index){
        let desc = {
            title:index ? "Edit Index" : "Add Index",
            texte: index ? "Edit your index" : "Add an index to the table",
            type:"ADD_INDEX",
            target:{
                table: target,
                index: index
            }
            
        };
        this.next(desc);
    }
    pushConstraintDialog(target:Table, constraint?:Enumeration){
        let desc = {
            title:"Add Constraint",
            texte:"Add a constraint to the table",
            type:"ADD_CONSTRAINT",
            target:target,
            constraint:constraint
            
        };
        this.next(desc);
    }
    pushPKDialog(target:Table, pk?:Index){
        let desc = {
            title:pk? "Edit Primary Key" :"Add Primary Key",
            texte:pk? "Edit primary key" : "Add a primary key to the table",
            type:"ADD_PK",
            target:target,
            pk: pk
            
        };
        this.next(desc);
    }
    pushExportDialog(){
        let desc = {
            title:"Export your base",
            texte:"Export your base to  SQL",
            type:"EXPORT"
            
        };
        this.next(desc);
    }
    pushNewBaseDialog(){
        let desc = {
            title:"Create a new Base",
            texte:"Create a new base",
            type:"CREATE_BASE",
            
        };
        this.next(desc);
    }
    pushConfirmDialog(title:string, message:string,target:any, next:any){
        let desc = {
            title:title,
            texte:message,
            type:"CONFIRM",
            //action a realiser...
            target: target,
            next: next
        };
        this.next(desc);
    }

     pushEditBaseDialog(target?:Base){
        let desc = {
            title:"Base Properties",
            texte:"Edit and change base properties, but take care...",
            type:"CREATE_BASE",
            target: target || {}
        };
        this.next(desc);
    }
    pushCustomTypeDialog(target?:Enumeration){
        let desc = {
            title:"Custom Types",
            texte:"Edit custom types enumeration for the base",
            type:"CREATE_CTYPE",
            target: target
        };
        this.next(desc);
    }


}