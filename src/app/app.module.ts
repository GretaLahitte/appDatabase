import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {DialogModule} from "../dialogs/dialogs.module";
import {SQLModule} from "../sql/sql.module";

import { AppComponent } from './app.component';
import {TableComponent} from "./components/tables";
import {FieldComponent} from "./components/field";
// import {RelationComponent} from "./components/relation";
import {MenuComponent} from "./components/menu";
import {DialogComponent} from "./components/dialog";


import {DBInfosPipe} from "./pipes/db.infos.pipe";
import {BypassCSSPipe} from "./pipes/bypass.css.pipe";
import {Relation2PointsPipe} from "./pipes/relation.to.points.pipe";
import {HasPrimaryKeyPipe} from "./pipes/has.pk.pipe";
import {FileDownloadPipe} from "./pipes/file.download";
import {PureFieldyPipe} from "./pipes/pure.field.pipe";
import {ExtraTypePipe} from "./pipes/extra.type.pipe";
import {WidthHeightPipe} from "./pipes/width.height.pipe";


import {MenuProvider} from './providers/menu.provider';
import {WorkerProvider} from "./providers/worker.provider";


//import DIALOGS from "./components/dialogs/dialogs";

@NgModule({
  declarations: [
    DBInfosPipe,
    BypassCSSPipe,
    Relation2PointsPipe,
    HasPrimaryKeyPipe,
    FileDownloadPipe,
    PureFieldyPipe,
    ExtraTypePipe,
    WidthHeightPipe,
    
    //...DIALOGS,
    
    AppComponent,
    TableComponent,
    FieldComponent,
    MenuComponent,
    DialogComponent
    // RelationComponent
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
