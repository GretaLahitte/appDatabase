import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dbinfos'})
export class DBInfosPipe implements PipeTransform {

  transform(db: any): any {
        if(!db) return "Aucune infos";

        return `${db.db_type}://${db.login}:${db.passwrd}@${db.host}:${db.db_port}/${db.db_name}`;
  }
}