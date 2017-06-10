/**
 * Informations sur la base actuellement affichée 
 * 
 */

import {generateUUID} from "../utils";

export default class Base{

    uuid:string; // identifiant unique de la base
    name: string; //le nom de la base de données
    host: string;// host de la base, par defaut 127.0.0.1
    user: string;//nom d'utilisateur pour la connection
    passwrd:string;//mot de passe pour l'utilisateur
    port:number;//un port pour la connection

    type:string;//le type de base de données: POSTGRES, MYSQL, MONGO...

    //une base est constituée de table, d'extention (si postgres), d'enum (custom type) et de relations
    tables:Array<any> = [];
    relations:Array<any> = [];
    custom_types:Array<any> = [];
    extentions:Array<string> = [];


    constructor(args?:any){
        //initialisation de la base
        args = args || {};

        //par defaut, configure la connection pour une base postgresql
        this.name = args.name || "nom_de_la_base",
        this.type = args.type || "postgres",//ou mysql, mongo....
        this.port = this.port || 5432,
        this.host = args.host || "127.0.0.1",
        this.user = args.user || "loginUtilisateur",
        this.passwrd = args.passwrd || "passwordUtilisateur";

        //a voir...
        this.tables = args.tables || [];
        this.relations = args.relations || [];

    }

}