//renvoie un objet associant un type de données a un composant
import {AddTableDialog} from "./dialogs/add.table";
import {AboutDialog} from "./dialogs/about";
import {AddFieldDialog} from "./dialogs/add.field";
import {ShowTableProperties} from "./dialogs/show.table.properties";
import {IndexDialog} from "./dialogs/index";
import {ConstraintDialog} from "./dialogs/constraint";
import {PKDialog} from "./dialogs/add.primary";
import {ExportDialog} from "./dialogs/export";
import {NewBaseDialog} from "./dialogs/new.base";
import {ConfirmDialog} from "./dialogs/confirm";
import {CustomTypeDialog} from "./dialogs/custom.type";

export const mappings= {
    "Base" : NewBaseDialog,
    "Field": AddFieldDialog,
    //et le reste...
    "ADD_TABLE":AddTableDialog,
    "SHOW_TABLE":ShowTableProperties,
    "ADD_FIELD":AddFieldDialog,
    "ABOUT":AboutDialog,
    "ADD_INDEX":IndexDialog,
    "ADD_CONSTRAINT":ConstraintDialog,
    "ADD_PK":PKDialog,
    "EXPORT":ExportDialog,
    "CREATE_BASE":NewBaseDialog,
    "CONFIRM":ConfirmDialog,
    "CREATE_CTYPE":CustomTypeDialog
}