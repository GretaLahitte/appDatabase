import {Field} from "./field";

export class Index{
    name:string ;
    fields: Array<Field> = [];
    is_unique:boolean = false;
    method:string = "btree";
}