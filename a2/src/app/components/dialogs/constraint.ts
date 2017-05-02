import {Component, Input} from "@angular/core";
import {DBProvider, FIELD_TYPES} from "../../providers/db.provider";
import {DialogProvider} from "../../providers/dialog.provider";

import {Table} from "../../providers/datas/table";
import {Enumeration} from "../../providers/datas/enumeration";
@Component({
    selector:"dlg-constraint",
    templateUrl:"./constraint.html",
    styleUrls:['./constraint.scss','./global.dialog.scss']
})
export class ConstraintDialog{
    @Input() table:Table;
    constraint:Enumeration = new Enumeration();

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}
    process_dialog_form(form){
        this.table.addConstraint(this.constraint);
        this._dlg.back();
    }
    cancel(){
        this._dlg.back();
    }
}