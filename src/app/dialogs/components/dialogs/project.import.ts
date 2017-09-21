import {Component} from "@angular/core";
import {DialogProvider} from '../../dialog.provider';
import {SQLProvider} from "../../../sql/sql.provider";
import {WorkerProvider} from "../../../sql/worker.provider";


import Base from "../../../sql/beans/base";


@Component({
    selector:'dlg-projectImport',
    templateUrl:'./project.import.html',
    styleUrls:['global.dialog.scss','project.import.scss']
})

export class ProjectImportDialog{
   
    error:string;
    text: string;
    constructor(private _db:SQLProvider, private _dlg:DialogProvider, private _worker:WorkerProvider){}
   

  handleDrop(e){
    e.stopPropagation();
    e.preventDefault();
    var files:File = e.dataTransfer.files;
        
    if(files[1]){
        console.log('Only one file is required!')
    }else{    
        let reader=new FileReader();
        reader.onload = (e)=> {
               this.text=reader.result;
               this._db.convertFromJSON(this.text);
            }
    reader.readAsText(files[0]);
    this._dlg.back();
    }
}

    cancel(){
        this._dlg.back();
    }
}
