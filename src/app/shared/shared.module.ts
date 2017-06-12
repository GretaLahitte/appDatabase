import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MenuModule }          from "../menus/menu.module";
import { DialogModule }        from "../dialogs/dialogs.module";
import { RouterModule }             from "@angular/router";


import { BypassCSSPipe } from "./bypass.css.pipe";

/*
import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';
*/
@NgModule({
  imports:      [ CommonModule ],
  declarations: [ BypassCSSPipe ],
  exports:      [ MenuModule, DialogModule,
                  CommonModule, FormsModule, RouterModule,
                  BypassCSSPipe ]
})
export class SharedModule { }