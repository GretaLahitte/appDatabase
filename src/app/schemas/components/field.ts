import {Component, Input,ViewChild, ElementRef} from "@angular/core";
import {Field} from "../../sql/beans/field";
import {Index} from "../../sql/beans/index";
import Table from "../../sql/beans/table";
import {DialogProvider} from "../../dialogs/dialog.provider";
import {SQLProvider} from "../../sql/sql.provider";

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
        //if(!this.field.unique && !this.field.primary_key) return;
        //console.log("OK")
        //event.preventDefault();
        //event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        //transfert les données...
        event.dataTransfer.setData("js/field", this.table.id+" "+this.field.id);
        // this.dragSrc = true;
        // this._app.onDragStarted(true);
    }
    doStopDrag(evt){
        console.log("stop dragging")
        evt.stopPropagation();
        evt.preventDefault();
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



    skip_evt(event){event.preventDefault();}
    doDrop(event){

        //drop uniquement si de la meme table!!!!
        let dt = event.dataTransfer.getData("js/field");
        
        //lance le move
        if(dt){
            
            let ids = dt.split(" ");
            //verifie si se trouve sur la meme table???
            let table = this._db.getTableById(ids[0]);
            if(!table) return;
            if(table != this.table) return;//provient d'une autre table, refuse

            //sinon, insert before
            /*event.stopPropagation();
            this.skip_evt(event);*/

            //recupere l'index du field
            let field:Field = null;
            let index = -1;
            for (let f of table.fields){
                index++;
                if(f.id == ids[1]) {
                    field = f;
                    break;
                }
            }
            if(!field) return;
            if(field == this.field) return;//deplace sur lui meme
            //pop
            this.table.fields.splice(index,1);
            //recupere son index
            let myindex = this.table.fields.indexOf(this.field);

            //2 cas: remonte ou descend
            if(myindex>=index){
                //descend, met apres
                if(myindex+1==this.table.fields.length) this.table.fields.push(field);
                else this.table.fields.splice(myindex+1,0,field);
            } else {
                //monte, met avant
                if(myindex==0) this.table.fields.unshift(field);
                else this.table.fields.splice(myindex,0,field);
            }
            //insert le precedent APRES
            //console.log("indexes: ",index, myindex);
            
        }
    }
    
}