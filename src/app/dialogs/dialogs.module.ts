/**
 * Un module externe pour gerer les boites de dialogues
 * 
 */
import { NgModule, Optional,SkipSelf,
        ModuleWithProviders }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import {DynDialogDirective} from "./dyn.dialogs.directive";
import {DialogProvider} from "./dialog.provider";
import {DialogMainComponent} from "./components/dialog.main.component";

import {DialogBase} from "./components/dialog.base";
import {DialogField} from "./components/dialgo.field";


export class DialogConfigService{

}
@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [DialogMainComponent, DynDialogDirective, DialogBase, DialogField],
  exports:      [ DialogMainComponent ],
  providers:    [ DialogProvider ],
  entryComponents: [ DialogBase, DialogField ],

})
export class DialogModule { 
    constructor (@Optional() @SkipSelf() parentModule: DialogModule) {
        if (parentModule) {
            throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
        }
    }


    static forRoot(config?: DialogConfigService): ModuleWithProviders {
        return {
            ngModule: DialogModule,
            providers: [
                 {provide: DialogConfigService, useValue: config }
            ]
        };
    }

}
