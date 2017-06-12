/**
 * Le module chargé de l'affichage de la page principale de l'application
 * permettra, quand je voudrais rajoutter des routes, de le faire aussi sous forme de modules
 * 
 * SharedModule
 * 
 */
/**
 * Les providers et beans de données pour le SQL
 * 
 */
import { NgModule, Component }           from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import {HeroRoutingModule} from "./test.routing";
import {TestComponent} from "./test.component";

@NgModule({
  imports:      [ SharedModule, HeroRoutingModule],
  declarations: [
      TestComponent
    ],

 exports:[TestComponent]
})
export class TestModule { 
    

}
