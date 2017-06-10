import {Component, Input} from "@angular/core";
import Table from "../../../sql/beans/table";
import {Field} from "../../../sql/beans/field";
import {Index} from "../../../sql/beans/index";
import {Enumeration} from "../../../sql/beans/enumeration";


import {DialogProvider} from '../../dialog.provider';
import {SQLProvider} from "../../../sql/sql.provider";



@Component({
    selector:"dlg-tableprops",
    templateUrl:"./show.table.properties.html",
    styleUrls:['./show.table.properties.scss', './global.dialog.scss']
})
export class ShowTableProperties{
    @Input() table: Table;
    


    error:string = "";
    table_cpy:Table;//une copie pour eviter les changements intempestifs...

    constructor(private _db:SQLProvider, private _dlg:DialogProvider){}
    ngOnInit(dt){
        
        
    }
    ngOnChanges(dt){
        this.table_cpy = new Table({});
        if(dt.table && dt.table.currentValue){
            
            this.table_cpy.copy(dt.table.currentValue);
        }
    }

    process_dialog_form(){
        //validate datas and then change in table...
        this.table.copy(this.table_cpy);
        this._dlg.clearDialogs();
    }
    cancel(){
        this._dlg.clearDialogs();
    }

    newConstraint(){
        this._dlg.pushConstraintDialog(this.table);
    }
    // newIndex(){
    //     this._dlg.pushIndexDialog(this.table);
    // }
    // newPK(){
    //     this._dlg.pushPKDialog(this.table);
    // }

    // updateIndex(index:Index){

    // }
    // deleteIndex(index:Index){

    // }

    updateConstraint(c:Enumeration){
        this._dlg.pushConstraintDialog(this.table, c);
    }
    deleteConstraint(c:Enumeration){
        this._dlg.pushConfirmDialog("Confirm Constraint deletion","Are you sure?",{table: this.table, constraint:c},this._db.dropConstraint);
    }
    // updatePK(c:Enumeration){

    // }
    // deletePK(c:Enumeration){

    // }
}