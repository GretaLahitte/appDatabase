/**
 * Le module chargé de l'affichage de la page principale de l'application
 * permettra, quand je voudrais rajoutter des routes, de le faire aussi sous forme de modules
 * 
 * SharedModule
 * 
 */
/**
 * Les providers et beans de données pour le SQL
 * 
 */
import { NgModule, Optional,SkipSelf,
        ModuleWithProviders }           from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import {TableComponent} from "./components/tables";
import {FieldComponent} from "./components/field";
import {SchemasComponent} from "./schemas";


import {DBInfosPipe} from "./pipes/db.infos.pipe";
//import {BypassCSSPipe} from "./pipes/bypass.css.pipe";
import {Relation2PointsPipe} from "./pipes/relation.to.points.pipe";
import {WidthHeightPipe} from "./pipes/width.height.pipe";




@NgModule({
  imports:      [  SharedModule],
  declarations: [
    DBInfosPipe,
    //BypassCSSPipe,
    Relation2PointsPipe,
    WidthHeightPipe,
    
    TableComponent,
    FieldComponent,
    SchemasComponent],

 exports:[SchemasComponent]
})
export class SchemasModule { 
    

}
