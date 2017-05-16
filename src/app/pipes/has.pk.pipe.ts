import { Pipe, PipeTransform } from '@angular/core';
import {Table} from "../providers/datas/table";


@Pipe({name: 'has_PK'})
export class HasPrimaryKeyPipe implements PipeTransform {

  transform(table: Table, is_primary:boolean = false): string {
      if (is_primary) return "";

        for(let field of table.fields){
            if(field.primary_key === true) return "invisible";
        }
        return "";
  }
}