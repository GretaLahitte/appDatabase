import {Component, Input, ViewChild} from "@angular/core";
import Table from "../../../sql/beans/table";
import {Field} from "../../../sql/beans/field";
import {DialogProvider} from '../../dialog.provider';
import {SQLProvider} from "../../../sql/sql.provider";
import {Index} from "../../../sql/beans/index";


@Component({
    selector:"dlg-index",
    templateUrl:'./index.html',
    styleUrls:['./index.scss','./global.dialog.scss']
})
export class IndexDialog {
    @ViewChild("firstInput") firstinput;
    @Input() table:Table;
    @Input () field:Index;//si edition
    index:Index = new Index({id:null});

    constructor(private _db:SQLProvider, private _dlg:DialogProvider){}

    ngOnChanges(dt){
        
        if(dt.field && dt.field.currentValue){ 
            //copy les données necessaires                   
            this.index = new Index({id:null});
            let f = dt.field.currentValue;
            this.index.name = f.name;
            this.index.unique = f.unique;
            this.index.index_null = f.index_null;
            this.index.null_first = f.null_first;
            this.index.is_reference = f.is_reference;
            //la liste des composites
            this.index.fields = f.fields;
        } else {
            this.index = new Index({id:null});
        }
    }
    ngAfterViewInit(){this.firstinput.nativeElement.focus();}
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
            this._db.addIndex(this.table, this.index);
            // this.table.addIndex(this.index);
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