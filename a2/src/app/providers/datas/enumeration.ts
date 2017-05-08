export class Enumeration{
    key:string;//la clé unique 
    values:string;//les valeurs possibles


    constructor( args?:any){
        args = args || {};
        this.key = args.key;
        this.values = args.values;
        
    }
}