import {Component, Input,ViewChild, ElementRef} from "@angular/core";
import {Field} from "../sql/beans/field";
import {Index} from "../sql/beans/index";
import Table from "../sql/beans/table";
import {DialogProvider} from "../dialogs/dialog.provider";
import {SQLProvider} from "../sql/sql.provider";

@Component({
    selector:"field-cmp",
    templateUrl:'./field.html',
    styleUrls:['./field.scss']
})
export class FieldComponent{
    @Input() field:Field;
    @Input() table:Table;//la table parent

    show_fabs:boolean = false;

    @ViewChild("fieldElem") fieldElem;
    constructor(private _el:ElementRef, private _dlg:DialogProvider, private _db:SQLProvider){}
    ngOnChanges(dt){
        if(dt.field){
            this.field.__elem = this.fieldElem;
        }
    }
    showItemProperty(evt){
        evt.stopPropagation();
        evt.preventDefault();
        console.log("hello")
    }

    doStartDrag(event){
        event.stopPropagation();
        console.log("trying to drag");
        if(!this.field.unique && !this.field.primary_key) return;
        console.log("OK")
        //event.preventDefault();
        //event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        //transfert les données...
        event.dataTransfer.setData("js/field", this.table.id+" "+this.field.id);
        // this.dragSrc = true;
        // this._app.onDragStarted(true);
    }
    doStopDrag(evt){
        event.stopPropagation();
        event.preventDefault();
    }

    updateField(){
        this.show_fabs = false;
        this._dlg.pushAddFieldDialog(this.table, this.field);
    }
    deleteField(){
        this.show_fabs = false;
        this._dlg.pushConfirmDialog("Confirm Field Deletion?",
            "Deleting this field will blablabla and blablabla. Are you sure?",
            {table:this.table, field:this.field},
            this._db.removeField);
    }
    updateComposite(){
        this.show_fabs = false;
        console.log("youhou")
        if(this.field.primary_key) this._dlg.pushPKDialog(this.table, <Index>this.field);
        else this._dlg.pushIndexDialog(this.table, <Index>this.field);
    }
    
}