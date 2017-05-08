import { Pipe, PipeTransform } from '@angular/core';
import {Field} from "../providers/datas/field";


@Pipe({name: 'pure_fields'})
export class PureFieldyPipe implements PipeTransform {

  transform(fields: Array<Field>): Array<Field> {
      
    let pures=[];
        for(let field of fields){
            if(field.type !== "Composite") pures.push(field);
        }
        return pures;
  }
}