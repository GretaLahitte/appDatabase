import {Component} from "@angular/core";
import {DialogProvider} from '../../dialog.provider';


@Component({
    selector:"dlg-about",
    templateUrl:'./about.html',
    styleUrls:['./about.scss','global.dialog.scss']
})
export class AboutDialog{
    constructor(private _dlg:DialogProvider){}
    cancel(){
        this._dlg.clearDialogs();
    }
}