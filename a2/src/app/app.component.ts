import { Component, OnInit } from '@angular/core';
import {DBProvider} from './providers/db.provider';
import {DialogProvider} from "./providers/dialog.provider";
import {MenuProvider} from "./providers/menu.provider";


import {Base} from "./providers/datas/base";
import {Table} from "./providers/datas/table";
import {Observable} from "rxjs/Observable";


// import {ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
  
})
export class AppComponent {
  title = 'GRETA SQL Tool';
  slogan = "a sql tool that's super cool!";

  database:Base;
  databaseObservable: Observable<Base>;



  selectedTable: Table = null;
  shift_left: number = 0;
  shift_top: number = 0;


  descriptor:any;//descripteur de menu contextuel
  dlgDescriptor: any;//descriptor de la boite de dialogue

  menuObs:Observable<any>;
  DLGoBS:Observable<any>;

  constructor (private _db:DBProvider, private _menu:MenuProvider, private _dlg:DialogProvider){}
  ngOnInit(){

    this.menuObs = this._menu.getMenuObservable();
    this.menuObs.subscribe( (mn)=>{
        this.descriptor = mn;
    });

    this.DLGoBS = this._dlg.getDialogObservable();
    this.DLGoBS.subscribe( (mn)=>{
        this.dlgDescriptor = mn;
    });
    this.databaseObservable = this._db.db_subject.asObservable();
    this.databaseObservable.subscribe( (b:Base)=> this.database = b);
    this._db.loadDummyBase();
  }

  setSelectedTable(el:any){
    console.log("setSelectedTable")
    this.selectedTable = el.cible;
    this.shift_left = el.shift_left;
    this.shift_top = el.shift_top;


  }
   drag(evt){
        if(this.selectedTable){
          evt.preventDefault();
          evt.stopPropagation();
        
           let __cible = this.selectedTable;
            __cible.coords = {x:evt.clientX + this.shift_left,
                            y:evt.clientY + this.shift_top};
            
           
         }
        
    }
    
    /**
     * Event au mouse up: supprime les events au documnt et 
     * relache la cible 
     * @param evt: MouseUpEvent
     */
    stop_drag(evt){
        if(this.selectedTable){
            let __cible = this.selectedTable;
            __cible.selected = false;
            //remet en place une derniere fois...
            __cible.coords = {x:evt.clientX + this.shift_left,
                            y:evt.clientY + this.shift_top};

            this.selectedTable = null;
        
        }
        
    }


    clearMenu(desc){      
      if(this.descriptor) this._menu.clearMenus();
      
      
    }
    showContextMenu(evt){
      evt.preventDefault();
      evt.stopPropagation();

      this._menu.pushMainContextMenu(this.database,{
                x:evt.pageX ||evt.offsetX,
                y:evt.pageY || evt.offsetY
            });
   
    }
    
}
