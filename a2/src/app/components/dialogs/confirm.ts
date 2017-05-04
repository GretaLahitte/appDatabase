import {Component, Input} from "@angular/core";
import {DialogProvider} from '../../providers/dialog.provider';


@Component({
    selector:"dlg-confirm",
    templateUrl:'./confirm.html',
    styleUrls:['./confirm.scss','./global.dialog.scss']
})
export class ConfirmDialog {

   
    @Input() next:Function;
    @Input() target: any ;
    constructor(private _dlg:DialogProvider){}


    perform_action(form){
        //what to do???
        try{
            this.next(this.target);
            this._dlg.clearDialogs();
        } catch(err){
            console.error(err);
        }
    }
    cancel(){
        this._dlg.clearDialogs();
    }
   
}