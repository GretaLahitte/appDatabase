import {Component, Input} from "@angular/core";
import {Enumeration} from "../../providers/datas/enumeration";

import {DBProvider} from "../../providers/db.provider";
import {DialogProvider} from "../../providers/dialog.provider";

@Component({
    selector:"dlg-customtype",
    templateUrl:"./custom.type.html",
    styleUrls:['./custom.type.scss','./global.dialog.scss']
})
export class CustomTypeDialog{
    @Input() enumeration:Enumeration;
    e:Enumeration;



    error:string;
    constructor(private _db:DBProvider, private _dlg:DialogProvider){}

    ngOnChanges(dt){
        
        if(dt.enumeration && dt.enumeration.currentValue){
            this.e = new Enumeration(dt.enumeration.currentValue);
        } else this.e = new Enumeration();
    }

    
    process_dialog_form(form){
        this.error = "";
        try{
            if(this.enumeration){
                //mise a jour simple, verifie la clé avant tout
                if(this.enumeration.key!=this.e.key){
                    if(!this._db.isDataTypeFree(this.e))throw "Invalid key: must be unique";                    
                }  
                this.enumeration.key = this.e.key;
                this.enumeration.values = this.e.values;
                
            } else {
            
                this._db.addDataType(this.e);
            }
            this._dlg.back();
        } catch(err){
            this.error = err;
        }
        
    }
    cancel(){
        this._dlg.back();
    }
}