import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
//import {DBProvider} from './providers/db.provider';
//import {DialogProvider} from "./providers/dialog.provider";
import {MenuProvider} from "./providers/menu.provider";


import {SQLProvider} from "./sql/sql.provider";
import {DialogProvider} from "./dialogs/dialog.provider";


import Base from "./sql/beans/base";
import Table from "./sql/beans/table";

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
  @ViewChild("wrapper") wrapper;


  selectedTable: Table = null;
  shift_left: number = 0;
  shift_top: number = 0;


  wrapperW:number;
  wrapperH:number;

  descriptor:any;//descripteur de menu contextuel
  dlgDescriptor: any;//descriptor de la boite de dialogue

  menuObs:Observable<any>;
  DLGoBS:Observable<any>;

  constructor (private _db:SQLProvider, private _menu:MenuProvider, private _dlg:DialogProvider){}
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

    //tente de recup dans le LS
    let jstr = window.localStorage.getItem("gretasql");
    if(jstr){
        this._db.convertFromJSON(jstr);
    }


    
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
           //nouvelles coords de la table
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

            //recalcule parent height and width
            let maxX=0, maxY =0;
            for(let rel of this._db._db.tables){
                maxX = maxX > rel.coords.x ? maxX : rel.coords.x + 100;
                maxY = maxY > rel.coords.y ? maxY : rel.coords.y + 100;
            }
            //redimensionne l'element conteneur
            this.wrapper.nativeElement.width = maxX;
            this.wrapper.nativeElement.height = maxY;
        
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


    //si l'application decide de quitter, tente de sauvegarder l'etat pour la prochaine fois
  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    // enregistre les datas du formulaire courant???
     this._db.convertToJSON(this.database).then(jstr=>window.localStorage.setItem("gretasql",jstr));
     
  }
    
}
