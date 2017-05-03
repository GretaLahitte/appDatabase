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
    index:Index = new Index({});

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}


    process_dialog_form(form){
        this.index.primary_key = true;
        this.table.addCompositePK(this.index);
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