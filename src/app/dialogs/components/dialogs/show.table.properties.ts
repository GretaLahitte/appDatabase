import {Component, Input} from "@angular/core";
import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
import {Index} from "../../providers/datas/index";
import {Enumeration} from "../../providers/datas/enumeration";


import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";



@Component({
    selector:"dlg-tableprops",
    templateUrl:"./show.table.properties.html",
    styleUrls:['./show.table.properties.scss', './global.dialog.scss']
})
export class ShowTableProperties{
    @Input() table: Table;
    


    error:string = "";
    table_cpy:Table;//une copie pour eviter les changements intempestifs...

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}
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