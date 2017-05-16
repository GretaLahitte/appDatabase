import {Component, Input, Output, EventEmitter} from "@angular/core";
import {DBProvider} from "../providers/db.provider";
import {DialogProvider} from "../providers/dialog.provider";


@Component({
    selector:"dlg-cmp",
    templateUrl:'./dialog.html',
    styleUrls:["./dialog.scss"]
})
export class DialogComponent {
    @Input() descriptor:any;
    // @Output("onCloseDialog") onClose:EventEmitter<any> = new EventEmitter<any>();

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}

    
    skip(evt){
        evt.preventDefault();
        evt.stopPropagation();
    }
}