import {Component,Input} from "@angular/core";

@Component({
    selector:'svg [relation]',
    template:`<svg stroke-linejoin="round" fill="none" stroke="#3E3E3E" stroke-width:"1" stroke-dasharray="5px 5px"  [attr.points]="relation | relation2points"></svg>`
})
export class RelationComponent{
    @Input() relation;
}