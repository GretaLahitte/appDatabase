import {Field} from "./field";

export class Index extends Field{
    
    fields: Array<Field> = [];    
    method:string = "btree";
    index_null:boolean = false;
    null_first:boolean = false;
    
    constructor(args){
        super(args);
    }
}