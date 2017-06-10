/**
 * Un module externe pour gerer les boites de dialogues
 * 
 */
import { NgModule, Optional,SkipSelf,
        ModuleWithProviders }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import {MenuComponent} from "./menu";
import {BypassCSSPipe} from "./pipes/bypass.css.pipe";
import {MenuProvider} from "./menu.provider";


export class MenuConfigService{

}
@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ MenuComponent,BypassCSSPipe ],
  exports:      [ MenuComponent ],
  providers:    [ MenuProvider ]

})
export class MenuModule { 
    /*constructor (@Optional() @SkipSelf() parentModule: MenuModule) {
        if (parentModule) {
            throw new Error(
            'MenuModule is already loaded. Import it in the AppModule only');
        }
    }


    static forRoot(config?: MenuConfigService): ModuleWithProviders {
        return {
            ngModule: MenuModule,
            providers: [
                 {provide: MenuConfigService, useValue: config }
            ]
        };
    }
    */
}
