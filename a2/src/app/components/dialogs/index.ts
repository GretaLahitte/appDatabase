import {Component, Input} from "@angular/core";
import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";
import {Index} from "../../providers/datas/index";


@Component({
    selector:"dlg-index",
    templateUrl:'./index.html',
    styleUrls:['./index.scss','./global.dialog.scss']
})
export class IndexDialog {

    @Input() table:Table;
    index:Index = new Index({});

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}


    process_dialog_form(form){
        this.index.index = true;        
        this.table.addIndex(this.index);
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