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


    constructor(private _db:DBProvider, private _dlg:DialogProvider, private _worker:WorkerProvider){}
    ngOnInit(){
        //lance le loading...
        let db = this._db._db;
        this._worker.process_SQL(db).then((sql:string)=>this.sql_datas = sql)
                                    .catch(err=>this.error = err);

    }
    cancel(){
        this._dlg.back();
    }
}