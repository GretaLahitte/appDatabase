import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {DialogModule} from "./dialogs/dialogs.module";
import {SQLModule} from "./sql/sql.module";
import {MenuModule} from "./menus/menu.module";



import { AppComponent } from './app.component';
import {TableComponent} from "./components/tables";
import {FieldComponent} from "./components/field";
// import {RelationComponent} from "./components/relation";


import {DBInfosPipe} from "./pipes/db.infos.pipe";
import {BypassCSSPipe} from "./pipes/bypass.css.pipe";
import {Relation2PointsPipe} from "./pipes/relation.to.points.pipe";
import {WidthHeightPipe} from "./pipes/width.height.pipe";



@NgModule({
  declarations: [
    DBInfosPipe,
    BypassCSSPipe,
    Relation2PointsPipe,
    WidthHeightPipe,
    
    //...DIALOGS,
    
    AppComponent,
    TableComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DialogModule.forRoot(),
    SQLModule.forRoot(),
    MenuModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
