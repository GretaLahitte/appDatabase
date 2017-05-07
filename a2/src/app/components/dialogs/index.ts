import {Component, Input} from "@angular/core";
import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";
import {Index} from "../../providers/datas/index";


@Component({
    selector:"dlg-index",
    templateUrl:'./index.html',
    styleUrls:['./index.scss','./global.dialog.scss']
})
export class IndexDialog {

    @Input() table:Table;
    @Input () field:Index;//si edition
    index:Index = new Index({id:null});

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}

    ngOnChanges(dt){
        
        if(dt.field && dt.field.currentValue){ 
            //copy les données necessaires                   
            this.index = new Index({id:null});
            let f = dt.field.currentValue;
            this.index.name = f.name;
            this.index.unique = f.unique;
            this.index.index_null = f.index_null;
            this.index.null_first = f.null_first;
            //la liste des composites
            this.index.fields = f.fields;
        } else {
            this.index = new Index({id:null});
        }
    }
    process_dialog_form(form){
        this.index.index = true; 
        if(this.field){
            console.log("mise a jour de l'index");
            this.field.name = this.index.name;
            this.field.unique = this.index.unique;
            this.field.index_null = this.index.index_null;
            this.field.null_first = this.index.null_first;
            //la liste des composites
            this.field.fields = this.index.fields;

        }   else {
            console.log("creation index");
             this.table.addIndex(this.index);
        }    
       
        this._dlg.back();
    }
    cancel(){
        this._dlg.back();
    }
    updateCheckedOptions(field, evt){
        if(evt.target.checked){
            //add to list
            this.index.fields.push(field);
        } else {
            let i = this.index.fields.indexOf(field);
            if(i>=0) this.index.fields.splice(i,1);
        }
    }
}