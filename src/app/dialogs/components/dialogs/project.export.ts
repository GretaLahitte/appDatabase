import {Component} from "@angular/core";
import {DialogProvider} from '../../dialog.provider';
import {SQLProvider} from "../../../sql/sql.provider";
import {WorkerProvider} from "../../../sql/worker.provider";


import Base from "../../../sql/beans/base";


@Component({
    selector:'dlg-projectExport',
    templateUrl:'./project.export.html',
    styleUrls:['export.scss','global.dialog.scss']
})

export class ProjectExportDialog{
    project:string;//le resultat de la requete
    error:string;
    name : string;//le nom de la base

    constructor(private _db:SQLProvider, private _dlg:DialogProvider, private _worker:WorkerProvider){}
    ngOnInit(){
        //lance le loading...
        let db = this._db._db;
        this.name = db.db_name;
		
        this._db.convertToJSON(db).then( (jstr)=>{
			//the json project code
			this.project = jstr;
			
		}).catch(err=>this.error = err);

    }

    download_as_file(){
        //permet le download as file du fichier...

    }
    cancel(){
        this._dlg.back();
    }
}
