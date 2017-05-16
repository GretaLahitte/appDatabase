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
        
		//var for syntax highlighting
        var codeElement = document.getElementById('colored');
       
        var sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DEFAULT|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
		var sqlVar=/\b(bigint|bigserial|bit|bit varying|blob|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)(?=[^\w])/g;
		var multiLines  = /(\/\*.*\*\/)/g;
		var inline=/(--(.+?)\n|--\n)/g;
		var quoted=/('(.+)')/g;
		
		
        this._db.convertToJSON(db).then( (jstr)=>{
          return this._worker.process_SQL(jstr);
        }).then((sql:string)=>{
			//the sql code
			this.sql_datas = sql;
			//the sql syntax highlighted
			sql=sql.replace(inline,'<span class="multilines" style="color:#aaa">$1</span>');
			sql = sql.replace(sqlVar,'<span class="sqlVar" style="color:#5dc122;">$1</span>');
			sql = sql.replace(sqlCmd,'<span class="sqlCmd" style="color:#1f3eb9;">$1</span>');
			sql = sql.replace(multiLines,'<span class="multilines" style="color:#aaa;">$1</span>');
			sql = sql.replace(quoted,'<span class="quoted" style="color:rgb(255, 134, 0);">$1</span>');
			
			codeElement.innerHTML = sql;			
		})
        .catch(err=>this.error = err);

    }

    download_as_file(){
        //permet le download as file du fichier...

    }
    cancel(){
        this._dlg.back();
    }
}
