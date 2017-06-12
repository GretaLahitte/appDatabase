import {Component, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import Table from "../../sql/beans/table";
import {Field} from "../../sql/beans/field";

import {MenuProvider} from "../../menus/menu.provider";
import {SQLProvider} from "../../sql/sql.provider";

@Component({
    selector:"table-cmp",
    templateUrl:'./tables.html',
    styleUrls:['./tables.scss']
})
export class TableComponent{

    @Input() table:Table;
    @Output("onSelectedTable") selectedTable:EventEmitter<any> = new EventEmitter<any>();
    @Output("onNewRelation") newRelation:EventEmitter<any> = new EventEmitter<any>();
    @ViewChild("tableElem") tableElem;


    constructor(private _menu:MenuProvider, private _db:SQLProvider){}
    ngOnChanges(dt){
        if(dt.table){
            this.table.elem = this.tableElem;
        }
    }
    startDrag(evt){
        
        if(evt.button != 0) return;
        evt.preventDefault();
        //evt.stopPropagation();
        //evt.target.style.zIndex = 2000;
        var el = this.table;
        el.selected = true;
        
        let __shift_left =  el.coords.x - evt.clientX;
        let __shift_top = el.coords.y - evt.clientY;

        
        this.selectedTable.emit({
            cible:el,
            shift_left: __shift_left,
            shift_top: __shift_top
        });//envoie la table selectionnée
        
        // __captureEvents();
    }


    showMenu(evt){
        console.log("showmenu")
        evt.preventDefault();
        evt.stopPropagation();
        
        this._menu.pushTableContextMenu(this.table,{
                x:evt.pageX ||evt.offsetX,
                y:evt.pageY || evt.offsetY
            });
        
    }

    skip_evt(event){event.preventDefault();}
    doDrop(event){
        let dt = event.dataTransfer.getData("js/field");
        event.stopPropagation();
        this.skip_evt(event);
        //lance le move
        if(dt){
            
            let ids = dt.split(" ");
            //recupe la table
            let table = this._db.getTableById(ids[0]);

            //update: drag & drop dans une meme table
            //if(!table || table==this.table) return;
            if(!table) return;
            let field:Field = null;
            let index = -1;
            for (let f of table.fields){
                index++;
                if(f.id == ids[1]) {
                    field = f;
                    break;
                }
            }

            console.log("Verification de la cible....")

            if(table == this.table){
                //deplace le field dans la table
                console.log("Move in table");
                //a quel index????
                //remet a jour les relations
                this.newRelation.emit({table:this.table});

            } else {

                //creation d'une relation entre 2 tables
                //verifie que le field est unique ou PK
                console.log("création d'une relation?", field);
                if(!field) return;
                if(!field.unique && !field.primary_key) return;//ne permet pas la creation d'une relation
                console.log("OK, creation!!!")
                
                //sinon, crée une nouvelle relation entre les tables
                //probleme, ai besoin de connaitre la table de depart...
                
                this._db.makeRelation({table:table, field:field},this.table);
                this.newRelation.emit({table: this.table});
            }
        }
    }
}