/**
 * Le module chargé de l'affichage de la page principale de l'application
 * permettra, quand je voudrais rajoutter des routes, de le faire aussi sous forme de modules
 * 
 */
/**
 * Les providers et beans de données pour le SQL
 * 
 */
import { NgModule, Optional,SkipSelf,
        ModuleWithProviders }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import {MenuModule} from "../menus/menu.module";
import {DialogModule} from "../dialogs/dialogs.module";
import {SQLModule} from "../sql/sql.module";


import {TableComponent} from "./components/tables";
import {FieldComponent} from "./components/field";
import {SchemasComponent} from "./schemas";


import {DBInfosPipe} from "./pipes/db.infos.pipe";
import {BypassCSSPipe} from "./pipes/bypass.css.pipe";
import {Relation2PointsPipe} from "./pipes/relation.to.points.pipe";
import {WidthHeightPipe} from "./pipes/width.height.pipe";




@NgModule({
  imports:      [ CommonModule, FormsModule, MenuModule, DialogModule,  SQLModule],
  declarations: [
    DBInfosPipe,
    BypassCSSPipe,
    Relation2PointsPipe,
    WidthHeightPipe,
    
    TableComponent,
    FieldComponent,
    SchemasComponent],

 exports:[SchemasComponent]
})
export class SchemasModule { 
    

}
