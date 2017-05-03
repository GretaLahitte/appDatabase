import {Component} from "@angular/core";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";
import {WorkerProvider} from "../../providers/worker.provider";


import {Base} from "../../providers/datas/base";


@Component({
    selector:'dlg-export',
    templateUrl:'./export.html',
    styleUrls:['export.scss','global.dialog.scss']
})

export class ExportDialog{

    sql_datas: string;//le resultat de la requete
    error:string;
    name : string;//le nom de la base

    constructor(private _db:DBProvider, private _dlg:DialogProvider, private _worker:WorkerProvider){}
    ngOnInit(){
        //lance le loading...
        let db = this._db._db;
        this.name = db.db_name;
        
        this._worker.process_SQL(db).then((sql:string)=>this.sql_datas = sql)
                                    .catch(err=>this.error = err);

    }

    download_as_file(){
        //permet le download as file du fichier...

    }
    cancel(){
        this._dlg.back();
    }
}