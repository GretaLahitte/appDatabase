import { Pipe, PipeTransform } from '@angular/core';

const EXTRAS = {
    'LENGTH':['charcacter varying','character','bit','bit varying'],
    'MINMAX':['numeric'],
    //les autres....
}



@Pipe({name: 'extratype'})
export class ExtraTypePipe implements PipeTransform {

  transform(typeName:string): string {
      
    if(!typeName) return "";
    for(let key of Object.keys(EXTRAS)){
        if(EXTRAS[key].indexOf(typeName)>=0) return key;
    }
    return '';
  }
}