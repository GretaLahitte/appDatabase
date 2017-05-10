import {Component, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import {Table} from "../providers/datas/table";
import {MenuProvider} from "../providers/menu.provider";
import {DBProvider} from "../providers/db.provider";


@Component({
    selector:"table-cmp",
    templateUrl:'./tables.html',
    styleUrls:['./tables.scss']
})
export class TableComponent{

    @Input() table:Table;
    @Output("onSelectedTable") selectedTable:EventEmitter<any> = new EventEmitter<any>();
    @ViewChild("tableElem") tableElem;


    constructor(private _menu:MenuProvider, private _db:DBProvider){}
    ngOnChanges(dt){
        if(dt.table){
            this.table.__elem = this.tableElem;
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
        console.log("data-transfert",dt)
        if(dt){
            
            let ids = dt.split(" ");
            //recupe la table
            let table = this._db.getTableById(ids[0]);
            if(!table || table==this.table) return;


            let field = null;
            for (let f of table.fields){
                if(f.id == ids[1]) {
                    field = f;
                    break;
                }
            }
            // //teste les indexs
            // if(!field) {
            //     for (let f of table.indexes){
            //         if(f.id == ids[1]) {
            //             field = f;
            //             break;
            //         }
            //     }
            // }
            if(!field) return;


            console.log("transferring:");
            console.log(field);

            
            //sinon, crée une nouvelle relation entre les tables
            //probleme, ai besoin de connaitre la table de depart...
            console.log("make relation")
            this._db.makeRelation({table:table, field:field},this.table);
            
        }
    }
}