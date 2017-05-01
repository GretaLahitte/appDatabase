import {Component, Input, Output, EventEmitter} from "@angular/core";
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
    
    constructor(private _menu:MenuProvider, private _db:DBProvider){}

    startDrag(evt){
        console.log("drag")
        if(evt.button != 0) return;
        console.log("start drag")
        evt.preventDefault();
        //evt.stopPropagation();
        //evt.target.style.zIndex = 2000;
        var el = this.table;
        el.selected = true;
        
        let __shift_left =  el.coords.x - evt.clientX;
        let __shift_top = el.coords.y - evt.clientY;

        console.log(__shift_left,__shift_top)
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
            console.log("transferring:");
            console.log(dt);

            //verifie que n'existe pas deja 
            for(let f of this.table.fields){
                if(f == dt.field){
                    //annule le transfert
                    console.log("d&d in same place!!!")
                    return;
                }
            }
            //sinon, crée une nouvelle relation entre les tables
            //probleme, ai besoin de connaitre la table de depart...
            console.log("make relation")
            this._db.makeRelation(dt,this.table);
            
        }
    }
}