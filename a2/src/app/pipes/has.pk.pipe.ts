import { Pipe, PipeTransform } from '@angular/core';
import {Table} from "../providers/datas/table";


@Pipe({name: 'has_PK', pure:false})
export class HasPrimaryKeyPipe implements PipeTransform {

  transform(table: Table): string {
        for(let field of table.fields){
            if(field.primary_key === true) return "invisible";
        }
        return "";
  }
}