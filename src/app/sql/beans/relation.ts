import {generateUUID} from "./utils";

export class Relation{

    id:string;
    from:any;
    to:any;

    //coordonnées pour la polyline
    coords = {
        x:0,
        y:0,
        x2:0,
        y2:0
    };

    constructor(args?:any){
        args = args || {};
        this.id = args.id || generateUUID();

        //va surement falloir recup les objets crées precedement...
        this.from = args.from ;
        this.to = args.to;

        
    }
}