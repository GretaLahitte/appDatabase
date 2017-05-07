import {Component, Input} from "@angular/core";
import {DBProvider} from "../../providers/db.provider";
import {DialogProvider} from "../../providers/dialog.provider";

import {Table} from "../../providers/datas/table";
import {Index} from "../../providers/datas/index";


@Component({
    selector:"dlg-pk",
    templateUrl:"./add.primary.html",
    styleUrls:['./add.primary.scss','./global.dialog.scss']
})
export class PKDialog{
    @Input() table:Table;
    @Input() field:Index;
    index:Index = new Index({});

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}
    ngOnChanges(dt){
        console.log(dt)
        if(dt.field && dt.field.currentValue){ 
            //copy les données necessaires                   
            this.index = new Index({id:null});
            let f = dt.field.currentValue;
            this.index.name = f.name;
             //la liste des composites
            this.index.fields = f.fields;
        } else {
            this.index = new Index({id:null});
        }
    }

    process_dialog_form(form){
        this.index.primary_key = true; 
        if(this.field){
            console.log("mise a jour de la clé");
            this.field.name = this.index.name;
            this.field.primary_key = this.index.primary_key;
            //la liste des composites
            this.field.fields = this.index.fields;

        }   else {
            this.index.primary_key = true;
            this.table.addCompositePK(this.index);
            
        }
        this._dlg.back();
    }
    cancel(){
        this._dlg.back();
    }
    updateCheckedOptions(field, evt){
        if(evt.target.checked){
            //add to list
            this.index.fields.push(field);
        } else {
            let i = this.index.fields.indexOf(field);
            if(i>=0) this.index.fields.splice(i,1);
        }
    }
}