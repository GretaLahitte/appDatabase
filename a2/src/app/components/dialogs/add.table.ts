import {Component, Input} from "@angular/core";
import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
import {DialogProvider} from '../../providers/dialog.provider';
import {DBProvider} from "../../providers/db.provider";

@Component({
    selector:"dlg-addtable",
    templateUrl:"./add.table.html",
    styleUrls:["./add.table.scss",'./global.dialog.scss']
})
export class AddTableDialog {
    table:Table ;
    @Input() coords;
    addfield:boolean = false;//pour savoir quel submit je veut
    add_primary:boolean = true; //si doit creer une clé primaire par defaut 

    error:string = "";

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}
    ngOnInit(){
        this.table = this._db.createEmptyTable();
    }

    process_dialog_form(evt){
        //cree la nouvelle table et ajoute
        //suivant le submit...
        console.log("here")//no process
        this.error = "";
        this.table.coords = this.coords;
        try{
            this._db.add_table(this.table);
            if(this.add_primary) this._db.addFieldTo(new Field({name:"id"}), this.table);
            if(this.addfield){
                //affiche autre boite de dialog
                console.log("add new table and field");
                this._dlg.pushAddFieldDialog(this.table);
                
            } else  this._dlg.clearDialogs();
        } catch(err){
            this.error = err;
        }
        
    }

    cancel(){
        this._dlg.clearDialogs();
    }
}