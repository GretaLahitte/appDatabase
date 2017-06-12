import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


//var for syntax highlighting
       
const sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DEFAULT|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
const sqlVar=/\b(bigint|bigserial|bit|bit varying|blob|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)(?=[^\w])/g;
const multiLines  = /(\/\*.*\*\/)/g;
const inline=/(--(.+?)\n|--\n)/g;
const quoted=/('(.+)')/g;


@Pipe({name: 'sql_color'})
export class ColorizeSQLPipe implements PipeTransform {
    constructor(private sanitizer:DomSanitizer){}
  transform(sql: any): any {
        if(!sql) return "";
        
            //parse le contenu et cree les trucs associés
            sql = sql.replace(inline,'<span class="multilines" style="color:#aaa">$1</span>');
			sql = sql.replace(sqlVar,'<span class="sqlVar" style="color:#5dc122;">$1</span>');
			sql = sql.replace(sqlCmd,'<span class="sqlCmd" style="color:#1f3eb9;">$1</span>');
			sql = sql.replace(multiLines,'<span class="multilines" style="color:#aaa;">$1</span>');
			sql = sql.replace(quoted,'<span class="quoted" style="color:rgb(255, 134, 0);">$1</span>');
        return this.sanitizer.bypassSecurityTrustHtml(sql);
  }
}