import {Component, Input} from "@angular/core";
import {DialogProvider} from '../../dialog.provider';
import {SQLProvider} from "../../../sql/sql.provider";

@Component({
    selector:"dlg-confirm",
    templateUrl:'./confirm.html',
    styleUrls:['./confirm.scss','./global.dialog.scss']
})
export class ConfirmDialog {

   
    @Input() next:Function;
    @Input() target: any ;

    error:string = "";
    constructor(private _dlg:DialogProvider, private _db:SQLProvider){}


    perform_action(form){
        //what to do???
        try{
            this.error = null;
            this.next.call(this._db,this.target);
            this._dlg.back();
        } catch(err){
            this.error  = err;
        }
    }
    cancel(){
        this._dlg.back();
    }
   
}