import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
//import {DBProvider} from './providers/db.provider';
//import {DialogProvider} from "./providers/dialog.provider";
import {MenuProvider} from "../menus/menu.provider";


import {SQLProvider} from "../sql/sql.provider";
import {DialogProvider} from "../dialogs/dialog.provider";


import Base from "../sql/beans/base";
import Table from "../sql/beans/table";

import {Observable} from "rxjs/Observable";


// import {ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";

@Component({
  selector: 'schemas-page',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss'],
  
  
})
export class SchemasComponent {
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


  work_size:any = {width:0,height:0};//la taille de la zone de travaille, a mettre a jour avec les deplacements des tables

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
        
    } else  this._db.loadDummyBase();
    

    
  }

  ngAfterViewInit(){
    console.log("AfterView Init")
    //force le tick
    setTimeout(()=>{
      this.doUpdateWorkSize();
      this.doUpdateRelationsCoords();
    },0);
    
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
           let c = {x:evt.clientX + this.shift_left,
                            y:evt.clientY + this.shift_top};
           //nouvelles coords de la table
            __cible.coords = c;
            
          //verifie si doit mettre a jour la taille de la zone de travaille
          this.doUpdateWorkSize(__cible);
          this.doUpdateRelationsCoordsForTable(__cible);
         }
        
    }


    //YOUPI: permet de ne pas recalculer a chaque tick la taille du SVG!!!!
         doUpdateWorkSize(include_table?:Table){
      if(include_table){
        //juste une mise a jour au besoin
        let maxX = this.work_size.width, maxY = this.work_size.height;
        let c = include_table.elem.nativeElement.getBoundingClientRect();
        let mx = c.right + window.scrollX;
        let my = c.bottom + window.scrollY;
      
        if(mx>maxX || my>maxY){
           maxX = mx > maxX ? mx : maxX;
            maxY = my > maxY ? my : maxY;
          this.work_size = {
            width:maxX+50,
            height:maxY+50
          }
        }



      } else {
        //recalcule tout
        let tables = this._db._db.tables;
        if(!tables || tables.length<1) return;//rien a faire, laisse 100%


        let maxX = 0, maxY = 0;
        for (let table of tables){
            if(!table.elem) continue;

            let c = table.elem.nativeElement.getBoundingClientRect();
            let mx = c.right + window.scrollX;
            let my = c.bottom + window.scrollY;
          
            maxX = mx > maxX ? mx : maxX;
            maxY = my > maxY ? my : maxY;

            
        }
        maxX = maxX < window.innerWidth ? window.innerWidth : maxX;
            maxY = maxY < window.innerHeight ? window.innerHeight : maxY;

        //enregistre les informations de taille de l'ecran
        this.work_size = {
          width: maxX,
          height: maxY
        }
        //return this.sanitizer.bypassSecurityTrustStyle(`width:${maxX}px; height:${maxY}px;`);

      }
    }


    private doUpdateRelationsCoordsForTable(table:Table){
      for (let r of this._db._db.relations){

          if(r.from.table == table || r.to.table == table){
              //met a jour
              //recup les infos de position
              let fromElem = r.from.field;
              let toElem = r.to.field;
              if(!fromElem.__elem || !toElem.__elem){   
                console.log("pas encore de rendu...");          
                  return; //pas encore rendu        
              }
              let e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
              let e2 = toElem.__elem.nativeElement.getBoundingClientRect();
              

              //calcule le centre des elements
              let rc = {
                  x: e1.width/2 + e1.left ,
                  y: e1.height/2 + e1.top,
              
                  x2: e2.width/2 + e2.left,
                  y2: e2.height/2 + e2.top 
              }
              
              r.coords = rc;
          }
      }
    }
     doUpdateRelationsCoords(){
      console.log("Calcule des relations entre tables...")
      //calcule les coordonnées pour toutes les relations de la base
      for(let r of this._db._db.relations){

        //recup les infos de position
        let fromElem = r.from.field;
        let toElem = r.to.field;
         if(!fromElem.__elem){   
           console.log("pas encore de rendu...")          
            return; //pas encore rendu        
        }
        let e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
        let e2 = toElem.__elem.nativeElement.getBoundingClientRect();
        

        //calcule le centre des elements
        let rc = {
            x: e1.width/2 + e1.left ,
            y: e1.height/2 + e1.top,
        
            x2: e2.width/2 + e2.left,
            y2: e2.height/2 + e2.top 
        }
        
        r.coords = rc;
        


      }
      
    }
    
    /**
     * Event au mouse up: supprime les events au documnt et 
     * relache la cible 
     * @param evt: MouseUpEvent
     */
    stop_drag(evt){
        if(this.selectedTable){
          this.selectedTable = null;
            /*let __cible = this.selectedTable;
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
            */
        }
        
    }
    setNewRelation(evt){
      console.log("update relations")
      setTimeout(()=>this.doUpdateRelationsCoordsForTable(evt.table), 100);
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
