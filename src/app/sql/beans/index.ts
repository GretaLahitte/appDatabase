import {Field} from "./field";




export class Index extends Field{
    
    fields: Array<Field> = [];    
    method:string = "btree";
    index_null:boolean = false;
    null_first:boolean = false;
    
    constructor(args?:any){
        
        super(args);
        args = args || {};
        this.type = "Composite";//par defaut?
        this.fields = args.fields || [];
        this.method = args.method || 'btree';
        this.index_null = args.index_null || false;
        this.null_first = args.null_first || false;
    }
}