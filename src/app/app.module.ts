import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import {DialogModule} from "./dialogs/dialogs.module";
import {SQLModule} from "./sql/sql.module";
import {MenuModule} from "./menus/menu.module";

import {SchemasModule} from "./schemas/schemas.module";


import { AppComponent } from './app.component';


import {appRoutes} from "./routing";
@NgModule({
  declarations: [   
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DialogModule.forRoot(),
    SQLModule.forRoot(),
    MenuModule.forRoot(),
    SchemasModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
