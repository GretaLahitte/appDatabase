import {Component, Input} from "@angular/core";
import {SQLProvider, FIELD_TYPES} from "../../../sql/sql.provider";
import {DialogProvider} from "../../dialog.provider";

import Table from "../../../sql/beans/table";
import {Enumeration} from "../../../sql/beans/enumeration";
@Component({
    selector:"dlg-constraint",
    templateUrl:"./constraint.html",
    styleUrls:['./constraint.scss','./global.dialog.scss']
})
export class ConstraintDialog{
    @Input() table:Table;
    @Input() cnt:Enumeration;


    constraint:Enumeration = new Enumeration();
    error:string = null;

    constructor(private _db:SQLProvider, private _dlg:DialogProvider){}

    ngOnChanges(dt){
        console.log(dt.cnt)
        if(dt.cnt && dt.cnt.currentValue){
            this.constraint = new Enumeration(dt.cnt.currentValue);//fait une copie
        }
    }
    process_dialog_form(form){

        if(this.cnt){
            this.table.removeConstraint(this.cnt);
        }
        try{
            
            this.table.addConstraint(this.constraint);
            this._dlg.back();
        }catch(err){
            this.error = err;
        }
    }
    cancel(){
        this._dlg.back();
    }
}