import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {DialogProvider} from "../providers/dialog.provider";
import {DBProvider} from "../providers/db.provider";
/**
 * Chargée de créer les descripteurs de menus pour l'application
 */
@Injectable()
export class MenuProvider{

    menu:Subject<any> = new Subject<any>();
    constructor(private _dlg:DialogProvider,  private _db:DBProvider){}

    getMenuObservable():Observable<any>{
        return this.menu.asObservable();
    }

    clearMenus(){
        this.menu.next(null);
    }
    pushTableContextMenu(target:any, coords){
        
        let desc = {
            target: target,
            coords:coords,
            menus:[
                {
                    label:"Show Properties",
                    icon:"settings",
                    action:"SHOW_PROPS"
                },
                {
                    label:"Add Field",
                    icon:"playlist_add",
                    action:"ADD_PROPS"
                },
                {
                    label:"Add Composite PK",
                    icon:"vpn_key",
                    action:"ADD_PK",
                    enabled: target.hasPK()
                },
                {
                    label:"Add Composite Index",
                    icon:"format_list_numbered",
                    action:"ADD_INDEX"
                },
                {
                    label:"Add Table Constraint",
                    icon:"report",
                    action:"ADD_CONSTRAINT"
                },
                {
                    label:"Delete Table",
                    icon:"delete",
                    action:"DELETE",
                    
                        title:"Confirm table Deletion?",
                        message:"Deleting this table blablablab blablabla",
                        next:this._db.removeTable,
                        
                    
                }
            ]
        };

        this.menu.next(desc);
    }

    pushMainContextMenu(target,coords){
        let desc = {
            target: target,
            coords:coords,
            menus:[
                {
                    action:"new_table",
                    icon:"insert_drive_file",
                    label:"New TABLE"
                },
                
                {
                    action:"export_sql",
                    icon:"file_upload",
                    label:"Export SQL"
                },
                {
                    action:"new_base",
                    icon:"folder",
                    label:"New BASE"
                },
                {
                    action:"edit_base",
                    icon:"storage",
                    label:"Base Properties"
                },
                {
                    action:"about",
                    icon:"info",
                    label:"About SQLTool"
                }
            ]
        };

        this.menu.next(desc);
    }


    process_menu(item, target, coords){
        switch(item.action){
            case 'new_table':{
                //affiche dialogue nouvelle table 
                this._dlg.pushAddTableDialog(coords);
                break;
            }
            case 'ADD_PROPS':{
                //affiche dialogue nouvelle table 
                this._dlg.pushAddFieldDialog(target);
                break;
            }
            case 'ADD_INDEX':{
                //affiche dialogue nouvelle table 
                this._dlg.pushIndexDialog(target);
                break;
            }
            case 'ADD_PK':{
                //affiche dialogue nouvelle table 
                this._dlg.pushPKDialog(target, null);
                break;
            }
            case 'export_sql':{
                this._dlg.pushExportDialog();
                break;
            }
            case 'ADD_CONSTRAINT':{
                //affiche dialogue nouvelle table 
                this._dlg.pushConstraintDialog(target);
                break;
            }
            case 'SHOW_PROPS':{
                this._dlg.pushShowTableProperties(target);
                break;
            }
            case 'about':{
                //affiche dialogue nouvelle table 
                this._dlg.pushAboutDialog();
                break;
            }
            case "new_base":{
                this._dlg.pushNewBaseDialog();
                break;
            }
            case "edit_base":{
                this._dlg.pushEditBaseDialog();
                break;
            }
            case 'DELETE':{
                console.log(item)
                this._dlg.pushConfirmDialog(item.title, item.message,target, item.next);
                break;
            }
        }
    }
}