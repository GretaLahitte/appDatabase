/**
 * Informations sur la base actuellement affichée 
 * 
 */

import {generateUUID} from "../utils";
import {Field} from "./field";
import {Index} from "./index";
import {Enumeration} from "./enumeration";
import Table from "./table";
import {Relation} from "./relation";

export default class Base{

    uuid:string; // identifiant unique de la base
    file_url: string;//@Deprecated: se servira d'un serveur web
    db_name: string;
    db_type: string;
    db_port: number;
    host: string;
    login: string;
    passwrd: string;
    type:string;//le type de base de données: POSTGRES, MYSQL, MONGO...

    //une base est constituée de table, d'extention (si postgres), d'enum (custom type) et de relations
    tables:Array<Table> = [];
    relations:Array<Relation> = [];
    custom_types:Array<Enumeration> = [];
    extentions:Array<string> = [];
    enumerations:Array<Enumeration> = [];

    constructor(args?:any){
        
        args = args || {};
        this.file_url = args.file_url || 'a/path',//chemin vers le fichier sql/dump ou enregistrer
        this.db_name = args.db_name || "nom_de_la_base",
        this.db_type = args.db_type || "postgres",//ou mysql, mongo....
        this.db_port = this.db_port || 5432,
        this.host = args.host || "127.0.0.1",
        this.login = args.login || "loginUtilisateur",
        this.passwrd = args.passwrd || "passwordUtilisateur";

        //a voir...
        this.tables = args.tables || [];
        this.relations = args.relations || [];
    
    }

}