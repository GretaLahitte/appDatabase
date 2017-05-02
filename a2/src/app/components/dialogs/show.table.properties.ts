import {Component, Input} from "@angular/core";
import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
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
    ngOnChanges(dt){
        // if(dt.table){
        //     this.table_cpy = new Table(this.table);
        // }
    }

    process_dialog_form(){
        //validate datas and then change in table...

        this._dlg.clearDialogs();
    }
    cancel(){
        this._dlg.clearDialogs();
    }

    newConstraint(){

    }
    newIndex(){
        this._dlg.pushIndexDialog(this.table);
    }
    newPK(){

    }
}