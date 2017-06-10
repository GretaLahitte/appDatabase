/**
 * Les providers et beans de données pour le SQL
 * 
 */
import { NgModule, Optional,SkipSelf,
        ModuleWithProviders }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import {SQLProvider} from "./sql.provider";


export class SQLConfigService{

}
@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [],
  exports:      [  ],
  providers:    [ SQLProvider ]
})
export class SQLModule { 
    constructor (@Optional() @SkipSelf() parentModule: SQLModule) {
        if (parentModule) {
            throw new Error(
            'CoreModule is already loaded. Import it in the AppModule only');
        }
    }


    static forRoot(config?: SQLConfigService): ModuleWithProviders {
        return {
            ngModule: SQLModule,
            providers: [
                 {provide: SQLConfigService, useValue: config }
            ]
        };
    }

}
