import {Component} from "@angular/core";
import {DialogProvider} from '../../dialog.provider';
import {SQLProvider} from "../../../sql/sql.provider";
import {WorkerProvider} from "../../../sql/worker.provider";
import {SchemasComponent} from "../../../schemas/schemas";

import Base from "../../../sql/beans/base";


@Component({
    selector:'dlg-projectImport',
    templateUrl:'./project.import.html',
    styleUrls:['global.dialog.scss','project.import.scss']
})

export class ProjectImportDialog{
    isOnlyOne:boolean=true;   //is it a bunch of files or a single file?
    error:string;
    text: string;
    constructor(private _db:SQLProvider, private _dlg:DialogProvider, private _worker:WorkerProvider, private _rlt:SchemasComponent){}
  

  handleDrop(e){                    //drop file event
    e.stopPropagation();
    e.preventDefault();
    var files:File = e.dataTransfer.files; //list of files but only one is required
        
    if(files[1]){               
        this.isOnlyOne=false;
        console.log('Only one file is required!')
    }else{
        let reader=new FileReader();            
        reader.onload = (e)=> {
               this.text=reader.result;
               this._db.convertFromJSON(this.text);   //export data file to new db
               setTimeout(()=>{
                    this._rlt.doUpdateWorkSize();         
                    this._rlt.doUpdateRelationsCoords();             //draw relationship
               },0);
            }
         reader.readAsText(files[0]);
          this._dlg.back();
    }
}

    cancel(){
        this._dlg.back();
    }
}
