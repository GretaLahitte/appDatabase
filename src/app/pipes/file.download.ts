import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({name: 'file_download'})
export class FileDownloadPipe implements PipeTransform {
    constructor(private sanitizer:DomSanitizer){}
  transform(sql: any): any {
        if(!sql) return "";

        return this.sanitizer.bypassSecurityTrustResourceUrl(`data:text/octet-stream;charset:utf-8,`+encodeURIComponent(sql));
  }
}