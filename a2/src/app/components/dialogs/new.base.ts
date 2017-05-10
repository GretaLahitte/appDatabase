import {Component, Input} from "@angular/core";
import {Base} from "../../providers/datas/base";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";
import {Enumeration} from "../../providers/datas/enumeration";

@Component({
    selector:"dlg-newbase",
    templateUrl:'./new.base.html',
    styleUrls:['./new.base.scss','./global.dialog.scss']
})
export class NewBaseDialog {

    @Input() editable:Base;
    base:Base;
    error:string;
    
    constructor(private _db:DBProvider, private _dlg:DialogProvider){}
    ngOnInit(){
        //this.base = new Base({});
    }
    ngOnChanges(dt){
        if(dt.editable && dt.editable.currentValue){
            
            //copie les infos
            let e = <Base>dt.editable.currentValue;
            this.base = new Base({});
            this.copy(this.base, e);
        }
    }


    private copy(a:Base, b:Base){
        a.db_name = b.db_name;
        a.db_port = b.db_port;
        a.db_type = b.db_type;
        a.host = b.host;
        a.login = b.login;
        a.passwrd = b.passwrd;

        a.enumerations = b.enumerations;
    }
    process_dialog_form(form){
        //envoie la nouvelle base
        if(this.editable){
            this.copy(this.editable,this.base);
            this._db.setCurrentBase(this.editable);
        }
        else {
            this._db.setCurrentBase(this.base);
        }
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
    newEnum(){
        this._dlg.pushCustomTypeDialog(null);
    }
    updateEnum(e:Enumeration){
        this._dlg.pushCustomTypeDialog(e);
    }
    deleteEnum(e:Enumeration){
        //suppression si non utilisé
        try{
            this._db.removeDataType(e);
        } catch(err) {this.error = err ;}
        
        
    }
    
}