import {Component, Input} from "@angular/core";
import {DBProvider, FIELD_TYPES} from "../../providers/db.provider";
import {DialogProvider} from "../../providers/dialog.provider";
import {NgModel} from "@angular/forms";

import {Table} from "../../providers/datas/table";
import {Field} from "../../providers/datas/field";
import {Enumeration} from "../../providers/datas/enumeration";



@Component({
    selector:"dlg-addfield",
    templateUrl:"./add.field.html",
    styleUrls:['./add.field.scss','./global.dialog.scss']
})
export class AddFieldDialog{
    @Input () table:Table;
    @Input () field:Field;
    tmp:Field;
    
    addfield:boolean = false;//pour savoir quel submit je veut
    error:string = "";

    types = FIELD_TYPES;//les types de field possibles....


    custom_type:Enumeration = new Enumeration();
    make_custom:boolean = false;

    constructor(private _db:DBProvider, private _dlg:DialogProvider){}

    ngOnInit(){
        //this.tmp = new Field({id:null});
    }
    ngOnChanges(dt){
        
        if(dt.field && dt.field.currentValue){ 
            //copy les données necessaires                   
            this.tmp = new Field({});
            this.tmp.copy(dt.field.currentValue)
        } else {
            this.tmp = new Field({id:null});
        }
    }

    process_dialog_form(){
        //cree la nouvelle table et ajoute
        //suivant le submit...
        this.error = "";

        //copy les données du tmp dans le field courant...
        if(!this.field) this.field = new Field({id:null});//genere un id

        //probleme: si modifie PK ET a une relation, une couille
        if((this.field.primary_key && !this.tmp.primary_key) ||(this.field.unique && !this.field.unique)){
            //verifie les relations 
            for(let r of this._db._db.relations){
                if(r.from.field == this.field){
                    this.error = "Impossible to update Field: to remove primary key ot unique constraint, you must first delete all relations to this field";
                    return;
                }
            }
        }
        //si numeric, custom valid 
        if(this.tmp.type == "numeric"){
            let prec = this.tmp.type_extras.precision;
            let sc = this.tmp.type_extras.scale;

            if(sc){
                if(!prec){
                    this.tmp.type_extras.scale = null;//xupprime, ne veut rien dire
                } else {
                    if(sc > prec){
                        this.error = "Error on Inconsistant datas: Scale must be lower than Precision!";
                        return;
                    }
                }
            }
        }





        this.field.copy(this.tmp);

        // console.log(this.field);

        //mise a jour???
        try{

            if(this.make_custom){
                //cree un nouveau type 
                //verifie les noms et validité
                //si ok, cree un nouveau type
                this._db.addDataType (this.custom_type);//si erreur, youpi...
                this.field.type = this.custom_type.key;//enregistre

            }
            // console.log("Ajoute un champs?")
            if(!this.field.id) {
                
                //sinon, ajoute le nouveau field...
                this._db.addFieldTo(this.field, this.table);
                if(this.addfield){
                    this.addfield = false;
                    //affiche autre boite de dialog
                    // console.log("add new field");
                    this.field = null;
                    this.tmp = new Field({id:null});
                    this.custom_type = new Enumeration();
                    return;

                }   
            } else {
                //verifie si appartient a une relation           A VOIR?
                let is_unique = this.field.unique || this.field.primary_key;                
                let has_rel = false;
                
                console.log("Verifie les types dans les relations")
                for(let rel of this._db._db.relations){
                    let ff = rel.from.field;
                    let tf = rel.to.field;

                    if(ff == this.field){
                        has_rel = true;
                        console.log("change type")
                        tf.type = this.field.type;

                    } else if(tf == this.field){
                        has_rel = true;
                        console.log("change type")
                        ff.type = this.field.type;
                    }
                }
                if(!is_unique && has_rel) this.field.unique = true;//force it!
            }
            this._dlg.clearDialogs();
        } catch(err){
            this.error = err;
            this.addfield = false;//remet par defaut
        }
        
    }


    
    cancel(){
        this._dlg.clearDialogs();
    }
}