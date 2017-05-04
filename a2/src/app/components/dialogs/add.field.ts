import {Component, Input} from "@angular/core";
import {DBProvider, FIELD_TYPES} from "../../providers/db.provider";
import {DialogProvider} from "../../providers/dialog.provider";

import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
import {Enumeration} from "../../providers/datas/enumeration";



@Component({
    selector:"dlg-addfield",
    templateUrl:"./add.field.html",
    styleUrls:['./add.field.scss','./global.dialog.scss']
})
export class AddFieldDialog{
    @Input () table:Table;
    @Input () field:Field;
    addfield:boolean = false;//pour savoir quel submit je veut
    error:string = "";

    types = FIELD_TYPES;//les types de field possibles....


    custom_type:Enumeration = new Enumeration();
    make_custom:boolean = false;

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}

    ngOnInit(){
        
    }
    ngOnChanges(dt){
        if(!this.field) this.field = new Field({id:null});
    }

    process_dialog_form(){
        //cree la nouvelle table et ajoute
        //suivant le submit...
        this.error = "";


        //mise a jour???
        try{

            if(this.make_custom){
                //cree un nouveau type 
                //verifie les noms et validité
                //si ok, cree un nouveau type
                this._db.addDataType (this.custom_type);//si erreur, youpi...
                this.field.type = this.custom_type.key;//enregistre

            }
            console.log("Ajoute un champs?")
            if(!this.field.id) {
                //sinon, ajoute le nouveau field...
                this._db.addFieldTo(this.field, this.table);
                if(this.addfield){
                    this.addfield = false;
                    //affiche autre boite de dialog
                    console.log("add new field");
                    this.field = new Field({id:null});
                    this.custom_type = new Enumeration();
                    return;

                }   
            }
            this._dlg.clearDialogs();
        } catch(err){
            this.error = err;
            this.addfield = false;//remet par defaut
        }
        
    }



    cancel(){
        this._dlg.clearDialogs();
    }
}