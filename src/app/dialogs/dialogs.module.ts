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

import DIALOGS from "./components/dialogs/dialogs";
import {ExtraTypePipe} from "./pipes/extra.type.pipe";
import {HasPrimaryKeyPipe} from "./pipes/has.pk.pipe";
import {PureFieldyPipe} from "./pipes/pure.field.pipe";
import {FileDownloadPipe} from "./pipes/file.download";


export class DialogConfigService{

}
@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [DialogMainComponent, DynDialogDirective,
                ExtraTypePipe,HasPrimaryKeyPipe,PureFieldyPipe,FileDownloadPipe,
                 ...DIALOGS],
  exports:      [ DialogMainComponent ],
  providers:    [ DialogProvider ],
  entryComponents: [ ...DIALOGS ],

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
