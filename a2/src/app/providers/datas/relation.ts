import {generateUUID} from "./utils";

export class Relation{

    id:string;
    from:any;
    to:any;

    constructor(args?:any){
        args = args || {};
        this.id = args.id || generateUUID();

        //va surement falloir recup les objets crées precedement...
        this.from = args.from ;
        this.to = args.to;

    }
}