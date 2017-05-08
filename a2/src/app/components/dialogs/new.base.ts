import {Component, Input} from "@angular/core";
import {Base} from "../../providers/datas/base";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";


@Component({
    selector:"dlg-newbase",
    templateUrl:'./new.base.html',
    styleUrls:['./new.base.scss','./global.dialog.scss']
})
export class NewBaseDialog {

    base:Base;
    
    constructor(private _db:DBProvider, private _dlg:DialogProvider){}
    ngOnInit(){
        this.base = new Base({});
    }

    process_dialog_form(form){
        //envoie la nouvelle base
        this._db.setCurrentBase(this.base);
        this._dlg.clearDialogs();
    }
    cancel(){
        this._dlg.clearDialogs();
    }


    //met ajour, modifie au cas ou...
    //devoir faire ca partout va etre la merde...
    // setProp(name:string, inp){
    //     try{
    //         this.base[name] = inp.value;
    //     } catch(err){
    //         console.log(err);
    //         inp.value = this.base[name];
    //     }
    // }
    
}