import {Component, Input} from "@angular/core";
import {MenuProvider} from "../providers/menu.provider";


@Component({
    selector:"menu-cmp",
    templateUrl:"./menu.html",
    styleUrls:['./menu.scss']
})
export class MenuComponent{
    @Input() descriptor;
    
    constructor(private _menu:MenuProvider){}

    onClick(action){
        //suivant l'action a realiser, voit quoi faire....
       
        this._menu.process_menu(action, this.descriptor.target, this.descriptor.coords);
    }
}