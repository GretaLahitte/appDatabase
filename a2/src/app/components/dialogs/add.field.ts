import {Component, Input} from "@angular/core";
import {DBProvider} from "../../providers/db.provider";
import {DialogProvider} from "../../providers/dialog.provider";

import {Table} from "../../providers/datas/table";
import {Field, FIELD_TYPES} from "../../providers/datas/field";

@Component({
    selector:"dlg-addfield",
    templateUrl:"./add.field.html",
    styleUrls:['./add.field.scss','./global.dialog.scss']
})
export class AddFieldDialog{
    @Input () table:Table;
    field:Field;
    addfield:boolean = false;//pour savoir quel submit je veut
    error:string = "";

    types = FIELD_TYPES;//les types de field possibles....

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}

    ngOnInit(){
        this.field = new Field({});
    }

    process_dialog_form(){
        //cree la nouvelle table et ajoute
        //suivant le submit...
        this.error = "";
        try{
            this._db.addFieldTo(this.field, this.table);
            if(this.addfield){
                this.addfield = false;
                //affiche autre boite de dialog
                console.log("add new field");
                this.field = new Field({});


            } else  this._dlg.clearDialogs();
        } catch(err){
            this.error = err;
            this.addfield = false;//remet par defaut
        }
        
    }



    cancel(){
        this._dlg.clearDialogs();
    }
}