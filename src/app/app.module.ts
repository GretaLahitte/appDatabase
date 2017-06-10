import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {DialogModule} from "./dialogs/dialogs.module";
import {SQLModule} from "./sql/sql.module";

import { AppComponent } from './app.component';
import {TableComponent} from "./components/tables";
import {FieldComponent} from "./components/field";
// import {RelationComponent} from "./components/relation";
import {MenuComponent} from "./components/menu";


import {DBInfosPipe} from "./pipes/db.infos.pipe";
import {BypassCSSPipe} from "./pipes/bypass.css.pipe";
import {Relation2PointsPipe} from "./pipes/relation.to.points.pipe";
import {WidthHeightPipe} from "./pipes/width.height.pipe";


import {MenuProvider} from './providers/menu.provider';
import {WorkerProvider} from "./providers/worker.provider";


//import DIALOGS from "./components/dialogs/dialogs";

@NgModule({
  declarations: [
    DBInfosPipe,
    BypassCSSPipe,
    Relation2PointsPipe,
    WidthHeightPipe,
    
    //...DIALOGS,
    
    AppComponent,
    TableComponent,
    FieldComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DialogModule.forRoot(),
    SQLModule.forRoot()
  ],
  providers: [ MenuProvider, WorkerProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
