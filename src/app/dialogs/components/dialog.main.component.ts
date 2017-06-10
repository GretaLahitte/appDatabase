import {Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver} from "@angular/core";
import {mappings} from "./dialog";
import {DynDialogDirective} from "../dyn.dialogs.directive";


import {SQLProvider} from "../../sql/sql.provider";
import {DialogProvider} from "../dialog.provider";


@Component({
    selector:"sql-dlg",
    template:`
        <div class="modal" (contextmenu)="skip($event)">
            <div class="modal-content  shadowed">
            <h2>{{descriptor.title}}</h2>
            <p>{{descriptor.texte}}</p>
            <div [ngSwitch]="descriptor.type">
                <dlg-addtable *ngSwitchCase="'ADD_TABLE'" [coords]="descriptor.coords"></dlg-addtable>
                <dlg-addfield *ngSwitchCase="'ADD_FIELD'" [table]="descriptor.target" [field]="descriptor.field"></dlg-addfield>
                <dlg-about *ngSwitchCase="'ABOUT'"></dlg-about>
                <dlg-tableprops *ngSwitchCase="'SHOW_TABLE'" [table]="descriptor.target"></dlg-tableprops>
                <dlg-index *ngSwitchCase="'ADD_INDEX'" [table]="descriptor.target.table" [field]="descriptor.target.index"></dlg-index>
                <dlg-constraint *ngSwitchCase="'ADD_CONSTRAINT'" [table]="descriptor.target" [cnt]="descriptor.constraint"></dlg-constraint>
                <dlg-pk *ngSwitchCase="'ADD_PK'" [table]="descriptor.target?.table || descriptor.target " [field]="descriptor.target?.pk"></dlg-pk>
                <dlg-export *ngSwitchCase="'EXPORT'"></dlg-export>
                <dlg-newbase *ngSwitchCase="'CREATE_BASE'" [editable]="descriptor.target"></dlg-newbase>
                <dlg-confirm *ngSwitchCase="'CONFIRM'" [next]="descriptor.next" [target]="descriptor.target"></dlg-confirm>
                <dlg-customtype *ngSwitchCase="'CREATE_CTYPE'" [enumeration]="descriptor.target"></dlg-customtype>
                <div *ngSwitchDefault>
            Oups!
        </div>
    </div>
        </div>
    </div>
            
    `,
    styles:[
      `
/* Modal dialog */
/* The Modal (background) */
.modal {
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow-x: hidden; /* Enable scroll if needed */
    overflow-y:auto;
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 50%; /* Could be more or less, depending on screen size */
    background-color: #fbfbfb;
    color:#3E3E3E;
    border-radius: 10px;
}
.modal-content > h2{
    font-size: 1.2em;
    text-transform: uppercase;
}
.modal-content > p {
    text-align: justify;
}
.modal-content > content {
    margin: 10px 0;
}
.ok{
    background: #3498db;
  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
  background-image: -moz-linear-gradient(top, #3498db, #2980b9);
  background-image: -ms-linear-gradient(top, #3498db, #2980b9);
  background-image: -o-linear-gradient(top, #3498db, #2980b9);
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  
}
.ok:hover{
background: #3cb0fd;
  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  
}
.warn {
    background: #c6d934;
  background-image: -webkit-linear-gradient(top, #c6d934, #9ea628);
  background-image: -moz-linear-gradient(top, #c6d934, #9ea628);
  background-image: -ms-linear-gradient(top, #c6d934, #9ea628);
  background-image: -o-linear-gradient(top, #c6d934, #9ea628);
  background-image: linear-gradient(to bottom, #c6d934, #9ea628);
}
.warn:hover {
    background: #e6fc3c;
  background-image: -webkit-linear-gradient(top, #e6fc3c, #ced934);
  background-image: -moz-linear-gradient(top, #e6fc3c, #ced934);
  background-image: -ms-linear-gradient(top, #e6fc3c, #ced934);
  background-image: -o-linear-gradient(top, #e6fc3c, #ced934);
  background-image: linear-gradient(to bottom, #e6fc3c, #ced934);
}`]
})
export class DialogMainComponent{//} implements AfterViewInit {
  @Input() descriptor:any;//l'objet a charger

  constructor(private _db:SQLProvider, private _dlg:DialogProvider){}

    
    skip(evt){
        evt.preventDefault();
        evt.stopPropagation();
    }
/*
  @ViewChild(DynDialogDirective) dynDialog:DynDialogDirective;
  subscription: any;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponent();
   
  }

  ngOnChanges(dt){
      //modifie le componsant
      if(dt.cible){
       //   this.loadComponent();
      }
  }
  

  loadComponent() {
    //suivant le type de données, choisi la dialog necessaire
    console.log("test");
    if(!this.cible) return;
    console.log("test2");


    let type = this.cible.type;//un type sous forme de string

    let cmp = mappings[type];
    
    if(cmp === undefined) return;
    
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(cmp);
    
    let viewContainerRef = this.dynDialog.viewContainerRef;
    viewContainerRef.clear();//supprime tout si besoin

    let componentRef = viewContainerRef.createComponent(componentFactory);
    //passe la donnée
    //(<AdComponent>componentRef.instance).data = adItem.data;
  }
*/
}