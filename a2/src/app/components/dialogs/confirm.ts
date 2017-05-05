import {Component, Input} from "@angular/core";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";

@Component({
    selector:"dlg-confirm",
    templateUrl:'./confirm.html',
    styleUrls:['./confirm.scss','./global.dialog.scss']
})
export class ConfirmDialog {

   
    @Input() next:Function;
    @Input() target: any ;
    constructor(private _dlg:DialogProvider, private _db:DBProvider){}


    perform_action(form){
        //what to do???
        try{
            this.next.call(this._db,this.target);
            this._dlg.back();
        } catch(err){
            console.error(err);
        }
    }
    cancel(){
        this._dlg.back();
    }
   
}