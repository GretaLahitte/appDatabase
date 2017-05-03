import {Component, Input,ViewChild, ElementRef} from "@angular/core";
import {Field} from "../providers/datas/field";
import {Table} from "../providers/datas/table";

@Component({
    selector:"field-cmp",
    templateUrl:'./field.html',
    styleUrls:['./field.scss']
})
export class FieldComponent{
    @Input() field:Field;
    @Input() table:Table;//la table parent


    @ViewChild("fieldElem") fieldElem;
    constructor(private _el:ElementRef){}
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

        if(!this.field.unique && !this.field.primary_key) return;
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
}