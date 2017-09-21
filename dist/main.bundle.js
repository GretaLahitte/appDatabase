webpackJsonp([0,3],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogProvider; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Chargée de créer les descripteurs de dialogues pour l'application
 */
var DialogProvider = (function () {
    function DialogProvider() {
        this.dlg = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._history = [];
    }
    DialogProvider.prototype.getDialogObservable = function () {
        return this.dlg.asObservable();
    };
    //supprime toute la liste des dialogues et supprime de l'ecran
    //supprime aussi l'historique au cas ou...
    DialogProvider.prototype.clearDialogs = function () {
        this._history = []; //vide l'historique
        this.dlg.next(null);
    };
    //revient dans l'historique un coup en arriere
    //si plus de données dans l'historique, supprime la boite de dialogue
    DialogProvider.prototype.back = function () {
        var last = null;
        if (this._history.length > 0) {
            //pop les 2 derniers
            this._history.pop(); //actuel
            last = this._history[this._history.length - 1];
        }
        this.dlg.next(last);
    };
    //push une nouvelle dialogue à l'ecran
    //ajoute la dialogue courante (si existe) dans l'historique
    DialogProvider.prototype.next = function (dlg) {
        this._history.push(dlg);
        this.dlg.next(dlg);
    };
    //Juste pour les tests
    DialogProvider.prototype.pushDummyDialog = function () {
        var desc = {
            title: "test",
            texte: "un text de test",
            commands: [
                {
                    label: "OK",
                    action: "OK"
                }
            ]
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushAddTableDialog = function (coords) {
        if (coords === void 0) { coords = { x: 0, y: 0 }; }
        var desc = {
            title: "Add Table",
            texte: "Add a new table to the database",
            type: "ADD_TABLE",
            coords: coords,
            commands: [
                {
                    label: "Add Table",
                    action: "ADD"
                },
                {
                    label: "Add Table & create field",
                    action: "ADD_FIELD"
                }
            ]
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushShowTableProperties = function (target) {
        var desc = {
            title: "Table Properties",
            texte: "table properties...",
            type: "SHOW_TABLE",
            target: target
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushAddFieldDialog = function (target, field) {
        var desc = null;
        if (field) {
            desc = {
                title: "Edit Field",
                texte: "Edit field datas",
                type: "ADD_FIELD",
                target: target,
                field: field
            };
        }
        else {
            desc = {
                title: "Add Field",
                texte: "Add a new Field to the table",
                type: "ADD_FIELD",
                target: target,
            };
        }
        this.next(desc);
    };
    DialogProvider.prototype.pushAboutDialog = function () {
        var desc = {
            title: "About",
            texte: "Greta SQLTool v1.0",
            type: "ABOUT",
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushIndexDialog = function (target, index) {
        var desc = {
            title: index ? "Edit Index" : "Add Index",
            texte: index ? "Edit your index" : "Add an index to the table",
            type: "ADD_INDEX",
            target: {
                table: target,
                index: index
            }
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushConstraintDialog = function (target, constraint) {
        var desc = {
            title: "Add Constraint",
            texte: "Add a constraint to the table",
            type: "ADD_CONSTRAINT",
            target: target,
            constraint: constraint
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushPKDialog = function (target, pk) {
        var desc = {
            title: pk ? "Edit Primary Key" : "Add Primary Key",
            texte: pk ? "Edit primary key" : "Add a primary key to the table",
            type: "ADD_PK",
            target: target,
            pk: pk
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushNewBaseDialog = function () {
        var desc = {
            title: "Create a new Base",
            texte: "Create a new base",
            type: "CREATE_BASE",
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushConfirmDialog = function (title, message, target, next) {
        var desc = {
            title: title,
            texte: message,
            type: "CONFIRM",
            //action a realiser...
            target: target,
            next: next
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushExportDialog = function () {
        var desc = {
            title: "Export your base",
            texte: "Export your base to  SQL",
            type: "EXPORT"
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushProjectExportDialog = function () {
        var desc = {
            title: "Time to back up your work.",
            texte: "Export your project to a json file",
            type: "PROJECT_EXPORT"
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushProjectImportDialog = function () {
        var desc = {
            title: "Open a project.",
            texte: "Import your project from a json file",
            type: "PROJECT_IMPORT"
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushEditBaseDialog = function (target) {
        var desc = {
            title: "Base Properties",
            texte: "Edit and change base properties, but take care...",
            type: "CREATE_BASE",
            target: target || {}
        };
        this.next(desc);
    };
    DialogProvider.prototype.pushCustomTypeDialog = function (target) {
        var desc = {
            title: "Custom Types",
            texte: "Edit custom types enumeration for the base",
            type: "CREATE_CTYPE",
            target: target
        };
        this.next(desc);
    };
    return DialogProvider;
}());
DialogProvider = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DialogProvider);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/dialog.provider.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__beans_base__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__beans_field__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__beans_relation__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__beans_index__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__beans_enumeration__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__beans_utils__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FIELD_TYPES; });
/* unused harmony export COLUMN_CONSTRAINTS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SQLProvider; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var FIELD_TYPES = [
    "bigint", "bigserial", "bit", "bit varying", "blob", "boolean", "box", "bytea",
    "character varying", "character", "cidr", "circle", "date", "double precision",
    "inet", "integer", "interval", "line", "lseg", "macaddr", "money", "numeric",
    "path", "point", "polygon", "real", "smallint", "serial", "text", "time", "time with timezone",
    "timestamp", "timestamp (TZ)", "tsquery", "tsvector", "txid_snapshot", "uuid", "xml"
];
var COLUMN_CONSTRAINTS = [
    "NOT NULL", "UNIQUE", "PRIMARY KEY",
];
var SQLProvider = SQLProvider_1 = (function () {
    function SQLProvider() {
        this.db_subject = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
    }
    SQLProvider.prototype.setCurrentBase = function (base) {
        //validation de la base...
        this._db = base; //previent?
        this.db_subject.next(base);
    };
    SQLProvider.prototype.loadDummyBase = function () {
        //cree une base toute simple pour les tests...
        //le field pour l'ID client de la table 1
        var _db = new __WEBPACK_IMPORTED_MODULE_1__beans_base__["a" /* default */]({
            //qqs infos d'ordre generales sur la base elle meme et l'utilisateur
            file_url: 'a/path',
            db_name: "nom_de_la_base",
            db_type: "postgres",
            db_port: 5432,
            host: "host",
            login: "loginUtilisateur",
            passwrd: "passwordUtilisateur",
        });
        //ne crée qu'une seule table avec des explications
        var table = new __WEBPACK_IMPORTED_MODULE_2__beans_table__["a" /* default */]({
            name: "GretaSQLTool",
            coords: {
                x: 400,
                y: 200
            },
            comment: "Thank's for using GretaSQLTool! Click on the burger menu overthere to access table context and add fields, constraints... or anywhere to access main context menu and add new tables or export to sql file",
            fields: [
                new __WEBPACK_IMPORTED_MODULE_3__beans_field__["a" /* Field */]({
                    name: "a_simple_field",
                    comment: "This is a simple field, click on the arrow to get the context menu and edit it's properties"
                }),
                new __WEBPACK_IMPORTED_MODULE_3__beans_field__["a" /* Field */]({
                    name: "a_simple_id",
                    comment: "This is a primary key, there can only be one, and it's UNIQUE, so you can drag it to another table to make a relation between them",
                    primary_key: true,
                }),
                new __WEBPACK_IMPORTED_MODULE_3__beans_field__["a" /* Field */]({
                    name: "a_simple_index",
                    comment: "This is a index, there can be as much as you want, and IF UNIQUE, you can drag it to another table to make a relation between them",
                    index: true
                }),
            ]
        });
        //END DUMMY DATAS
        _db.tables = [
            table,
        ];
        //ajoute les liens 
        this._db = _db;
        this.db_subject.next(_db);
    };
    SQLProvider.prototype.createEmptyTable = function () {
        return new __WEBPACK_IMPORTED_MODULE_2__beans_table__["a" /* default */]({});
    };
    /**
    * ajoute une nouvelle table a la base, verifie la validité des données...
    */
    SQLProvider.prototype.add_table = function (table) {
        //validate datas????
        //verifie validité:
        //no null
        if (!table.name)
            throw "Invalid: a table must have a name...";
        //pas d'espaces authorisé
        if (!/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/i.test(table.name))
            throw "Invalid name: valid expression must be [a-zA-Z_]{1}[a-zA-Z0-9_]+";
        //verifie si n'existe pas deja 
        for (var _i = 0, _a = this._db.tables; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.name == table.name)
                throw "Invalid name: a table name must be unique!";
        }
        this._db.tables.push(table);
    };
    SQLProvider.prototype.removeTable = function (table) {
        //supprime les relations en premiers
        //JEF Style looping
        for (var i_1 = this._db.relations.length; i_1--;) {
            var rel = this._db.relations[i_1];
            if (rel.from.table == table) {
                //supprime les fields annexes dans to !!!!!!!!
                this._db.relations.splice(i_1, 1);
                var t = rel.to.table;
                var f = rel.to.field;
                var j = t.fields.indexOf(f);
                if (j >= 0)
                    t.fields.splice(j, 1);
            }
            else if (rel.to.table == table) {
                //no need
                this._db.relations.splice(i_1, 1);
            }
        }
        //supprime ta table
        var i = this._db.tables.indexOf(table);
        if (i >= 0)
            this._db.tables.splice(i, 1);
    };
    SQLProvider.prototype.isDataTypeFree = function (type) {
        //verifie que n'existe pas deja
        for (var _i = 0, _a = this._db.enumerations; _i < _a.length; _i++) {
            var en = _a[_i];
            if (en.key == type.key)
                return false;
        }
        return true;
    };
    SQLProvider.prototype.addDataType = function (type) {
        if (!type.key)
            throw "Invalid: a custom type must have a name...";
        //pas d'espaces authorisé
        if (!/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/i.test(type.key))
            throw "Invalid name: valid expression must be [a-zA-Z_]{1}[a-zA-Z0-9_]+";
        if (!type.values)
            throw "Invalid type value: must provide comma sperated values";
        //verifie que n'existe pas deja
        for (var _i = 0, _a = this._db.enumerations; _i < _a.length; _i++) {
            var en = _a[_i];
            if (en.key == type.key)
                throw "Invalid type, already exists";
        }
        //sinon, enregistrer
        this._db.enumerations.push(type);
        //ajoute aux types de données
        FIELD_TYPES.push(type.key);
    };
    SQLProvider.prototype.removeDataType = function (type) {
        //uniquement si non utilisé
        for (var _i = 0, _a = this._db.tables; _i < _a.length; _i++) {
            var t = _a[_i];
            for (var _b = 0, _c = t.fields; _b < _c.length; _b++) {
                var f = _c[_b];
                if (f.type == type.key)
                    throw "Impossible to delete custom type: make sur it's not used anywhere before";
            }
        }
        //sinon, go
        var i = this._db.enumerations.indexOf(type);
        if (i >= 0)
            this._db.enumerations.splice(i, 1);
        //retire de la liste des types
        i = FIELD_TYPES.indexOf(type.key);
        if (i >= 0)
            FIELD_TYPES.splice(i, 1);
    };
    SQLProvider.prototype.addFieldTo = function (field, table) {
        //ajoute un id
        field.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__beans_utils__["a" /* generateUUID */])();
        if (field.primary_key) {
            field.primary_key = false;
            return this.addPKFieldTo(field, table);
        }
        if (!field.name)
            throw "Invalid: a field must have a name...";
        //pas d'espaces authorisé
        if (!/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/i.test(field.name))
            throw "Invalid name: valid expression must be [a-zA-Z_]{1}[a-zA-Z0-9_]+";
        //verifie si n'existe pas deja 
        for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.name == field.name)
                throw "Invalid name: a field name must be unique in a table!";
        }
        table.fields.push(field);
        //if is pk
    };
    SQLProvider.prototype.removeField = function (infos) {
        console.log("remove field");
        var table = infos.table;
        var field = infos.field;
        //verifie si appartient a un composite, si oui, refuse?
        for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.fields && f.fields.indexOf(field) >= 0) {
                //refuse suppression
                throw "Impossible to delete: this field is use in a composite index. Try first to delete '" + f.name + "' first.";
            }
        }
        //supprime les relations si existent
        //JEF Style looping
        for (var i_2 = this._db.relations.length; i_2--;) {
            var rel = this._db.relations[i_2];
            if (rel.from.field == field) {
                //supprime les fields annexes dans to !!!!!!!!
                this._db.relations.splice(i_2, 1);
                var t = rel.to.table;
                var f = rel.to.field;
                var j = t.fields.indexOf(f);
                if (j >= 0)
                    t.fields.splice(j, 1);
            }
            else if (rel.to.field == field) {
                //no need
                this._db.relations.splice(i_2, 1);
            }
        }
        //supprime ta table
        var i = table.fields.indexOf(field);
        if (i >= 0)
            table.fields.splice(i, 1);
    };
    SQLProvider.prototype.addPKFieldTo = function (field, table) {
        this.addFieldTo(field, table);
        var p = new __WEBPACK_IMPORTED_MODULE_5__beans_index__["a" /* Index */]({});
        p.fields = [field];
        p.name = field.name;
        //p.is_unique = true;
        p.method = "btree";
        //table.pk = p;//enregistrer
        //comme le field est la clé, on en profite 
        field.primary_key = true;
        //field.unique = true;
    };
    SQLProvider.prototype.getTableById = function (id) {
        for (var _i = 0, _a = this._db.tables; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.id == id)
                return t;
        }
    };
    SQLProvider.prototype.makeRelation = function (from, to_table) {
        //crée un nouveau element dans la table ciblfr
        var cf = null;
        if (from.field.fields) {
            //un index composite, a voir....
            //cree les champs necessaires dans la table?
            cf = new __WEBPACK_IMPORTED_MODULE_5__beans_index__["a" /* Index */]({
                name: from.field.name + "_" + from.table.name,
                type: from.field.type,
                fields: from.field.fields
            });
        }
        else {
            //un champs simple
            cf = new __WEBPACK_IMPORTED_MODULE_3__beans_field__["a" /* Field */]({
                name: from.field.name + "_" + from.table.name,
                type: from.field.type //???
            });
        }
        cf.index = true; //parceque
        cf.unique = false;
        cf.is_reference = true; //parceque
        cf.type_extras = from.field.type_extras;
        this.addFieldTo(cf, to_table);
        //cree les relations dans chaque table 
        var relation = new __WEBPACK_IMPORTED_MODULE_4__beans_relation__["a" /* Relation */]({
            id: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__beans_utils__["a" /* generateUUID */])(),
            from: from,
            to: {
                table: to_table,
                field: cf,
            }
        });
        //ajoute aux differentes tables
        // to_table.relations.push(relation);
        // from.table.relations.push(relation);
        //ajoute au global pour le dessin
        this._db.relations.push(relation);
    };
    SQLProvider.prototype.dropConstraint = function (what) {
        var table = what.table;
        var constraint = what.constraint;
        //JEF Style looping
        for (var i = table.constraints.length; i--;) {
            if (constraint == table.constraints[i]) {
                table.constraints.splice(i, 1);
                break;
            }
        }
    };
    //ajout a la ramasse des actions de la table, je mettrais de l'ordre plus tard....
    //uniquement le temps de finir les rewrite
    //permet de ne pas completement bugger
    SQLProvider.prototype.addIndex = function (table, index) {
        if (!index.id)
            index.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__beans_utils__["a" /* generateUUID */])();
        if (index.fields.length == 1) {
            var fi = index.fields[0];
            fi.index = true;
            fi.unique = index.unique;
            //this.fields.push(fi);
        }
        else {
            //verifications....
            var n = index.name;
            for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
                var t = _a[_i];
                if (t.name == n)
                    throw "Invalid name: index must be unique in table!";
            }
            index.index = true;
            table.fields.push(index);
        }
        //this.indexes.push(index);
    };
    SQLProvider.prototype.addConstraint = function (table, c) {
        var n = c.key;
        for (var _i = 0, _a = table.constraints; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.key == n)
                throw "Invalid name: constraint must be unique in table!";
        }
        table.constraints.push(c);
    };
    SQLProvider.prototype.removeConstraint = function (table, c) {
        var i = table.constraints.indexOf(c);
        if (i >= 0)
            table.constraints.splice(i, 1);
    };
    SQLProvider.prototype.addCompositePK = function (table, index) {
        if (index.fields.length == 1) {
            //un seul field, pas de création d'index
            index = index.fields[0];
            index.primary_key = true;
        }
        else {
            //plusieurs clés, cree un nouvel element
            if (!index.name) {
                //genere la clé?
                index.name = index.fields.map(function (el) {
                    return el.name;
                }).join('_');
            }
            index.primary_key = true;
            index.type = "Composite";
            table.fields.push(index);
        }
    };
    /**
     * Convertie l'objet Base en json-compliant pour le webworker
     * Permet d'eviter les erreurs de redondances cycliques
     */
    SQLProvider.prototype.convertToJSON = function (base) {
        if (!base)
            return Promise.resolve('');
        return new Promise(function (resolve, reject) {
            var json = {
                db_name: base.db_name,
                db_port: base.db_port,
                db_type: base.db_type,
                //informations de connections
                host: base.host,
                login: base.login,
                passwrd: base.passwrd,
                //les données de la base
                tables: {},
                relations: [],
                enumerations: {} //les enums (custom types)
            };
            //les enums (custom types):  'nom_type'=>[valeur1,valeur2,valeur3...]
            for (var _i = 0, _a = base.enumerations; _i < _a.length; _i++) {
                var enumeration = _a[_i];
                json.enumerations[enumeration.key] = enumeration.values.split(',');
            }
            //les tables 
            for (var _b = 0, _c = base.tables; _b < _c.length; _b++) {
                var table = _c[_b];
                var t = {
                    comment: table.comment,
                    fields: {},
                    constraints: {},
                    coords: table.coords //coords de la table (sert uniquement si save to LS)
                };
                //les fields, c'est un peu plus chaud...
                //si a une property "fields", alors c'est une clé ou index
                //composite...
                for (var _d = 0, _e = table.fields; _d < _e.length; _d++) {
                    var field = _e[_d];
                    //creation d'un nouveau field avec les informations completes
                    var f = {
                        comment: field.comment,
                        //Contraintes basiques
                        primary_key: field.primary_key,
                        index: field.index,
                        not_null: field.not_null,
                        unique: field.unique,
                        default_value: field.default_value,
                        check: field.check,
                        //type du field 
                        type: field.type,
                        type_extras: field.type_extras,
                        //ex: numeric (n,m) => {min:number, max:number}
                        is_reference: field.is_reference,
                    };
                    //Dans le cas d'un composite, il y a une property "fields" pointant vers 
                    //les fields référencés... Dans ce cas, le type = COMPOSITE
                    if (field.fields) {
                        //un index ou clé composite...
                        //recupere les noms des fields necessaires pour la création de la clé
                        //simple tableau de string 
                        f["fields"] = field.fields.map(function (el) { return el.name; });
                    }
                    //enregistre les informations sous forme 
                    // nom_de_la_table => objet Table (permet de les recups plus facilement
                    //dans le worker)
                    t.fields[field.name] = f;
                }
                //contraintes de tables nom_contrainte => valeur (simple string, 
                //pour l'instant, je ne valide pas les contraintes)
                for (var _f = 0, _g = table.constraints; _f < _g.length; _f++) {
                    var constraint = _g[_f];
                    t.constraints[constraint.key] = constraint.values;
                }
                json.tables[table.name] = t;
            }
            //les relations de tables (en dernier bien sur)
            //un tableau décrivant les relations entre les tables:
            //{ 
            //  from: {table: 'nom de la table d orgine', field:'nom du field source'},
            //  to:{table:'nom de la table cible', field:'nom du field REFERNCES'}
            //}
            for (var _h = 0, _j = base.relations; _h < _j.length; _h++) {
                var relation = _j[_h];
                var r = {
                    from: {
                        table: relation.from.table.name,
                        field: relation.from.field.name
                    },
                    to: {
                        table: relation.to.table.name,
                        field: relation.to.field.name
                    }
                };
                json.relations.push(r);
            }
            resolve(JSON.stringify(json));
        });
    };
    /**
     * inverse d'au dessus, datas provennant du localstorage
     */
    SQLProvider.prototype.convertFromJSON = function (jstr) {
        console.log('typeof', typeof jstr);
        var desc = JSON.parse(jstr);
        var composites = [];
        //creation du bouzin....
        var base = new __WEBPACK_IMPORTED_MODULE_1__beans_base__["a" /* default */]();
        base.db_name = desc.db_name;
        base.db_port = desc.db_port;
        base.db_type = desc.db_type;
        base.host = desc.host;
        base.login = desc.login;
        base.passwrd = desc.passwrd;
        //les type enums 
        for (var _i = 0, _a = Object.keys(desc.enumerations); _i < _a.length; _i++) {
            var enums = _a[_i];
            var e = new __WEBPACK_IMPORTED_MODULE_6__beans_enumeration__["a" /* Enumeration */]();
            e.key = enums;
            e.values = desc.enumerations[enums].join(',');
            //ajoute a la liste des types possibles
            FIELD_TYPES.push(enums);
            //ajoute a la base
            base.enumerations.push(e);
        }
        for (var _b = 0, _c = Object.keys(desc.tables); _b < _c.length; _b++) {
            var table = _c[_b];
            var d = desc.tables[table];
            var t = new __WEBPACK_IMPORTED_MODULE_2__beans_table__["a" /* default */]();
            //set infos id for later???
            d["id"] = t.id;
            t.name = table;
            t.comment = d.comment;
            t.coords = d.coords;
            //les fields
            for (var _d = 0, _e = Object.keys(d.fields); _d < _e.length; _d++) {
                var fkey = _e[_d];
                var fd = d.fields[fkey];
                var f = null;
                if (fd.fields) {
                    f = new __WEBPACK_IMPORTED_MODULE_5__beans_index__["a" /* Index */]();
                    //index only datas 
                    f.method = fd.method;
                    f.index_null = fd.index_null;
                    f.null_first = fd.null_first;
                    //les fields references...
                    if (!fd.is_reference)
                        composites.push({ field: f, table: t, ref: fd.fields });
                }
                else
                    f = new __WEBPACK_IMPORTED_MODULE_3__beans_field__["a" /* Field */]();
                f.name = fkey;
                f.comment = fd.comment;
                f.type = fd.type;
                f.type_extras = fd.type_extras;
                f.primary_key = fd.primary_key;
                f.index = fd.index;
                f.not_null = fd.not_null;
                f.unique = fd.unique;
                f.default_value = fd.default_value;
                f.check = fd.check;
                f.is_reference = fd.is_reference;
                //push 
                t.fields.push(f);
            }
            //contraintes de table 
            for (var _f = 0, _g = Object.keys(d.constraints); _f < _g.length; _f++) {
                var c = _g[_f];
                t.constraints.push({ key: c, values: d.constraints[c] });
            }
            //push la table 
            base.tables.push(t);
        }
        //si des composites, a voir... 
        for (var _h = 0, composites_1 = composites; _h < composites_1.length; _h++) {
            var cmp = composites_1[_h];
            //recup les fields...
            //uniqument les non-references
            var f = cmp.field;
            var t = cmp.table;
            if (!t)
                continue;
            var refs = cmp.ref;
            for (var _j = 0, refs_1 = refs; _j < refs_1.length; _j++) {
                var r = refs_1[_j];
                f.fields.push(SQLProvider_1.getFieldByName(r, t));
            }
        }
        for (var _k = 0, _l = desc.relations; _k < _l.length; _k++) {
            var rel = _l[_k];
            var r = new __WEBPACK_IMPORTED_MODULE_4__beans_relation__["a" /* Relation */]();
            //recupe les infos depuis from et to 
            var ft = SQLProvider_1.getTableByName(rel.from.table, base);
            var ff = SQLProvider_1.getFieldByName(rel.from.field, ft);
            var tt = SQLProvider_1.getTableByName(rel.to.table, base);
            var tf = SQLProvider_1.getFieldByName(rel.to.field, tt);
            if (tf.fields) {
                //recup les references de from 
                for (var _m = 0, _o = ff.fields; _m < _o.length; _m++) {
                    var rf = _o[_m];
                    tf.fields.push(rf);
                }
            }
            r.from = {
                table: ft,
                field: ff
            };
            r.to = {
                table: tt,
                field: tf
            };
            base.relations.push(r);
        }
        this._db = base;
        this.db_subject.next(base); //previent l'interface...
    };
    //qqs helpers methods 
    SQLProvider.getTableByName = function (name, base) {
        for (var _i = 0, _a = base.tables; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.name == name)
                return t;
        }
        console.log("unknown table name: " + name);
        return null;
    };
    SQLProvider.getFieldByName = function (name, table) {
        for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.name == name)
                return t;
        }
        console.log("unknown field name: " + name, table);
        return null;
    };
    return SQLProvider;
}());
SQLProvider = SQLProvider_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])()
], SQLProvider);

var SQLProvider_1;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/sql.provider.js.map

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "content {\n  width: 100%; }\n  content label {\n    display: block;\n    font-weight: bold; }\n  content input, content textarea, content select {\n    width: 100%;\n    padding: 5px;\n    margin-bottom: 10px; }\n    content input.ng-valid[required], content input .ng-valid.required, content textarea.ng-valid[required], content textarea .ng-valid.required, content select.ng-valid[required], content select .ng-valid.required {\n      border-left: 5px solid #42A948;\n      /* green */ }\n    content input.ng-invalid:not(form), content textarea.ng-invalid:not(form), content select.ng-invalid:not(form) {\n      border-left: 5px solid #a94442;\n      /* red */ }\n  content input[type=\"checkbox\"] {\n    display: inline;\n    width: auto; }\n  content select {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none;\n    background-color: white;\n    background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 99% 0;\n    height: 29px;\n    overflow: hidden;\n    border: 1px solid #ccc;\n    font-size: 16px; }\n\n.check-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .check-group * {\n    margin: 10px 10px; }\n\n.commands {\n  margin: 10px 0;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\nbutton, a {\n  min-width: 90px;\n  cursor: pointer;\n  border-radius: 5px;\n  font-family: Poiret cursive;\n  /*color: #ffffff;*/\n  border: none;\n  color: #E3E3E3;\n  padding: 10px 20px 10px 20px;\n  text-decoration: none;\n  text-transform: uppercase;\n  margin: 5px; }\n  button:hover:not([disabled]), a:hover:not([disabled]) {\n    text-decoration: none;\n    background: #3498db;\n    background-image: linear-gradient(to bottom, #3498db, #2980b9); }\n  button:disabled, a:disabled {\n    background-color: #cac9c9; }\n    button:disabled:hover, a:disabled:hover {\n      background-color: #cac9c9; }\n\na.round {\n  min-width: 0;\n  padding: 0;\n  color: #3E3E3E; }\n  a.round:hover:not([disabled]) {\n    text-decoration: none;\n    background: transparent; }\n  a.round:hover:disabled {\n    background-color: #cac9c9; }\n    a.round:hover:disabled:hover {\n      background-color: #cac9c9; }\n\n.error {\n  background: #f59694;\n  color: #400909;\n  padding: 10px;\n  font-size: 1em;\n  border-radius: 5px;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(100);
/**
 * Les informations pour les tables de la base
 *
 * SQL:
 *
 * CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] table_name ( [
  { column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
    | table_constraint
    | LIKE parent_table [ like_option ... ] }
    [, ... ]
] )
[ INHERITS ( parent_table [, ... ] ) ]
[ WITH ( storage_parameter [= value] [, ... ] ) | WITH OIDS | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE tablespace ]



where column_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL |
  NULL |
  CHECK ( expression ) |
  DEFAULT default_expr |
  UNIQUE index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE action ] [ ON UPDATE action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

and table_constraint is:

[ CONSTRAINT constraint_name ]
{ CHECK ( expression ) |
  UNIQUE ( column_name [, ... ] ) index_parameters |
  PRIMARY KEY ( column_name [, ... ] ) index_parameters |
  EXCLUDE [ USING index_method ] ( exclude_element WITH operator [, ... ] ) index_parameters [ WHERE ( predicate ) ] |
  FOREIGN KEY ( column_name [, ... ] ) REFERENCES reftable [ ( refcolumn [, ... ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE action ] [ ON UPDATE action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

and like_option is:

{ INCLUDING | EXCLUDING } { DEFAULTS | CONSTRAINTS | INDEXES | STORAGE | COMMENTS | ALL }

index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:

[ WITH ( storage_parameter [= value] [, ... ] ) ]
[ USING INDEX TABLESPACE tablespace ]

exclude_element in an EXCLUDE constraint is:

{ column | ( expression ) } [ opclass ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]


qqs explications:
[ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ]:
    GLOBAL | LOCAL: obsolète
    TEMPORARY | TEMP: la table est temporaire et sera détruite a la fin de la session
    UNLOGGED: bcps plus rapide, mais si crash, aucun moyen de récuperer les données perdues

    INHERITS: une ou plusieurs table parent de la(les)quelle hériter les champs: les noms dans
    les tables parents doivent etre differents, sauf si les types sont identiques (ex: id).
    idem pour les contraintes. Les modifs dans une des tables parents seront recpercutées dans les
    tables enfants

    LIKE idem que inherit, mais les tables ne sont pas liées (les modifs ne sont pas
    répercutées). Si option "INCLUDING DEFAUTLS", les valeurs par defaut sont récupérées
    si option "INCLUDING CONSTRAINTS": inclus les contraintes, 'INCLUDING INDEXES': inclue les
    index et primary key, INCLUDE STORAGE, INCLUDE COMMENTS (pour tout importer: INCLUDING ALL)
    les noms de colonnes DOIVENT etre differents (sinon, erreur)

    CONSTRAINT nom: nom d'une contrainte sur la table
 */

var Table = (function () {
    function Table(args) {
        this.is_global = false; //obsolète, GLOBAL | LOCAL, on garde que parceque ca existe
        this.is_temp = false; //permet de créer une base temporaire
        this.is_unlogged = false; //table loggée ou pas
        this.inherits_from = []; //les tables dont elle hérite, tout changement sera répercuté
        this.like = []; //la ou les tables dont on reprend la structure
        this.like_options = []; //options pour les likes (voir plus haut)
        this.storage_params = ""; //le storage params: custom ou WITH OIDS ou without OIDS
        this.on_commit = ""; //quoi faire lors du commit: PRESERVE ROWS | DELETE ROWS | DROP
        this.tablespace = ""; //l'espace de nom, voir a quoi ca correspond !TODO
        //relations: Array<Relation>;
        //les contraintes....
        this.constraints = [];
        //les clés indexs
        this.indexes = [];
        args = args || {};
        this.id = args.id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* generateUUID */])();
        this.name = args.name;
        this.comment = args.comment;
        this.coords = args.coords || { x: 0, y: 0 };
        this.selected = args.selected || false;
        this.fields = args.fields || [];
    }
    Object.defineProperty(Table.prototype, "coords", {
        get: function () { return this._coords; },
        set: function (v) { this._coords = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (v) { this._selected = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "elem", {
        get: function () { return this.__elem; },
        set: function (v) { this.__elem = v; },
        enumerable: true,
        configurable: true
    });
    Table.prototype.copy = function (t) {
        this.id = t.id;
        this.name = t.name;
        this.comment = t.comment;
        this.constraints = t.constraints;
    };
    Table.prototype.hasPK = function () {
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.primary_key === true)
                return true;
        }
        return false;
    };
    return Table;
}());
/* harmony default export */ __webpack_exports__["a"] = Table;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/table.js.map

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Field; });

var Field = (function () {
    function Field(args) {
        this.type_extras = {};
        //les contraintes possibles pour un field:
        this.primary_key = false;
        this.index = false; //doit creer un index
        this.not_null = false; //ne peut pas etre null
        this.unique = false; //doit etre unique 
        this.default_value = ""; //valeur si pas de données
        this.check = ""; //check expression doit etre true
        this.is_reference = false; //indique si est une reference ou un vrai champs
        args = args || {};
        this.id = args.id === undefined ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* generateUUID */])() : args.id;
        this.name = args.name;
        this.comment = args.comment;
        //voir le reste, type, ....
        this.type = args.type || 'text';
        this.primary_key = args.primary_key || false;
        this.index = args.index || false;
    }
    Field.prototype.copy = function (dt) {
        for (var _i = 0, _a = Object.keys(dt); _i < _a.length; _i++) {
            var key = _a[_i];
            this[key] = dt[key] !== undefined ? dt[key] : this[key];
        }
    };
    return Field;
}());

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/field.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialogs_dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuProvider; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Chargée de créer les descripteurs de menus pour l'application
 */
var MenuProvider = (function () {
    function MenuProvider(_dlg, _db) {
        this._dlg = _dlg;
        this._db = _db;
        this.menu = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    MenuProvider.prototype.getMenuObservable = function () {
        return this.menu.asObservable();
    };
    MenuProvider.prototype.clearMenus = function () {
        this.menu.next(null);
    };
    MenuProvider.prototype.pushTableContextMenu = function (target, coords) {
        var desc = {
            target: target,
            coords: coords,
            menus: [
                {
                    label: "Show Properties",
                    icon: "settings",
                    action: "SHOW_PROPS"
                },
                {
                    label: "Add Field",
                    icon: "playlist_add",
                    action: "ADD_PROPS"
                },
                {
                    label: "Add Composite PK",
                    icon: "vpn_key",
                    action: "ADD_PK",
                    enabled: target.hasPK()
                },
                {
                    label: "Add Composite Index",
                    icon: "format_list_numbered",
                    action: "ADD_INDEX"
                },
                {
                    label: "Add Table Constraint",
                    icon: "report",
                    action: "ADD_CONSTRAINT"
                },
                {
                    label: "Delete Table",
                    icon: "delete",
                    action: "DELETE",
                    title: "Confirm table Deletion?",
                    message: "Deleting this table blablablab blablabla",
                    next: this._db.removeTable,
                }
            ]
        };
        this.menu.next(desc);
    };
    MenuProvider.prototype.pushMainContextMenu = function (target, coords) {
        var desc = {
            target: target,
            coords: coords,
            menus: [
                {
                    action: "new_table",
                    icon: "insert_drive_file",
                    label: "New TABLE"
                },
                {
                    action: "export_sql",
                    icon: "file_upload",
                    label: "Export SQL"
                },
                {
                    action: "export_project",
                    icon: "file_upload",
                    label: "Export Project"
                },
                {
                    action: "import_project",
                    icon: "file_download",
                    label: "Import Project"
                },
                {
                    action: "new_base",
                    icon: "folder",
                    label: "New BASE"
                },
                {
                    action: "edit_base",
                    icon: "storage",
                    label: "Base Properties"
                },
                {
                    action: "about",
                    icon: "info",
                    label: "About SQLTool"
                }
            ]
        };
        this.menu.next(desc);
    };
    MenuProvider.prototype.process_menu = function (item, target, coords) {
        switch (item.action) {
            case 'new_table': {
                //affiche dialogue nouvelle table 
                this._dlg.pushAddTableDialog(coords);
                break;
            }
            case 'ADD_PROPS': {
                //affiche dialogue nouvelle table 
                this._dlg.pushAddFieldDialog(target);
                break;
            }
            case 'ADD_INDEX': {
                //affiche dialogue nouvelle table 
                this._dlg.pushIndexDialog(target);
                break;
            }
            case 'ADD_PK': {
                //affiche dialogue nouvelle table 
                this._dlg.pushPKDialog(target, null);
                break;
            }
            case 'export_sql': {
                this._dlg.pushExportDialog();
                break;
            }
            case 'export_project': {
                this._dlg.pushProjectExportDialog();
                break;
            }
            case 'import_project': {
                this._dlg.pushProjectImportDialog();
                break;
            }
            case 'ADD_CONSTRAINT': {
                //affiche dialogue nouvelle table 
                this._dlg.pushConstraintDialog(target);
                break;
            }
            case 'SHOW_PROPS': {
                this._dlg.pushShowTableProperties(target);
                break;
            }
            case 'about': {
                //affiche dialogue nouvelle table 
                this._dlg.pushAboutDialog();
                break;
            }
            case "new_base": {
                this._dlg.pushNewBaseDialog();
                break;
            }
            case "edit_base": {
                this._dlg.pushEditBaseDialog(target);
                break;
            }
            case 'DELETE': {
                console.log(item);
                this._dlg.pushConfirmDialog(item.title, item.message, target, item.next);
                break;
            }
        }
    };
    return MenuProvider;
}());
MenuProvider = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__dialogs_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialogs_dialog_provider__["a" /* DialogProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _b || Object])
], MenuProvider);

var _a, _b;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/menu.provider.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Enumeration; });
var Enumeration = (function () {
    function Enumeration(args) {
        args = args || {};
        this.key = args.key;
        this.values = args.values;
    }
    return Enumeration;
}());

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/enumeration.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkerProvider; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

///connection au websocke pour creation du SQL
var WorkerProvider = (function () {
    function WorkerProvider() {
        //creation du worker
        this.worker = new Worker("./assets/worker.test.js");
        //les listeners
    }
    WorkerProvider.prototype.process_SQL = function (base) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.worker.onmessage = function (e) {
                //renvoie un resultat valide
                //  console.log(e)
                if (e)
                    resolve(e.data);
                else
                    reject("No response from webworker");
            };
            _this.worker.onerror = function (e) {
                reject(e.message);
            };
            _this.worker.postMessage(base);
        });
    };
    return WorkerProvider;
}());
WorkerProvider = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WorkerProvider);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/worker.provider.js.map

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Index; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Index = (function (_super) {
    __extends(Index, _super);
    function Index(args) {
        var _this = _super.call(this, args) || this;
        _this.fields = [];
        _this.method = "btree";
        _this.index_null = false;
        _this.null_first = false;
        args = args || {};
        _this.type = "Composite"; //par defaut?
        _this.fields = args.fields || [];
        _this.method = args.method || 'btree';
        _this.index_null = args.index_null || false;
        _this.null_first = args.null_first || false;
        return _this;
    }
    return Index;
}(__WEBPACK_IMPORTED_MODULE_0__field__["a" /* Field */]));

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/index.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateUUID;
//Genere un UUID unique pour chaque objet qui doit etre lier
//@return string: l'UUID généré
//@public
function generateUUID() {
    var __uuid_date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var d = __uuid_date;
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/utils.js.map

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menus_menu_provider__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialogs_dialog_provider__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchemasComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import {DBProvider} from './providers/db.provider';
//import {DialogProvider} from "./providers/dialog.provider";



// import {ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
var SchemasComponent = (function () {
    function SchemasComponent(_db, _menu, _dlg) {
        this._db = _db;
        this._menu = _menu;
        this._dlg = _dlg;
        this.title = 'GRETA SQL Tool';
        this.slogan = "a sql tool that's super cool!";
        this.selectedTable = null;
        this.shift_left = 0;
        this.shift_top = 0;
        this.work_size = { width: 0, height: 0 }; //la taille de la zone de travaille, a mettre a jour avec les deplacements des tables
    }
    SchemasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuObs = this._menu.getMenuObservable();
        this.menuObs.subscribe(function (mn) {
            _this.descriptor = mn;
        });
        this.DLGoBS = this._dlg.getDialogObservable();
        this.DLGoBS.subscribe(function (mn) {
            _this.dlgDescriptor = mn;
        });
        this.databaseObservable = this._db.db_subject.asObservable();
        this.databaseObservable.subscribe(function (b) { return _this.database = b; });
        //tente de recup dans le LS
        var jstr = window.localStorage.getItem("gretasql");
        if (jstr) {
            this._db.convertFromJSON(jstr);
        }
        else
            this._db.loadDummyBase();
    };
    SchemasComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log("AfterView Init");
        //force le tick
        setTimeout(function () {
            _this.doUpdateWorkSize();
            _this.doUpdateRelationsCoords();
        }, 0);
    };
    SchemasComponent.prototype.setSelectedTable = function (el) {
        console.log("setSelectedTable");
        this.selectedTable = el.cible;
        this.shift_left = el.shift_left;
        this.shift_top = el.shift_top;
    };
    SchemasComponent.prototype.drag = function (evt) {
        if (this.selectedTable) {
            evt.preventDefault();
            evt.stopPropagation();
            var __cible = this.selectedTable;
            var c = { x: evt.clientX + this.shift_left,
                y: evt.clientY + this.shift_top };
            //nouvelles coords de la table
            __cible.coords = c;
            //verifie si doit mettre a jour la taille de la zone de travaille
            this.doUpdateWorkSize(__cible);
            this.doUpdateRelationsCoordsForTable(__cible);
        }
    };
    //YOUPI: permet de ne pas recalculer a chaque tick la taille du SVG!!!!
    SchemasComponent.prototype.doUpdateWorkSize = function (include_table) {
        if (include_table) {
            //juste une mise a jour au besoin
            var maxX = this.work_size.width, maxY = this.work_size.height;
            var c = include_table.elem.nativeElement.getBoundingClientRect();
            var mx = c.right + window.scrollX;
            var my = c.bottom + window.scrollY;
            if (mx > maxX || my > maxY) {
                maxX = mx > maxX ? mx : maxX;
                maxY = my > maxY ? my : maxY;
                this.work_size = {
                    width: maxX + 50,
                    height: maxY + 50
                };
            }
        }
        else {
            //recalcule tout
            var tables = this._db._db.tables;
            if (!tables || tables.length < 1)
                return; //rien a faire, laisse 100%
            var maxX = 0, maxY = 0;
            for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
                var table = tables_1[_i];
                if (!table.elem)
                    continue;
                var c = table.elem.nativeElement.getBoundingClientRect();
                var mx = c.right + window.scrollX;
                var my = c.bottom + window.scrollY;
                maxX = mx > maxX ? mx : maxX;
                maxY = my > maxY ? my : maxY;
            }
            maxX = maxX < window.innerWidth ? window.innerWidth : maxX;
            maxY = maxY < window.innerHeight ? window.innerHeight : maxY;
            //enregistre les informations de taille de l'ecran
            this.work_size = {
                width: maxX,
                height: maxY
            };
            //return this.sanitizer.bypassSecurityTrustStyle(`width:${maxX}px; height:${maxY}px;`);
        }
    };
    SchemasComponent.prototype.doUpdateRelationsCoordsForTable = function (table) {
        for (var _i = 0, _a = this._db._db.relations; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.from.table == table || r.to.table == table) {
                //met a jour
                //recup les infos de position
                var fromElem = r.from.field;
                var toElem = r.to.field;
                if (!fromElem.__elem || !toElem.__elem) {
                    console.log("pas encore de rendu...");
                    return; //pas encore rendu        
                }
                var e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
                var e2 = toElem.__elem.nativeElement.getBoundingClientRect();
                //calcule le centre des elements
                var rc = {
                    x: e1.width / 2 + e1.left,
                    y: e1.height / 2 + e1.top,
                    x2: e2.width / 2 + e2.left,
                    y2: e2.height / 2 + e2.top
                };
                r.coords = rc;
            }
        }
    };
    SchemasComponent.prototype.doUpdateRelationsCoords = function () {
        console.log("Calcule des relations entre tables...");
        //calcule les coordonnées pour toutes les relations de la base
        for (var _i = 0, _a = this._db._db.relations; _i < _a.length; _i++) {
            var r = _a[_i];
            //recup les infos de position
            var fromElem = r.from.field;
            var toElem = r.to.field;
            if (!fromElem.__elem) {
                console.log("pas encore de rendu...");
                return; //pas encore rendu        
            }
            var e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
            var e2 = toElem.__elem.nativeElement.getBoundingClientRect();
            //calcule le centre des elements
            var rc = {
                x: e1.width / 2 + e1.left,
                y: e1.height / 2 + e1.top,
                x2: e2.width / 2 + e2.left,
                y2: e2.height / 2 + e2.top
            };
            r.coords = rc;
        }
    };
    /**
     * Event au mouse up: supprime les events au documnt et
     * relache la cible
     * @param evt: MouseUpEvent
     */
    SchemasComponent.prototype.stop_drag = function (evt) {
        if (this.selectedTable) {
            this.selectedTable = null;
            /*let __cible = this.selectedTable;
            __cible.selected = false;
            //remet en place une derniere fois...
            __cible.coords = {x:evt.clientX + this.shift_left,
                            y:evt.clientY + this.shift_top};

            this.selectedTable = null;

            //recalcule parent height and width
            let maxX=0, maxY =0;
            for(let rel of this._db._db.tables){
                maxX = maxX > rel.coords.x ? maxX : rel.coords.x + 100;
                maxY = maxY > rel.coords.y ? maxY : rel.coords.y + 100;
            }
            //redimensionne l'element conteneur
            this.wrapper.nativeElement.width = maxX;
            this.wrapper.nativeElement.height = maxY;
            */
        }
    };
    SchemasComponent.prototype.setNewRelation = function (evt) {
        var _this = this;
        console.log("update relations");
        setTimeout(function () { return _this.doUpdateRelationsCoordsForTable(evt.table); }, 100);
    };
    SchemasComponent.prototype.clearMenu = function (desc) {
        if (this.descriptor)
            this._menu.clearMenus();
    };
    SchemasComponent.prototype.showContextMenu = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._menu.pushMainContextMenu(this.database, {
            x: evt.pageX || evt.offsetX,
            y: evt.pageY || evt.offsetY
        });
    };
    //si l'application decide de quitter, tente de sauvegarder l'etat pour la prochaine fois
    SchemasComponent.prototype.beforeUnloadHander = function (event) {
        // enregistre les datas du formulaire courant???
        this._db.convertToJSON(this.database).then(function (jstr) { return window.localStorage.setItem("gretasql", jstr); });
    };
    return SchemasComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("wrapper"),
    __metadata("design:type", Object)
], SchemasComponent.prototype, "wrapper", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* HostListener */])('window:beforeunload', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SchemasComponent.prototype, "beforeUnloadHander", null);
SchemasComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: 'schemas-page',
        template: __webpack_require__(136),
        styles: [__webpack_require__(119)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__menus_menu_provider__["a" /* MenuProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__menus_menu_provider__["a" /* MenuProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__dialogs_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__dialogs_dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], SchemasComponent);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/schemas.js.map

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menus_menu_module__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialogs_dialogs_module__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bypass_css_pipe__ = __webpack_require__(97);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/*
import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';
*/
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__bypass_css_pipe__["a" /* BypassCSSPipe */]],
        exports: [__WEBPACK_IMPORTED_MODULE_3__menus_menu_module__["a" /* MenuModule */], __WEBPACK_IMPORTED_MODULE_4__dialogs_dialogs_module__["a" /* DialogModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_6__bypass_css_pipe__["a" /* BypassCSSPipe */]]
    })
], SharedModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/shared.module.js.map

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Informations sur la base actuellement affichée
 *
 */
var Base = (function () {
    function Base(args) {
        //une base est constituée de table, d'extention (si postgres), d'enum (custom type) et de relations
        this.tables = [];
        this.relations = [];
        this.custom_types = [];
        this.extentions = [];
        this.enumerations = [];
        args = args || {};
        this.file_url = args.file_url || 'a/path',
            this.db_name = args.db_name || "nom_de_la_base",
            this.db_type = args.db_type || "postgres",
            this.db_port = this.db_port || 5432,
            this.host = args.host || "127.0.0.1",
            this.login = args.login || "loginUtilisateur",
            this.passwrd = args.passwrd || "passwordUtilisateur";
        //a voir...
        this.tables = args.tables || [];
        this.relations = args.relations || [];
    }
    return Base;
}());
/* harmony default export */ __webpack_exports__["a"] = Base;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/base.js.map

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "test-test",
        template: "<h2>Juste un test</h2><a routerLink='/schemas'>Back</a>",
    })
], TestComponent);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/test.component.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_routing__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test_component__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestModule", function() { return TestModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Le module chargé de l'affichage de la page principale de l'application
 * permettra, quand je voudrais rajoutter des routes, de le faire aussi sous forme de modules
 *
 * SharedModule
 *
 */
/**
 * Les providers et beans de données pour le SQL
 *
 */




var TestModule = (function () {
    function TestModule() {
    }
    return TestModule;
}());
TestModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__test_routing__["a" /* HeroRoutingModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__test_component__["a" /* TestComponent */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__test_component__["a" /* TestComponent */]]
    })
], TestModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/test.module.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "pre {\n  border: 1px solid #aaa;\n  padding: 10px;\n  white-space: pre-wrap;\n  /* css-3 */\n  white-space: -moz-pre-wrap;\n  /* Mozilla, since 1999 */\n  white-space: -pre-wrap;\n  /* Opera 4-6 */\n  white-space: -o-pre-wrap;\n  /* Opera 7 */\n  word-wrap: break-word;\n  /* Internet Explorer 5.5+ */ }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/test/test.module": [
		41
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 57;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reflect_metadata__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reflect_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reflect_metadata__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_es6_shim__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_es6_shim___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_es6_shim__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_zone_js__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_zone_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_zone_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_module__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__(102);







if (__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_5__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/main.js.map

/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import {ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: 'app-root',
        template: '<router-outlet></router-outlet>',
    })
], AppComponent);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/app.component.js.map

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sql_sql_module__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test_test_module__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__schemas_schemas_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routing__ = __webpack_require__(90);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//import {DialogModule} from "./dialogs/dialogs.module";


//import {MenuModule} from "./menus/menu.module";



var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            //DialogModule.forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__sql_sql_module__["a" /* SQLModule */].forRoot(),
            // MenuModule.forRoot(),
            __WEBPACK_IMPORTED_MODULE_7__schemas_schemas_module__["a" /* SchemasModule */],
            __WEBPACK_IMPORTED_MODULE_6__test_test_module__["TestModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__routing__["a" /* appRoutes */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/app.module.js.map

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogMainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialogMainComponent = (function () {
    function DialogMainComponent(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
    }
    DialogMainComponent.prototype.skip = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    };
    return DialogMainComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Object)
], DialogMainComponent.prototype, "descriptor", void 0);
DialogMainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "sql-dlg",
        template: "\n        <div class=\"modal\" (contextmenu)=\"skip($event)\">\n            <div class=\"modal-content  shadowed\">\n            <h2>{{descriptor.title}}</h2>\n            <p>{{descriptor.texte}}</p>\n            <div [ngSwitch]=\"descriptor.type\">\n                <dlg-addtable *ngSwitchCase=\"'ADD_TABLE'\" [coords]=\"descriptor.coords\"></dlg-addtable>\n                <dlg-addfield *ngSwitchCase=\"'ADD_FIELD'\" [table]=\"descriptor.target\" [field]=\"descriptor.field\"></dlg-addfield>\n                <dlg-about *ngSwitchCase=\"'ABOUT'\"></dlg-about>\n                <dlg-tableprops *ngSwitchCase=\"'SHOW_TABLE'\" [table]=\"descriptor.target\"></dlg-tableprops>\n                <dlg-index *ngSwitchCase=\"'ADD_INDEX'\" [table]=\"descriptor.target.table\" [field]=\"descriptor.target.index\"></dlg-index>\n                <dlg-constraint *ngSwitchCase=\"'ADD_CONSTRAINT'\" [table]=\"descriptor.target\" [cnt]=\"descriptor.constraint\"></dlg-constraint>\n                <dlg-pk *ngSwitchCase=\"'ADD_PK'\" [table]=\"descriptor.target?.table || descriptor.target \" [field]=\"descriptor.target?.pk\"></dlg-pk>\n                <dlg-export *ngSwitchCase=\"'EXPORT'\"></dlg-export>\n                <dlg-projectExport *ngSwitchCase=\"'PROJECT_EXPORT'\"></dlg-projectExport>\n                <dlg-projectImport *ngSwitchCase=\"'PROJECT_IMPORT'\"></dlg-projectImport>\n                <dlg-newbase *ngSwitchCase=\"'CREATE_BASE'\" [editable]=\"descriptor.target\"></dlg-newbase>\n                <dlg-confirm *ngSwitchCase=\"'CONFIRM'\" [next]=\"descriptor.next\" [target]=\"descriptor.target\"></dlg-confirm>\n                <dlg-customtype *ngSwitchCase=\"'CREATE_CTYPE'\" [enumeration]=\"descriptor.target\"></dlg-customtype>\n                <div *ngSwitchDefault>\n            Oups!\n        </div>\n    </div>\n        </div>\n    </div>\n            \n    ",
        styles: [
            "\n/* Modal dialog */\n/* The Modal (background) */\n.modal {\n    position: fixed; /* Stay in place */\n    z-index: 9999; /* Sit on top */\n    left: 0;\n    top: 0;\n    width: 100%; /* Full width */\n    height: 100%; /* Full height */\n    overflow-x: hidden; /* Enable scroll if needed */\n    overflow-y:auto;\n    background-color: rgb(0,0,0); /* Fallback color */\n    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Content/Box */\n.modal-content {\n    margin: 5% auto; /* 15% from the top and centered */\n    padding: 20px;\n    border: 1px solid #888;\n    width: 50%; /* Could be more or less, depending on screen size */\n    background-color: #fbfbfb;\n    color:#3E3E3E;\n    border-radius: 10px;\n}\n.modal-content > h2{\n    font-size: 1.2em;\n    text-transform: uppercase;\n}\n.modal-content > p {\n    text-align: justify;\n}\n.modal-content > content {\n    margin: 10px 0;\n}\n.ok{\n    background: #3498db;\n  background-image: -webkit-linear-gradient(top, #3498db, #2980b9);\n  background-image: -moz-linear-gradient(top, #3498db, #2980b9);\n  background-image: -ms-linear-gradient(top, #3498db, #2980b9);\n  background-image: -o-linear-gradient(top, #3498db, #2980b9);\n  background-image: linear-gradient(to bottom, #3498db, #2980b9);\n  \n}\n.ok:hover{\nbackground: #3cb0fd;\n  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);\n  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);\n  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);\n  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);\n  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);\n  \n}\n.warn {\n    background: #c6d934;\n  background-image: -webkit-linear-gradient(top, #c6d934, #9ea628);\n  background-image: -moz-linear-gradient(top, #c6d934, #9ea628);\n  background-image: -ms-linear-gradient(top, #c6d934, #9ea628);\n  background-image: -o-linear-gradient(top, #c6d934, #9ea628);\n  background-image: linear-gradient(to bottom, #c6d934, #9ea628);\n}\n.warn:hover {\n    background: #e6fc3c;\n  background-image: -webkit-linear-gradient(top, #e6fc3c, #ced934);\n  background-image: -moz-linear-gradient(top, #e6fc3c, #ced934);\n  background-image: -ms-linear-gradient(top, #e6fc3c, #ced934);\n  background-image: -o-linear-gradient(top, #e6fc3c, #ced934);\n  background-image: linear-gradient(to bottom, #e6fc3c, #ced934);\n}"
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object])
], DialogMainComponent);

var _a, _b;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/dialog.main.component.js.map

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_provider__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutDialog = (function () {
    function AboutDialog(_dlg) {
        this._dlg = _dlg;
    }
    AboutDialog.prototype.cancel = function () {
        this._dlg.clearDialogs();
    };
    return AboutDialog;
}());
AboutDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-about",
        template: __webpack_require__(120),
        styles: [__webpack_require__(105), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */]) === "function" && _a || Object])
], AboutDialog);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/about.js.map

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sql_beans_enumeration__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFieldDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddFieldDialog = (function () {
    function AddFieldDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
        this.addfield = false; //pour savoir quel submit je veut
        this.error = "";
        this.types = __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["b" /* FIELD_TYPES */]; //les types de field possibles....
        this.custom_type = new __WEBPACK_IMPORTED_MODULE_5__sql_beans_enumeration__["a" /* Enumeration */]();
        this.make_custom = false;
    }
    AddFieldDialog.prototype.ngOnInit = function () {
        //this.tmp = new Field({id:null});
    };
    AddFieldDialog.prototype.ngOnChanges = function (dt) {
        if (dt.field && dt.field.currentValue) {
            //copy les données necessaires                   
            this.tmp = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__["a" /* Field */]({});
            this.tmp.copy(dt.field.currentValue);
        }
        else {
            this.tmp = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__["a" /* Field */]({ id: null });
        }
        this.firstInput.nativeElement.focus();
    };
    AddFieldDialog.prototype.process_dialog_form = function (frm) {
        //cree la nouvelle table et ajoute
        //suivant le submit...
        this.error = "";
        //copy les données du tmp dans le field courant...
        if (!this.field)
            this.field = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__["a" /* Field */]({ id: null }); //genere un id
        //probleme: si modifie PK ET a une relation, une couille
        if ((this.field.primary_key && !this.tmp.primary_key) || (this.field.unique && !this.field.unique)) {
            //verifie les relations 
            for (var _i = 0, _a = this._db._db.relations; _i < _a.length; _i++) {
                var r = _a[_i];
                if (r.from.field == this.field) {
                    this.error = "Impossible to update Field: to remove primary key ot unique constraint, you must first delete all relations to this field";
                    return;
                }
            }
        }
        //si numeric, custom valid 
        if (this.tmp.type == "numeric") {
            var prec = this.tmp.type_extras.precision;
            var sc = this.tmp.type_extras.scale;
            if (sc) {
                if (!prec) {
                    this.tmp.type_extras.scale = null; //xupprime, ne veut rien dire
                }
                else {
                    if (sc > prec) {
                        this.error = "Error on Inconsistant datas: Scale must be lower than Precision!";
                        return;
                    }
                }
            }
        }
        this.field.copy(this.tmp);
        // console.log(this.field);
        //mise a jour???
        try {
            if (this.make_custom) {
                //cree un nouveau type 
                //verifie les noms et validité
                //si ok, cree un nouveau type
                this._db.addDataType(this.custom_type); //si erreur, youpi...
                this.field.type = this.custom_type.key; //enregistre
            }
            // console.log("Ajoute un champs?")
            if (!this.field.id) {
                //sinon, ajoute le nouveau field...
                this._db.addFieldTo(this.field, this.table);
                if (this.addfield) {
                    this.addfield = false;
                    //affiche autre boite de dialog
                    // console.log("add new field");
                    this.field = null;
                    this.tmp = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__["a" /* Field */]({ id: null });
                    this.custom_type = new __WEBPACK_IMPORTED_MODULE_5__sql_beans_enumeration__["a" /* Enumeration */]();
                    //remet le focus sur le premier champs
                    frm.reset();
                    this.firstInput.nativeElement.focus();
                    return;
                }
            }
            else {
                //verifie si appartient a une relation           A VOIR?
                var is_unique = this.field.unique || this.field.primary_key;
                var has_rel = false;
                console.log("Verifie les types dans les relations");
                for (var _b = 0, _c = this._db._db.relations; _b < _c.length; _b++) {
                    var rel = _c[_b];
                    var ff = rel.from.field;
                    var tf = rel.to.field;
                    if (ff == this.field) {
                        has_rel = true;
                        console.log("change type");
                        tf.type = this.field.type;
                    }
                    else if (tf == this.field) {
                        //has_rel = true;
                        console.log("change type");
                        ff.type = this.field.type;
                    }
                }
                if (!is_unique && has_rel)
                    this.field.unique = true; //force it!
            }
            this._dlg.clearDialogs();
        }
        catch (err) {
            this.error = err;
            this.addfield = false; //remet par defaut
        }
    };
    AddFieldDialog.prototype.cancel = function () {
        this._dlg.clearDialogs();
    };
    return AddFieldDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__["a" /* default */]) === "function" && _a || Object)
], AddFieldDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__["a" /* Field */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sql_beans_field__["a" /* Field */]) === "function" && _b || Object)
], AddFieldDialog.prototype, "field", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("focusable"),
    __metadata("design:type", Object)
], AddFieldDialog.prototype, "firstInput", void 0);
AddFieldDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-addfield",
        template: __webpack_require__(121),
        styles: [__webpack_require__(106), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], AddFieldDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/add.field.js.map

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PKDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PKDialog = (function () {
    function PKDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
        this.index = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]({});
    }
    PKDialog.prototype.ngOnChanges = function (dt) {
        console.log(dt);
        if (dt.field && dt.field.currentValue) {
            //copy les données necessaires                   
            this.index = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]({ id: null });
            var f = dt.field.currentValue;
            this.index.name = f.name;
            //la liste des composites
            this.index.fields = f.fields;
        }
        else {
            this.index = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]({ id: null });
        }
    };
    PKDialog.prototype.process_dialog_form = function (form) {
        this.index.primary_key = true;
        if (this.field) {
            console.log("mise a jour de la clé");
            this.field.name = this.index.name;
            this.field.primary_key = this.index.primary_key;
            //la liste des composites
            this.field.fields = this.index.fields;
        }
        else {
            this.index.primary_key = true;
            this._db.addCompositePK(this.table, this.index);
            //this.table.addCompositePK(this.index);
        }
        this._dlg.back();
    };
    PKDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    PKDialog.prototype.updateCheckedOptions = function (field, evt) {
        if (evt.target.checked) {
            //add to list
            this.index.fields.push(field);
        }
        else {
            var i = this.index.fields.indexOf(field);
            if (i >= 0)
                this.index.fields.splice(i, 1);
        }
    };
    return PKDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__["a" /* default */]) === "function" && _a || Object)
], PKDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]) === "function" && _b || Object)
], PKDialog.prototype, "field", void 0);
PKDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-pk",
        template: __webpack_require__(122),
        styles: [__webpack_require__(107), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], PKDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/add.primary.js.map

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_field__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTableDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddTableDialog = (function () {
    function AddTableDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
        this.addfield = false; //pour savoir quel submit je veut
        this.add_primary = true; //si doit creer une clé primaire par defaut 
        this.error = "";
    }
    AddTableDialog.prototype.ngOnInit = function () {
        this.table = this._db.createEmptyTable();
    };
    AddTableDialog.prototype.process_dialog_form = function (evt) {
        //cree la nouvelle table et ajoute
        //suivant le submit...
        console.log("here"); //no process
        this.error = "";
        this.table.coords = this.coords;
        try {
            this._db.add_table(this.table);
            if (this.add_primary) {
                var f = new __WEBPACK_IMPORTED_MODULE_1__sql_beans_field__["a" /* Field */]({ name: "id" });
                f.primary_key = true;
                f.type = "bigserial";
                this._db.addPKFieldTo(f, this.table);
            }
            if (this.addfield) {
                //affiche autre boite de dialog
                console.log("add new table and field");
                this._dlg.pushAddFieldDialog(this.table);
            }
            else
                this._dlg.clearDialogs();
        }
        catch (err) {
            this.error = err;
        }
    };
    AddTableDialog.prototype.cancel = function () {
        this._dlg.clearDialogs();
    };
    return AddTableDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Object)
], AddTableDialog.prototype, "coords", void 0);
AddTableDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-addtable",
        template: __webpack_require__(123),
        styles: [__webpack_require__(108), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object])
], AddTableDialog);

var _a, _b;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/add.table.js.map

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfirmDialog = (function () {
    function ConfirmDialog(_dlg, _db) {
        this._dlg = _dlg;
        this._db = _db;
        this.error = "";
    }
    ConfirmDialog.prototype.perform_action = function (form) {
        //what to do???
        try {
            this.error = null;
            this.next.call(this._db, this.target);
            this._dlg.back();
        }
        catch (err) {
            this.error = err;
        }
    };
    ConfirmDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return ConfirmDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Object)
], ConfirmDialog.prototype, "next", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Object)
], ConfirmDialog.prototype, "target", void 0);
ConfirmDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-confirm",
        template: __webpack_require__(124),
        styles: [__webpack_require__(109), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _b || Object])
], ConfirmDialog);

var _a, _b;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/confirm.js.map

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_beans_enumeration__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstraintDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConstraintDialog = (function () {
    function ConstraintDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
        this.constraint = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_enumeration__["a" /* Enumeration */]();
        this.error = null;
    }
    ConstraintDialog.prototype.ngOnChanges = function (dt) {
        console.log(dt.cnt);
        if (dt.cnt && dt.cnt.currentValue) {
            this.constraint = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_enumeration__["a" /* Enumeration */](dt.cnt.currentValue); //fait une copie
        }
    };
    ConstraintDialog.prototype.ngAfterViewInit = function () { this.firstinput.nativeElement.focus(); };
    ConstraintDialog.prototype.process_dialog_form = function (form) {
        if (this.cnt) {
            this._db.removeConstraint(this.table, this.cnt);
            //this.table.removeConstraint(this.cnt);
        }
        try {
            this._db.addConstraint(this.table, this.constraint);
            //this.table.addConstraint(this.constraint);
            this._dlg.back();
        }
        catch (err) {
            this.error = err;
        }
        form.reset();
        this.firstinput.focus();
    };
    ConstraintDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return ConstraintDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_beans_table__["a" /* default */]) === "function" && _a || Object)
], ConstraintDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__sql_beans_enumeration__["a" /* Enumeration */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sql_beans_enumeration__["a" /* Enumeration */]) === "function" && _b || Object)
], ConstraintDialog.prototype, "cnt", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])('firstInput'),
    __metadata("design:type", Object)
], ConstraintDialog.prototype, "firstinput", void 0);
ConstraintDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-constraint",
        template: __webpack_require__(125),
        styles: [__webpack_require__(110), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], ConstraintDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/constraint.js.map

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_enumeration__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_provider__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomTypeDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomTypeDialog = (function () {
    function CustomTypeDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
    }
    CustomTypeDialog.prototype.ngOnChanges = function (dt) {
        if (dt.enumeration && dt.enumeration.currentValue) {
            this.e = new __WEBPACK_IMPORTED_MODULE_1__sql_beans_enumeration__["a" /* Enumeration */](dt.enumeration.currentValue);
        }
        else
            this.e = new __WEBPACK_IMPORTED_MODULE_1__sql_beans_enumeration__["a" /* Enumeration */]();
    };
    CustomTypeDialog.prototype.ngAfterViewInit = function () { this.firstinput.nativeElement.focus(); };
    CustomTypeDialog.prototype.process_dialog_form = function (form) {
        this.error = "";
        try {
            if (this.enumeration) {
                //mise a jour simple, verifie la clé avant tout
                if (this.enumeration.key != this.e.key) {
                    if (!this._db.isDataTypeFree(this.e))
                        throw "Invalid key: must be unique";
                }
                this.enumeration.key = this.e.key;
                this.enumeration.values = this.e.values;
            }
            else {
                this._db.addDataType(this.e);
            }
            this._dlg.back();
        }
        catch (err) {
            this.error = err;
        }
    };
    CustomTypeDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return CustomTypeDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("firstInput"),
    __metadata("design:type", Object)
], CustomTypeDialog.prototype, "firstinput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_beans_enumeration__["a" /* Enumeration */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_beans_enumeration__["a" /* Enumeration */]) === "function" && _a || Object)
], CustomTypeDialog.prototype, "enumeration", void 0);
CustomTypeDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-customtype",
        template: __webpack_require__(126),
        styles: [__webpack_require__(111), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], CustomTypeDialog);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/custom.type.js.map

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_table__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_field__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__show_table_properties__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constraint__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_primary__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__export__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__project_export__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__project_import__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__new_base__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__confirm__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__custom_type__ = __webpack_require__(72);













//toutes les dialogs sont la...
var DIALOGS = [__WEBPACK_IMPORTED_MODULE_0__add_table__["a" /* AddTableDialog */], __WEBPACK_IMPORTED_MODULE_1__about__["a" /* AboutDialog */], __WEBPACK_IMPORTED_MODULE_2__add_field__["a" /* AddFieldDialog */], __WEBPACK_IMPORTED_MODULE_3__show_table_properties__["a" /* ShowTableProperties */], __WEBPACK_IMPORTED_MODULE_4__index__["a" /* IndexDialog */], __WEBPACK_IMPORTED_MODULE_5__constraint__["a" /* ConstraintDialog */],
    __WEBPACK_IMPORTED_MODULE_6__add_primary__["a" /* PKDialog */], __WEBPACK_IMPORTED_MODULE_7__export__["a" /* ExportDialog */], __WEBPACK_IMPORTED_MODULE_8__project_export__["a" /* ProjectExportDialog */], __WEBPACK_IMPORTED_MODULE_10__new_base__["a" /* NewBaseDialog */], __WEBPACK_IMPORTED_MODULE_11__confirm__["a" /* ConfirmDialog */], __WEBPACK_IMPORTED_MODULE_9__project_import__["a" /* ProjectImportDialog */], __WEBPACK_IMPORTED_MODULE_12__custom_type__["a" /* CustomTypeDialog */]];
/* harmony default export */ __webpack_exports__["a"] = DIALOGS;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/dialogs.js.map

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ExportDialog = (function () {
    function ExportDialog(_db, _dlg, _worker) {
        this._db = _db;
        this._dlg = _dlg;
        this._worker = _worker;
    }
    ExportDialog.prototype.ngOnInit = function () {
        var _this = this;
        //lance le loading...
        var db = this._db._db;
        this.name = db.db_name;
        //var for syntax highlighting
        /*var codeElement = document.getElementById('colored');
       
        var sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DEFAULT|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
        var sqlVar=/\b(bigint|bigserial|bit|bit varying|blob|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)(?=[^\w])/g;
        var multiLines  = /(\/\*.*\*\/)/g;
        var inline=/(--(.+?)\n|--\n)/g;
        var quoted=/('(.+)')/g;
        */
        this._db.convertToJSON(db).then(function (jstr) {
            return _this._worker.process_SQL(jstr);
        }).then(function (sql) {
            //the sql code
            _this.sql_datas = sql;
            //the sql syntax highlighted
            /*sql=sql.replace(inline,'<span class="multilines" style="color:#aaa">$1</span>');
            sql = sql.replace(sqlVar,'<span class="sqlVar" style="color:#5dc122;">$1</span>');
            sql = sql.replace(sqlCmd,'<span class="sqlCmd" style="color:#1f3eb9;">$1</span>');
            sql = sql.replace(multiLines,'<span class="multilines" style="color:#aaa;">$1</span>');
            sql = sql.replace(quoted,'<span class="quoted" style="color:rgb(255, 134, 0);">$1</span>');
            
            codeElement.innerHTML = sql;	*/
        })
            .catch(function (err) { return _this.error = err; });
    };
    ExportDialog.prototype.download_as_file = function () {
        //permet le download as file du fichier...
    };
    ExportDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return ExportDialog;
}());
ExportDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: 'dlg-export',
        template: __webpack_require__(127),
        styles: [__webpack_require__(42), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__["a" /* WorkerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__["a" /* WorkerProvider */]) === "function" && _c || Object])
], ExportDialog);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/export.js.map

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IndexDialog = (function () {
    function IndexDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
        this.index = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]({ id: null });
    }
    IndexDialog.prototype.ngOnChanges = function (dt) {
        if (dt.field && dt.field.currentValue) {
            //copy les données necessaires                   
            this.index = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]({ id: null });
            var f = dt.field.currentValue;
            this.index.name = f.name;
            this.index.unique = f.unique;
            this.index.index_null = f.index_null;
            this.index.null_first = f.null_first;
            this.index.is_reference = f.is_reference;
            //la liste des composites
            this.index.fields = f.fields;
        }
        else {
            this.index = new __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]({ id: null });
        }
    };
    IndexDialog.prototype.ngAfterViewInit = function () { this.firstinput.nativeElement.focus(); };
    IndexDialog.prototype.process_dialog_form = function (form) {
        this.index.index = true;
        if (this.field) {
            console.log("mise a jour de l'index");
            this.field.name = this.index.name;
            this.field.unique = this.index.unique;
            this.field.index_null = this.index.index_null;
            this.field.null_first = this.index.null_first;
            //la liste des composites
            this.field.fields = this.index.fields;
        }
        else {
            console.log("creation index");
            this._db.addIndex(this.table, this.index);
            // this.table.addIndex(this.index);
        }
        this._dlg.back();
    };
    IndexDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    IndexDialog.prototype.updateCheckedOptions = function (field, evt) {
        if (evt.target.checked) {
            //add to list
            this.index.fields.push(field);
        }
        else {
            var i = this.index.fields.indexOf(field);
            if (i >= 0)
                this.index.fields.splice(i, 1);
        }
    };
    return IndexDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("firstInput"),
    __metadata("design:type", Object)
], IndexDialog.prototype, "firstinput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */]) === "function" && _a || Object)
], IndexDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sql_beans_index__["a" /* Index */]) === "function" && _b || Object)
], IndexDialog.prototype, "field", void 0);
IndexDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-index",
        template: __webpack_require__(128),
        styles: [__webpack_require__(112), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], IndexDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/index.js.map

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_base__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewBaseDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewBaseDialog = (function () {
    function NewBaseDialog(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
    }
    NewBaseDialog.prototype.ngOnInit = function () {
        //this.base = new Base({});
    };
    NewBaseDialog.prototype.ngOnChanges = function (dt) {
        if (dt.editable && dt.editable.currentValue) {
            //copie les infos
            var e = dt.editable.currentValue;
            this.base = new __WEBPACK_IMPORTED_MODULE_1__sql_beans_base__["a" /* default */]({});
            this.copy(this.base, e);
        }
        else
            this.base = new __WEBPACK_IMPORTED_MODULE_1__sql_beans_base__["a" /* default */]({});
    };
    NewBaseDialog.prototype.ngAfterViewInit = function () { this.firstinput.nativeElement.focus(); };
    NewBaseDialog.prototype.copy = function (a, b) {
        a.db_name = b.db_name;
        a.db_port = b.db_port;
        a.db_type = b.db_type;
        a.host = b.host;
        a.login = b.login;
        a.passwrd = b.passwrd;
        a.enumerations = b.enumerations;
    };
    NewBaseDialog.prototype.process_dialog_form = function (form) {
        //envoie la nouvelle base
        console.log('form', this);
        if (this.editable) {
            this.copy(this.editable, this.base);
            this._db.setCurrentBase(this.editable);
        }
        else {
            this._db.setCurrentBase(this.base);
        }
        this._dlg.clearDialogs();
    };
    NewBaseDialog.prototype.cancel = function () {
        this._dlg.clearDialogs();
    };
    //met ajour, modifie au cas ou...
    //devoir faire ca partout va etre la merde...
    // setProp(name:string, inp){
    //     try{
    //         this.base[name] = inp.value;
    //     } catch(err){
    //         console.log(err);
    //         inp.value = this.base[name];
    //     }
    // }
    NewBaseDialog.prototype.newEnum = function () {
        this._dlg.pushCustomTypeDialog(null);
    };
    NewBaseDialog.prototype.updateEnum = function (e) {
        this._dlg.pushCustomTypeDialog(e);
    };
    NewBaseDialog.prototype.deleteEnum = function (e) {
        //suppression si non utilisé
        try {
            this._db.removeDataType(e);
        }
        catch (err) {
            this.error = err;
        }
    };
    return NewBaseDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("firstInput"),
    __metadata("design:type", Object)
], NewBaseDialog.prototype, "firstinput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_beans_base__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_beans_base__["a" /* default */]) === "function" && _a || Object)
], NewBaseDialog.prototype, "editable", void 0);
NewBaseDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-newbase",
        template: __webpack_require__(129),
        styles: [__webpack_require__(113), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], NewBaseDialog);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/new.base.js.map

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectExportDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectExportDialog = (function () {
    function ProjectExportDialog(_db, _dlg, _worker) {
        this._db = _db;
        this._dlg = _dlg;
        this._worker = _worker;
    }
    ProjectExportDialog.prototype.ngOnInit = function () {
        var _this = this;
        //lance le loading...
        var db = this._db._db;
        this.name = db.db_name;
        this._db.convertToJSON(db).then(function (jstr) {
            //the json project code
            _this.project = jstr;
        }).catch(function (err) { return _this.error = err; });
    };
    ProjectExportDialog.prototype.download_as_file = function () {
        //permet le download as file du fichier...
    };
    ProjectExportDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return ProjectExportDialog;
}());
ProjectExportDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: 'dlg-projectExport',
        template: __webpack_require__(130),
        styles: [__webpack_require__(42), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__["a" /* WorkerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__["a" /* WorkerProvider */]) === "function" && _c || Object])
], ProjectExportDialog);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/project.export.js.map

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectImportDialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectImportDialog = (function () {
    function ProjectImportDialog(_db, _dlg, _worker) {
        this._db = _db;
        this._dlg = _dlg;
        this._worker = _worker;
    }
    ProjectImportDialog.prototype.handleDrop = function (e) {
        var _this = this;
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        if (files[1]) {
            console.log('Only one file is required!');
        }
        else {
            var reader_1 = new FileReader();
            reader_1.onload = function (e) {
                _this.text = reader_1.result;
                _this._db.convertFromJSON(_this.text);
            };
            reader_1.readAsText(files[0]);
            this._dlg.back();
        }
    };
    ProjectImportDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return ProjectImportDialog;
}());
ProjectImportDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: 'dlg-projectImport',
        template: __webpack_require__(131),
        styles: [__webpack_require__(5), __webpack_require__(114)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__["a" /* WorkerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_worker_provider__["a" /* WorkerProvider */]) === "function" && _c || Object])
], ProjectImportDialog);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/project.import.js.map

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowTableProperties; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowTableProperties = (function () {
    function ShowTableProperties(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
        this.error = "";
    }
    ShowTableProperties.prototype.ngOnInit = function (dt) {
    };
    ShowTableProperties.prototype.ngOnChanges = function (dt) {
        this.table_cpy = new __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */]({});
        if (dt.table && dt.table.currentValue) {
            this.table_cpy.copy(dt.table.currentValue);
        }
    };
    ShowTableProperties.prototype.ngAfterViewInit = function () { this.firstinput.nativeElement.focus(); };
    ShowTableProperties.prototype.process_dialog_form = function () {
        //validate datas and then change in table...
        this.table.copy(this.table_cpy);
        this._dlg.clearDialogs();
    };
    ShowTableProperties.prototype.cancel = function () {
        this._dlg.clearDialogs();
    };
    ShowTableProperties.prototype.newConstraint = function () {
        this._dlg.pushConstraintDialog(this.table);
    };
    // newIndex(){
    //     this._dlg.pushIndexDialog(this.table);
    // }
    // newPK(){
    //     this._dlg.pushPKDialog(this.table);
    // }
    // updateIndex(index:Index){
    // }
    // deleteIndex(index:Index){
    // }
    ShowTableProperties.prototype.updateConstraint = function (c) {
        this._dlg.pushConstraintDialog(this.table, c);
    };
    ShowTableProperties.prototype.deleteConstraint = function (c) {
        this._dlg.pushConfirmDialog("Confirm Constraint deletion", "Are you sure?", { table: this.table, constraint: c }, this._db.dropConstraint);
    };
    return ShowTableProperties;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */]) === "function" && _a || Object)
], ShowTableProperties.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("firstInput"),
    __metadata("design:type", Object)
], ShowTableProperties.prototype, "firstinput", void 0);
ShowTableProperties = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "dlg-tableprops",
        template: __webpack_require__(132),
        styles: [__webpack_require__(115), __webpack_require__(5)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], ShowTableProperties);

var _a, _b, _c;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/show.table.properties.js.map

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dyn_dialogs_directive__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_dialog_main_component__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dialogs_dialogs__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_extra_type_pipe__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_has_pk_pipe__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_pure_field_pipe__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_file_download__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_colorize_sql_pipe__ = __webpack_require__(82);
/* unused harmony export DialogConfigService */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Un module externe pour gerer les boites de dialogues
 *
 */












var DialogConfigService = (function () {
    function DialogConfigService() {
    }
    return DialogConfigService;
}());

var DialogModule = (function () {
    function DialogModule() {
    }
    return DialogModule;
}());
DialogModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__components_dialog_main_component__["a" /* DialogMainComponent */], __WEBPACK_IMPORTED_MODULE_3__dyn_dialogs_directive__["a" /* DynDialogDirective */],
            __WEBPACK_IMPORTED_MODULE_7__pipes_extra_type_pipe__["a" /* ExtraTypePipe */], __WEBPACK_IMPORTED_MODULE_8__pipes_has_pk_pipe__["a" /* HasPrimaryKeyPipe */], __WEBPACK_IMPORTED_MODULE_9__pipes_pure_field_pipe__["a" /* PureFieldyPipe */], __WEBPACK_IMPORTED_MODULE_10__pipes_file_download__["a" /* FileDownloadPipe */], __WEBPACK_IMPORTED_MODULE_11__pipes_colorize_sql_pipe__["a" /* ColorizeSQLPipe */]].concat(__WEBPACK_IMPORTED_MODULE_6__components_dialogs_dialogs__["a" /* default */]),
        exports: [__WEBPACK_IMPORTED_MODULE_5__components_dialog_main_component__["a" /* DialogMainComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__dialog_provider__["a" /* DialogProvider */]],
        entryComponents: __WEBPACK_IMPORTED_MODULE_6__components_dialogs_dialogs__["a" /* default */].slice(),
    })
], DialogModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/dialogs.module.js.map

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynDialogDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynDialogDirective = (function () {
    function DynDialogDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    return DynDialogDirective;
}());
DynDialogDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Directive */])({
        selector: '[dyn-dialog]',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewContainerRef */]) === "function" && _a || Object])
], DynDialogDirective);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/dyn.dialogs.directive.js.map

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorizeSQLPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//var for syntax highlighting
var sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DEFAULT|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
var sqlVar = /\b(bigint|bigserial|bit|bit varying|blob|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)(?=[^\w])/g;
var multiLines = /(\/\*.*\*\/)/g;
var inline = /(--(.+?)\n|--\n)/g;
var quoted = /('(.+)')/g;
var ColorizeSQLPipe = (function () {
    function ColorizeSQLPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ColorizeSQLPipe.prototype.transform = function (sql) {
        if (!sql)
            return "";
        //parse le contenu et cree les trucs associés
        sql = sql.replace(inline, '<span class="multilines" style="color:#aaa">$1</span>');
        sql = sql.replace(sqlVar, '<span class="sqlVar" style="color:#5dc122;">$1</span>');
        sql = sql.replace(sqlCmd, '<span class="sqlCmd" style="color:#1f3eb9;">$1</span>');
        sql = sql.replace(multiLines, '<span class="multilines" style="color:#aaa;">$1</span>');
        sql = sql.replace(quoted, '<span class="quoted" style="color:rgb(255, 134, 0);">$1</span>');
        return this.sanitizer.bypassSecurityTrustHtml(sql);
    };
    return ColorizeSQLPipe;
}());
ColorizeSQLPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'sql_color' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _a || Object])
], ColorizeSQLPipe);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/colorize.sql.pipe.js.map

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExtraTypePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EXTRAS = {
    'LENGTH': ['character varying', 'character', 'bit', 'bit varying'],
    'MINMAX': ['numeric'],
};
var ExtraTypePipe = (function () {
    function ExtraTypePipe() {
    }
    ExtraTypePipe.prototype.transform = function (typeName) {
        if (!typeName)
            return "";
        for (var _i = 0, _a = Object.keys(EXTRAS); _i < _a.length; _i++) {
            var key = _a[_i];
            if (EXTRAS[key].indexOf(typeName) >= 0)
                return key;
        }
        return '';
    };
    return ExtraTypePipe;
}());
ExtraTypePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'extratype' })
], ExtraTypePipe);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/extra.type.pipe.js.map

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDownloadPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileDownloadPipe = (function () {
    function FileDownloadPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    FileDownloadPipe.prototype.transform = function (sql) {
        if (!sql)
            return "";
        return this.sanitizer.bypassSecurityTrustResourceUrl("data:text/octet-stream;charset:utf-8," + encodeURIComponent(sql));
    };
    return FileDownloadPipe;
}());
FileDownloadPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'file_download' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _a || Object])
], FileDownloadPipe);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/file.download.js.map

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HasPrimaryKeyPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HasPrimaryKeyPipe = (function () {
    function HasPrimaryKeyPipe() {
    }
    HasPrimaryKeyPipe.prototype.transform = function (table, is_primary) {
        if (is_primary === void 0) { is_primary = false; }
        if (is_primary)
            return "";
        for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.primary_key === true)
                return "invisible";
        }
        return "";
    };
    return HasPrimaryKeyPipe;
}());
HasPrimaryKeyPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'has_PK' })
], HasPrimaryKeyPipe);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/has.pk.pipe.js.map

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PureFieldyPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PureFieldyPipe = (function () {
    function PureFieldyPipe() {
    }
    PureFieldyPipe.prototype.transform = function (fields) {
        var pures = [];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            if (field.type !== "Composite")
                pures.push(field);
        }
        return pures;
    };
    return PureFieldyPipe;
}());
PureFieldyPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'pure_fields' })
], PureFieldyPipe);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/pure.field.pipe.js.map

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_bypass_css_pipe__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_provider__ = __webpack_require__(16);
/* unused harmony export MenuConfigService */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Un module externe pour gerer les boites de dialogues
 *
 */






var MenuConfigService = (function () {
    function MenuConfigService() {
    }
    return MenuConfigService;
}());

var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__menu__["a" /* MenuComponent */], __WEBPACK_IMPORTED_MODULE_4__pipes_bypass_css_pipe__["a" /* BypassCSSPipe */]],
        exports: [__WEBPACK_IMPORTED_MODULE_3__menu__["a" /* MenuComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_5__menu_provider__["a" /* MenuProvider */]]
    })
], MenuModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/menu.module.js.map

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_provider__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuComponent = (function () {
    function MenuComponent(_menu) {
        this._menu = _menu;
    }
    MenuComponent.prototype.onClick = function (action) {
        //suivant l'action a realiser, voit quoi faire....
        this._menu.process_menu(action, this.descriptor.target, this.descriptor.coords);
    };
    return MenuComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Object)
], MenuComponent.prototype, "descriptor", void 0);
MenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "menu-cmp",
        template: __webpack_require__(133),
        styles: [__webpack_require__(116)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__menu_provider__["a" /* MenuProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__menu_provider__["a" /* MenuProvider */]) === "function" && _a || Object])
], MenuComponent);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/menu.js.map

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BypassCSSPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BypassCSSPipe = (function () {
    function BypassCSSPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    BypassCSSPipe.prototype.transform = function (coords) {
        var c = coords || { x: 0, y: 0 };
        var transform = "transform:translate(" + c.x + "px," + c.y + "px);";
        return this.sanitizer.bypassSecurityTrustStyle(transform);
    };
    return BypassCSSPipe;
}());
BypassCSSPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'safeCSS' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _a || Object])
], BypassCSSPipe);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/bypass.css.pipe.js.map

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schemas_schemas__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appRoutes; });

var appRoutes = [
    { path: '',
        redirectTo: '/schemas',
        pathMatch: 'full'
    },
    { path: 'schemas', component: __WEBPACK_IMPORTED_MODULE_0__schemas_schemas__["a" /* SchemasComponent */] },
    { path: 'test', loadChildren: 'app/test/test.module#TestModule' },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_0__schemas_schemas__["a" /* SchemasComponent */] }
];
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/routing.js.map

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_field__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialogs_dialog_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FieldComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FieldComponent = (function () {
    function FieldComponent(_el, _dlg, _db) {
        this._el = _el;
        this._dlg = _dlg;
        this._db = _db;
        this.show_fabs = false;
    }
    FieldComponent.prototype.ngOnChanges = function (dt) {
        if (dt.field) {
            this.field.__elem = this.fieldElem;
        }
    };
    FieldComponent.prototype.showItemProperty = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        console.log("hello");
    };
    FieldComponent.prototype.doStartDrag = function (event) {
        event.stopPropagation();
        console.log("trying to drag");
        //if(!this.field.unique && !this.field.primary_key) return;
        //console.log("OK")
        //event.preventDefault();
        //event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        //transfert les données...
        event.dataTransfer.setData("js/field", this.table.id + " " + this.field.id);
        // this.dragSrc = true;
        // this._app.onDragStarted(true);
    };
    FieldComponent.prototype.doStopDrag = function (evt) {
        console.log("stop dragging");
        evt.stopPropagation();
        evt.preventDefault();
    };
    FieldComponent.prototype.updateField = function () {
        this.show_fabs = false;
        this._dlg.pushAddFieldDialog(this.table, this.field);
    };
    FieldComponent.prototype.deleteField = function () {
        this.show_fabs = false;
        this._dlg.pushConfirmDialog("Confirm Field Deletion?", "Deleting this field will blablabla and blablabla. Are you sure?", { table: this.table, field: this.field }, this._db.removeField);
    };
    FieldComponent.prototype.updateComposite = function () {
        this.show_fabs = false;
        console.log("youhou");
        if (this.field.primary_key)
            this._dlg.pushPKDialog(this.table, this.field);
        else
            this._dlg.pushIndexDialog(this.table, this.field);
    };
    FieldComponent.prototype.skip_evt = function (event) { event.preventDefault(); };
    FieldComponent.prototype.doDrop = function (event) {
        //drop uniquement si de la meme table!!!!
        var dt = event.dataTransfer.getData("js/field");
        //lance le move
        if (dt) {
            var ids = dt.split(" ");
            //verifie si se trouve sur la meme table???
            var table = this._db.getTableById(ids[0]);
            if (!table)
                return;
            if (table != this.table)
                return; //provient d'une autre table, refuse
            //sinon, insert before
            /*event.stopPropagation();
            this.skip_evt(event);*/
            //recupere l'index du field
            var field = null;
            var index = -1;
            for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
                var f = _a[_i];
                index++;
                if (f.id == ids[1]) {
                    field = f;
                    break;
                }
            }
            if (!field)
                return;
            if (field == this.field)
                return; //deplace sur lui meme
            //pop
            this.table.fields.splice(index, 1);
            //recupere son index
            var myindex = this.table.fields.indexOf(this.field);
            //2 cas: remonte ou descend
            if (myindex >= index) {
                //descend, met apres
                if (myindex + 1 == this.table.fields.length)
                    this.table.fields.push(field);
                else
                    this.table.fields.splice(myindex + 1, 0, field);
            }
            else {
                //monte, met avant
                if (myindex == 0)
                    this.table.fields.unshift(field);
                else
                    this.table.fields.splice(myindex, 0, field);
            }
            //insert le precedent APRES
            //console.log("indexes: ",index, myindex);
        }
    };
    return FieldComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_beans_field__["a" /* Field */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_beans_field__["a" /* Field */]) === "function" && _a || Object)
], FieldComponent.prototype, "field", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__sql_beans_table__["a" /* default */]) === "function" && _b || Object)
], FieldComponent.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("fieldElem"),
    __metadata("design:type", Object)
], FieldComponent.prototype, "fieldElem", void 0);
FieldComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "field-cmp",
        template: __webpack_require__(134),
        styles: [__webpack_require__(117)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__dialogs_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__dialogs_dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _e || Object])
], FieldComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/field.js.map

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menus_menu_provider__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TableComponent = (function () {
    function TableComponent(_menu, _db) {
        this._menu = _menu;
        this._db = _db;
        this.selectedTable = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* EventEmitter */]();
        this.newRelation = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* EventEmitter */]();
    }
    TableComponent.prototype.ngOnChanges = function (dt) {
        if (dt.table) {
            this.table.elem = this.tableElem;
        }
    };
    TableComponent.prototype.startDrag = function (evt) {
        if (evt.button != 0)
            return;
        evt.preventDefault();
        //evt.stopPropagation();
        //evt.target.style.zIndex = 2000;
        var el = this.table;
        el.selected = true;
        var __shift_left = el.coords.x - evt.clientX;
        var __shift_top = el.coords.y - evt.clientY;
        this.selectedTable.emit({
            cible: el,
            shift_left: __shift_left,
            shift_top: __shift_top
        }); //envoie la table selectionnée
        // __captureEvents();
    };
    TableComponent.prototype.showMenu = function (evt) {
        console.log("showmenu");
        evt.preventDefault();
        evt.stopPropagation();
        this._menu.pushTableContextMenu(this.table, {
            x: evt.pageX || evt.offsetX,
            y: evt.pageY || evt.offsetY
        });
    };
    TableComponent.prototype.skip_evt = function (event) { event.preventDefault(); };
    TableComponent.prototype.doDrop = function (event) {
        var dt = event.dataTransfer.getData("js/field");
        event.stopPropagation();
        this.skip_evt(event);
        //lance le move
        if (dt) {
            var ids = dt.split(" ");
            //recupe la table
            var table = this._db.getTableById(ids[0]);
            //update: drag & drop dans une meme table
            //if(!table || table==this.table) return;
            if (!table)
                return;
            var field = null;
            var index = -1;
            for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
                var f = _a[_i];
                index++;
                if (f.id == ids[1]) {
                    field = f;
                    break;
                }
            }
            console.log("Verification de la cible....");
            if (table == this.table) {
                //deplace le field dans la table
                console.log("Move in table");
                //a quel index????
                //remet a jour les relations
                this.newRelation.emit({ table: this.table });
            }
            else {
                //creation d'une relation entre 2 tables
                //verifie que le field est unique ou PK
                console.log("création d'une relation?", field);
                if (!field)
                    return;
                if (!field.unique && !field.primary_key)
                    return; //ne permet pas la creation d'une relation
                console.log("OK, creation!!!");
                //sinon, crée une nouvelle relation entre les tables
                //probleme, ai besoin de connaitre la table de depart...
                this._db.makeRelation({ table: table, field: field }, this.table);
                this.newRelation.emit({ table: this.table });
            }
        }
    };
    return TableComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__sql_beans_table__["a" /* default */]) === "function" && _a || Object)
], TableComponent.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Output */])("onSelectedTable"),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* EventEmitter */]) === "function" && _b || Object)
], TableComponent.prototype, "selectedTable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* Output */])("onNewRelation"),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* EventEmitter */]) === "function" && _c || Object)
], TableComponent.prototype, "newRelation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* ViewChild */])("tableElem"),
    __metadata("design:type", Object)
], TableComponent.prototype, "tableElem", void 0);
TableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Component */])({
        selector: "table-cmp",
        template: __webpack_require__(135),
        styles: [__webpack_require__(118)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__menus_menu_provider__["a" /* MenuProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__menus_menu_provider__["a" /* MenuProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__sql_sql_provider__["a" /* SQLProvider */]) === "function" && _e || Object])
], TableComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/tables.js.map

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBInfosPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DBInfosPipe = (function () {
    function DBInfosPipe() {
    }
    DBInfosPipe.prototype.transform = function (db) {
        if (!db)
            return "Aucune infos";
        return db.db_type + "://" + db.login + ":" + db.passwrd + "@" + db.host + ":" + db.db_port + "/" + db.db_name;
    };
    return DBInfosPipe;
}());
DBInfosPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'dbinfos' })
], DBInfosPipe);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/db.infos.pipe.js.map

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Relation2PointsPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Relation2PointsPipe = (function () {
    function Relation2PointsPipe() {
    }
    Relation2PointsPipe.prototype.transform = function (relation) {
        var rc = relation;
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        if (!rc)
            return "";
        var cfx = (rc.x2 - rc.x) / 2 + rc.x;
        var cfy = (rc.y2 - rc.y) / 2 + rc.y;
        return (rc.x + scrollX) + "," + (rc.y + scrollY) + " " + (cfx + scrollX) + "," + (rc.y + scrollY) + " " + (cfx + scrollX) + "," + (rc.y2 + scrollY) + " " + (rc.x2 + scrollX) + "," + (rc.y2 + scrollY);
        /*
              
                if(!relation) return "";
                
                //calcule les coords des points du link
                let r = relation;
                //recup les infos de position
                let fromElem = r.from.field;
                let toElem = r.to.field;
        
                //fait un link entre les tables
                
        
                if(!fromElem.__elem){
                    
                    return; //pas encore rendu
                
                }
                
                let e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
                let e2 = toElem.__elem.nativeElement.getBoundingClientRect();
                var scrollX = window.scrollX;
                var scrollY = window.scrollY;
        
                //calcule le centre des elements
                let t1 = {
                    x: e1.width/2 + e1.left + scrollX,
                    y: e1.height/2 + e1.top + scrollY
                };
                let t2 = {
                    x: e2.width/2 + e2.left + scrollX,
                    y: e2.height/2 + e2.top + scrollY
                }
                let cfx = (t2.x -t1.x)/2 +t1.x;
                let cfy = (t2.y - t1.y)/2 + t1.y;
                // var scrollX = window.scrollX;
                // var scrollY = window.scrollY;
                //la premiere fois, ne connait pas les elements....
                // if(!r.from._link){
                //     //bon, il me le faut...
                //     fromElem = r.from._link = document.getElementById(r.from.field.id);
                //     if(!fromElem) return;
                //     toElem = r.to._link = document.getElementById(r.to.field.id);
                // }
        
                //calcule les coords actuelles
                // var t1 = fromElem.getBoundingClientRect(); //r.from.table.coords;
                // var t2= toElem.getBoundingClientRect();//r.to.table.coords;
                // console.log(t1,t2);
                // //calcul les centres des fields
                // var cfx = t1.left + scrollX + t1.width/2;
                // var ctx = t2.left +scrollX + t2.width/2;
                // var cfy = t1.top - 28.8 +scrollY +t1.height/2;
                // var cty = t2.top - 28.8 +scrollY + t2.height/2;
        
                //les positions relatives des divs
                // var hw = (ctx - cfx)/2  + cfx;
                // var hl = (cty - cfy)/2 + cfy;
        
        
                return  t1.x+","+t1.y+" "+cfx+","+t1.y+" "+cfx+","+t2.y+" "+t2.x+","+t2.y;
                // return this.sanitizer.bypassSecurityTrustStyle(`<svg:polyline stroke-linejoin="round"
                //     fill="none"
                //     stroke="#3E3E3E"
                //     stroke-width:"1"
                //     stroke-dasharray="5px 5px"  points="${c}"/>`);
        */
    };
    return Relation2PointsPipe;
}());
Relation2PointsPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'relation2points' }) //ca craint un peu ca...
], Relation2PointsPipe);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/relation.to.points.pipe.js.map

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WidthHeightPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//probleme: supprimer le pure=false: OK
var WidthHeightPipe = (function () {
    function WidthHeightPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    WidthHeightPipe.prototype.transform = function (ws) {
        console.log("transform wh");
        //calcule la taille minimale de la zone de dessin
        if (!ws)
            return this.sanitizer.bypassSecurityTrustStyle("width: 100%; height:100%;");
        return this.sanitizer.bypassSecurityTrustStyle("width:" + ws.width + "px; height:" + ws.height + "px;");
    };
    return WidthHeightPipe;
}());
WidthHeightPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'widthHeight' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _a || Object])
], WidthHeightPipe);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/width.height.pipe.js.map

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_tables__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_field__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schemas__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_db_infos_pipe__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_relation_to_points_pipe__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_width_height_pipe__ = __webpack_require__(95);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchemasModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Le module chargé de l'affichage de la page principale de l'application
 * permettra, quand je voudrais rajoutter des routes, de le faire aussi sous forme de modules
 *
 * SharedModule
 *
 */
/**
 * Les providers et beans de données pour le SQL
 *
 */






//import {BypassCSSPipe} from "./pipes/bypass.css.pipe";


var SchemasModule = (function () {
    function SchemasModule() {
    }
    return SchemasModule;
}());
SchemasModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__pipes_db_infos_pipe__["a" /* DBInfosPipe */],
            //BypassCSSPipe,
            __WEBPACK_IMPORTED_MODULE_6__pipes_relation_to_points_pipe__["a" /* Relation2PointsPipe */],
            __WEBPACK_IMPORTED_MODULE_7__pipes_width_height_pipe__["a" /* WidthHeightPipe */],
            __WEBPACK_IMPORTED_MODULE_2__components_tables__["a" /* TableComponent */],
            __WEBPACK_IMPORTED_MODULE_3__components_field__["a" /* FieldComponent */],
            __WEBPACK_IMPORTED_MODULE_4__schemas__["a" /* SchemasComponent */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_4__schemas__["a" /* SchemasComponent */]]
    })
], SchemasModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/schemas.module.js.map

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BypassCSSPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BypassCSSPipe = (function () {
    function BypassCSSPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    BypassCSSPipe.prototype.transform = function (coords) {
        var c = coords || { x: 0, y: 0 };
        var transform = "transform:translate(" + c.x + "px," + c.y + "px);";
        return this.sanitizer.bypassSecurityTrustStyle(transform);
    };
    return BypassCSSPipe;
}());
BypassCSSPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Pipe */])({ name: 'safeCSS' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */]) === "function" && _a || Object])
], BypassCSSPipe);

var _a;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/bypass.css.pipe.js.map

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Relation; });

var Relation = (function () {
    function Relation(args) {
        //coordonnées pour la polyline
        this.coords = {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0
        };
        args = args || {};
        this.id = args.id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* generateUUID */])();
        //va surement falloir recup les objets crées precedement...
        this.from = args.from;
        this.to = args.to;
    }
    return Relation;
}());

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/relation.js.map

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sql_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__worker_provider__ = __webpack_require__(18);
/* unused harmony export SQLConfigService */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SQLModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Les providers et beans de données pour le SQL
 *
 */





var SQLConfigService = (function () {
    function SQLConfigService() {
    }
    return SQLConfigService;
}());

var SQLModule = SQLModule_1 = (function () {
    function SQLModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    SQLModule.forRoot = function (config) {
        return {
            ngModule: SQLModule_1,
            providers: [
                { provide: SQLConfigService, useValue: config }
            ]
        };
    };
    return SQLModule;
}());
SQLModule = SQLModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]],
        declarations: [],
        exports: [],
        providers: [__WEBPACK_IMPORTED_MODULE_3__sql_provider__["a" /* SQLProvider */], __WEBPACK_IMPORTED_MODULE_4__worker_provider__["a" /* WorkerProvider */]]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Optional */])()), __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* SkipSelf */])()),
    __metadata("design:paramtypes", [SQLModule])
], SQLModule);

var SQLModule_1;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/sql.module.js.map

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateUUID;
/**
 * Quelques fonctions utilitaires que je ne sais pas ou mettre....
 *
 */
//Genere un UUID unique pour chaque objet qui doit etre lier
//@return string: l'UUID généré
/**
 * Quelques fonctions utilitaires que je ne sais pas ou mettre....
 *
 */ function generateUUID() {
    var __uuid_date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var d = __uuid_date;
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
;
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/utils.js.map

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_component__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: 'test',
        component: __WEBPACK_IMPORTED_MODULE_2__test_component__["a" /* TestComponent */]
    }
];
var HeroRoutingModule = (function () {
    function HeroRoutingModule() {
    }
    return HeroRoutingModule;
}());
HeroRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], HeroRoutingModule);

//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/test.routing.js.map

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/maelle/workspace/appDatabase/src/environment.js.map

/***/ }),
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: space-around;\n      -ms-flex-align: space-around;\n          align-items: space-around;\n  padding: 10px 0;\n  border-top: 1px dashed #E3E3E3;\n  border-bottom: 1px dashed #E3E3E3; }\n  content .present {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0;\n    margin: 0 20px;\n    border-radius: 5px; }\n    content .present header {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      content .present header img {\n        width: 128px;\n        height: 128px; }\n      content .present header .infos {\n        padding: 0 10px; }\n        content .present header .infos p {\n          text-align: right; }\n    content .present a {\n      display: block;\n      text-align: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".invisible {\n  display: none !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".group {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-bottom: 20px;\n  border-bottom: 1px dashed #3E3E3E; }\n  .group .index-infos {\n    margin-left: 10px; }\n    .group .index-infos .name {\n      font-weight: bold;\n      font-size: 1.3em; }\n    .group .index-infos div {\n      display: float;\n      float: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#drop_zone {\n  border: 2px dashed #bbb;\n  border-radius: 5px;\n  padding: 25px;\n  text-align: center;\n  font: 20pt bold 'Vollkorn';\n  color: #bbb; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".group {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-bottom: 20px;\n  border-bottom: 1px dashed #3E3E3E; }\n  .group .index-infos {\n    margin-left: 10px; }\n    .group .index-infos .name {\n      font-weight: bold;\n      font-size: 1.3em; }\n    .group .index-infos div {\n      display: float;\n      float: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".main-menu {\n  min-width: 50px;\n  min-height: 50px;\n  max-width: 200px;\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-top: 0;\n  padding: 5px;\n  border-radius: 10px;\n  transition: opacity 0.2s ease;\n  z-index: 9999; }\n\n.main-menu .menu-item {\n  padding: 5px;\n  font-size: 1.2em;\n  cursor: pointer; }\n  .main-menu .menu-item a {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    .main-menu .menu-item a span {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0;\n      display: inline-block; }\n\n.main-menu .menu-item:hover {\n  color: #16a7f3; }\n\n.main-menu .material-icons {\n  position: relative;\n  top: 2px;\n  margin-right: 5px; }\n\n.visible {\n  display: block;\n  z-index: 9999;\n  opacity: 1; }\n\n.invisible {\n  display: none;\n  z-index: 0;\n  opacity: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".field {\n  position: relative;\n  border: none;\n  border-bottom: 1px dashed #3E3E3E;\n  cursor: move; }\n  .field.notDraggable {\n    cursor: default; }\n  .field p {\n    margin: 1px;\n    text-align: right; }\n  .field .composite {\n    margin-left: 10px;\n    border-left: 1px solid #BEBEBE; }\n    .field .composite div {\n      padding-left: 5px; }\n\n:host:last-child .field {\n  border: none !important; }\n\n.floater {\n  display: float;\n  float: right;\n  position: relative;\n  right: 0;\n  padding-left: 20px; }\n\n.fab {\n  background: transparent;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  text-align: center;\n  z-index: 3;\n  position: absolute;\n  left: 2px;\n  display: inline-block;\n  cursor: default; }\n\n.fab span {\n  vertical-align: middle; }\n\n.fab.child {\n  background: white;\n  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.25);\n  padding: 2px;\n  opacity: 0;\n  transition: left 0.2s ease, opacity 0.2s ease;\n  z-index: 0; }\n\n.first, .second {\n  display: block !important;\n  opacity: 1 !important;\n  z-index: 9999; }\n\n.first {\n  left: 30px !important; }\n\n.second {\n  left: 66px !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".element {\n  position: absolute;\n  border: 1px solid #3E3E3E;\n  background-color: #fbfbfb;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-width: 50px;\n  min-height: 50px;\n  max-width: 400px;\n  border-radius: 5px;\n  z-index: 1; }\n  .element .header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    padding: 5px;\n    font-size: 1.3em;\n    font-weight: bold;\n    cursor: move; }\n    .element .header a {\n      position: relative;\n      margin-left: 10px;\n      cursor: pointer; }\n      .element .header a:hover {\n        /*ripple effect*/\n        position: relative;\n        margin-left: 10px;\n        cursor: pointer; }\n      .element .header a:active {\n        -webkit-animation: ripple 0.21s ease;\n        animation: ripple 0.21s ease; }\n    .element .header h3 {\n      cursor: pointer; }\n  .element .comment {\n    padding: 5px; }\n  .element content {\n    padding: 5px; }\n\n.selected {\n  z-index: 1000 !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#main {\n  position: relative;\n  min-width: 100%; }\n\nheader {\n  position: absolute;\n  top: -68px;\n  left: 0;\n  right: 0;\n  padding-bottom: 5px;\n  padding-left: 5px;\n  box-sizing: border-box;\n  z-index: 9999;\n  transition: top 0.5s ease; }\n  @media print {\n    header {\n      background-color: white !important;\n      color: #3E3E3E !important; } }\n  header:hover {\n    top: 0; }\n  header h1 {\n    margin-bottom: 2px; }\n  header h2 {\n    margin: 0; }\n  header .recap {\n    overflow: hidden;\n    /* word-wrap: normal; */\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n    header .recap span {\n      font-size: 1.1em; }\n\n#wrapper {\n  position: relative;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\ncontent {\n  /*fait lui prendre toute la place dispo*/\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n  content .main {\n    /* la zone graphique */\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0; }\n\n.relation {\n  stroke-linejoin: round;\n  stroke-dasharray: 5 5;\n  fill: none;\n  stroke: #3E3E3E; }\n\n.enumerations {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-width: 50px;\n  min-height: 50px;\n  max-width: 400px;\n  border-radius: 5px;\n  z-index: 1;\n  left: 10px;\n  top: 30px;\n  padding: 5px;\n  background-color: #E9E9E9;\n  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.25); }\n  .enumerations div {\n    padding: 5px;\n    border-bottom: 1px dashed #3E3E3E; }\n    .enumerations div.header {\n      font-size: 1.1em; }\n    .enumerations div h3 {\n      margin: 0;\n      cursor: pointer; }\n    .enumerations div span {\n      text-align: right;\n      display: block;\n      width: 100%; }\n    .enumerations div:last-child {\n      border: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = "<div class=\"about\">\n    <content>\n        <div class=\"present\">\n            <header>\n                <img src=\"https://avatars1.githubusercontent.com/u/26115418?v=3&s=460\">\n                <div class=\"infos\">\n                    <h2>Lahitte Mathieu</h2>\n                    <p>javascript, SQL</p>\n\n                </div>\n            </header>\n            <p>\"Patience, patience dans l'azur. Chaque atome de silence est la chance d'un fruit mûr.\" H.Reeves</p>\n            <a href=\"mailto:greta.lahitte@outlook.fr\">contact me.</a>\n        </div>\n        <div class=\"present\">\n            <header>\n                <img src=\"https://avatars2.githubusercontent.com/u/17245172?v=3&s=460\">\n                <div class=\"infos\">\n                    <h2>Stéphane Ponteins</h2>\n                    <p>Typescript, Angular2</p>\n                </div>\n            </header>\n            <p>un petit texte de presentation un petit texte de presentation</p>\n            <a href=\"mailto:???\">contact me.</a>\n        </div>\n    </content>\n    <div class=\"commands\" >\n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">OK, thanks guys!</button>      \n    </div>\n</div>\n"

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "<form #fieldForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(fieldForm)\">\n    <content>\n        <label>Field name *</label>\n        <input  type=\"text\" #Fname=\"ngModel\" name=\"field_name\" [(ngModel)]=\"tmp.name\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\" autofocus #focusable>\n        <div [hidden]=\"Fname.valid || Fname.pristine\"\n             class=\"error\">\n          Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n        </div>\n        <label>Field comment:</label>\n        <textarea name=\"field_comment\" [(ngModel)]=\"tmp.comment\"></textarea>\n        <label>Field type:</label>\n        <select [disabled]=\"tmp.is_reference\" name=\"field_type\" #Ftype=\"ngModel\" [disabled]=\"newType.checked\" [(ngModel)]=\"tmp.type\" required>\n            <option *ngFor=\"let type of types\" [value]=\"type\">{{type}}</option>\n        </select>\n        <div [hidden]=\"Ftype.valid || Ftype.pristine\"\n             class=\"error\">\n          You must select a data type.\n        </div>\n        <div [ngSwitch]=\"tmp.type | extratype\">\n            <div *ngSwitchCase=\"'LENGTH'\">\n                <label>Size:</label>\n                <input [disabled]=\"tmp.is_reference\"  type='number' min=\"0\" [(ngModel)]=\"tmp.type_extras.length\" name=\"ex_ty_length\">\n            </div>\n            <div *ngSwitchCase=\"'MINMAX'\">\n                <label>Precision:</label>\n                <input [disabled]=\"tmp.is_reference\"  type='number' #precision=\"ngModel\" min=\"0\" [(ngModel)]=\"tmp.type_extras.precision\" name=\"ex_ty_min\">\n                <div [hidden]=\"precision.valid || precision.pristine\"\n                    class=\"error\">\n                    Precision must be higher than scale.\n                </div>\n                <label>Scale:</label>\n                <input [disabled]=\"tmp.is_reference\"  type='number' #scale=\"ngModel\" min=\"0\" [(ngModel)]=\"tmp.type_extras.scale\"  name=\"ex_ty_max\">\n                <div [hidden]=\"scale.valid || scale.pristine\"\n             class=\"error\">\n                Scale must be lower than precision.\n            </div>\n            </div>\n            \n\n        </div>\n\n        <label>\n            <input [disabled]=\"tmp.is_reference\" type=\"checkbox\" [(ngModel)]=\"make_custom\" #newType name=\"new_type\">Create custom ENUM\n        </label>\n        <div class=\"enum-group\">\n            <label>Type name:</label>\n            <input #NTname=\"ngModel\" [disabled]=\"!newType.checked\" type=\"text\" name=\"enum_name\" [(ngModel)]=\"custom_type.key\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]*$\">\n            <div [hidden]=\"!newType.checked || (NTname.valid || NTname.pristine)\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]*$\n            </div>\n            <label>Type values (comma separated):</label>\n            <textarea #tvalues=\"ngModel\" [disabled]=\"!newType.checked\" name=\"enum_vals\" [(ngModel)]=\"custom_type.values\" required pattern=\"^([a-zA-Z0-9_]+,)*[a-zA-Z0-9_]+$\"></textarea>\n            <div [hidden]=\"tvalues.valid || tvalues.pristine\"\n             class=\"error\">\n                Values are required, and must match: ^([a-zA-Z0-9_],)*[a-zA-Z0-9_]+$\n            </div>\n\n            \n        </div>\n        <label>Default Value:</label>\n        <input [disabled]=\"tmp.is_reference\" type=\"text\" name=\"field_default\" [(ngModel)]=\"tmp.default_value\">\n        \n        \n\n        <div class=\"check-group\">\n            <label [ngClass]=\"table | has_PK:field?.primary_key\">\n                <input type=\"checkbox\" [disabled]=\"tmp.is_reference\"  [(ngModel)]=\"tmp.primary_key\" name=\"field_pk\">Primary Key\n            </label>\n            <label>\n                <input type=\"checkbox\" [disabled]=\"tmp.is_reference\" [(ngModel)]=\"tmp.index\" name=\"field_index\">INDEX\n            </label>\n            <label>\n                <input type=\"checkbox\"[disabled]=\"tmp.is_reference\" [(ngModel)]=\"tmp.not_null\" name=\"field_null\">NOT NULL\n            </label>\n            <label>\n                <input type=\"checkbox\" [disabled]=\"tmp.is_reference\" [(ngModel)]=\"tmp.unique\" name=\"field_index\">UNIQUE\n            </label>\n        </div>\n        <label>Check Constraint:</label>\n        <input type=\"text\" [disabled]=\"tmp.is_reference\" name=\"field_check\" [(ngModel)]=\"tmp.check\">\n\n    </content>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\" *ngIf=\"!tmp.id\" >\n        <button [disabled]=\"!fieldForm.form.valid\"  class=\"invert\" type=\"submit\">Create new field</button> \n        <button [disabled]=\"!fieldForm.form.valid\"  (click)=\"addfield=true\"  class=\"invert\" type=\"submit\">Create & add another</button> \n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n    </div>\n    <div class=\"commands\" *ngIf=\"tmp.id\" >\n        <button [disabled]=\"!fieldForm.form.valid\"  class=\"invert\" type=\"submit\">Update field</button> \n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button> \n    </div>\n</form>\n"

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = "<form #pkForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(pkForm)\">\n        <content>\n            <label>PK name:</label>\n            <input  type=\"text\" #Fname=\"ngModel\" name=\"index_name\" [required]=\"index.fields.length!=1\" [(ngModel)]=\"index.name\" pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\" autofocus>\n            <div [hidden]=\"Fname.valid || Fname.pristine\"\n             class=\"error\">\n                Name is required for composite key, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n            </div>\n\n\n            <!-- les cles primaires depend si en a deja une ou pas... \n            <input type=\"checkbox\" name=\"add_primary\">Add auto-increment primary key (name: id)-->\n            <label>Select fields for primary key:</label>\n            <label *ngFor=\"let field of table.fields | pure_fields; let i = index\">\n                <input type=\"checkbox\" [name]=\"'field_'+i\" [value]=\"field.id\" \n                [checked]=\"index.fields.indexOf(field)>=0\"\n                (change)=\"updateCheckedOptions(field, $event)\">{{field.name}}\n            </label>\n            \n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!pkForm.form.valid || index.fields.length < 2\"  class=\"invert\" type=\"submit\">Create Primary Key</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>\n"

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = " <form #dlgForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n        <content>\n            <label>Table name:</label>\n            <input  type=\"text\" name=\"table_name\" [(ngModel)]=\"table.name\" required autofocus>\n            <label>Comment:</label>\n            <textarea type=\"text\" name=\"table_comment\" [(ngModel)]=\"table.comment\" ></textarea>\n\n            <!-- les cles primaires depend si en a deja une ou pas... -->\n            <input type=\"checkbox\" name=\"add_primary\" [(ngModel)]=\"add_primary\">Add auto-increment primary key (name: id)\n\n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!dlgForm.form.valid\"  class=\"invert\" type=\"submit\">Create Table</button> \n            <button [disabled]=\"!dlgForm.form.valid\"  (click)=\"addfield=true\"  class=\"invert\" type=\"submit\">Create & add Field</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>\n"

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = "<p *ngIf=\"error\" class=\"error\">{{error}}</p>\n<div class=\"commands\" >\n    <button  class=\"invert\" (click)=\"perform_action()\">OK</button> \n    <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n</div>"

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = "<form #constraintForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(constraintForm)\">\n        <content>\n            <label>Constraint name:</label>\n            <input #firstInput select type=\"text\" #cname=\"ngModel\" name=\"c_name\" [(ngModel)]=\"constraint.key\" required  pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\" autofocus>\n            <div [hidden]=\"cname.valid || cname.pristine\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n            </div>\n            <!-- les cles primaires depend si en a deja une ou pas... \n            <input type=\"checkbox\" name=\"add_primary\">Add auto-increment primary key (name: id)-->\n            <label>Check Expression:</label>\n            <textarea #check=\"ngModel\" name=\"c_value\" [(ngModel)]=\"constraint.values\" required></textarea>\n            <div [hidden]=\"check.valid || check.pristine\"\n             class=\"error\">\n                You must enter an expression for check... (valid, if possible)\n            </div>\n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!constraintForm.form.valid\"  class=\"invert\" type=\"submit\">Add Constraint</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>\n"

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = "<form #fieldForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n    <content>\n        \n        <label>Type name:</label>\n        <input #firstInput select #NTname=\"ngModel\" [readonly]=\"enumeration\"  type=\"text\" name=\"enum_name\" [(ngModel)]=\"e.key\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]*$\" autofocus>\n        <div [hidden]=\"NTname.valid || NTname.pristine\"\n            class=\"error\">\n            Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]*$\n        </div>\n        <label>Type values (comma separated):</label>\n        <textarea #tvalues=\"ngModel\"  name=\"enum_vals\" [(ngModel)]=\"e.values\" required pattern=\"^([a-zA-Z0-9_]+,)*[a-zA-Z0-9_]+$\"></textarea>\n        <div [hidden]=\"tvalues.valid || tvalues.pristine\"\n            class=\"error\">\n            Values are required, and must match: ^([a-zA-Z0-9_],)*[a-zA-Z0-9_]+$\n        </div>\n    </content>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\">\n        <button [disabled]=\"!fieldForm.form.valid\"  class=\"invert\" type=\"submit\">Create Type</button> \n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button> \n    </div>\n    \n</form>\n"

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = "<content>\n \n    <pre> <code [innerHTML]='sql_datas | sql_color'></code></pre>\n    <p *ngIf=\"!error && !sql_datas\">Loading sql, please wait...</p>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\" >\n            <a [hidden]=\"!sql_datas\" [download]=\"name+'.sql'\" [href]=\"sql_datas | file_download\"  class=\"invert\">Download file?</a> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Close</button>      \n        </div>\n        \n</content>\n"

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = "<form #indexForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(indexForm)\">\n        <content>\n            <label>Index name:</label>\n            <input #firstInput type=\"text\" name=\"index_name\" [(ngModel)]=\"index.name\" required autofocus>\n            \n            \n            <div *ngIf=\"!index.is_reference\">\n                <!-- les cles primaires depend si en a deja une ou pas... \n                <input type=\"checkbox\" name=\"add_primary\">Add auto-increment primary key (name: id)-->\n                <label>Select fields for index:</label>\n                <label *ngFor=\"let field of table.fields | pure_fields; let i = index\">\n                    <input type=\"checkbox\" [name]=\"'field_'+i\" [value]=\"field.id\" \n                    [checked]=\"index.fields.indexOf(field)>=0\"\n                    (change)=\"updateCheckedOptions(field, $event)\">{{field.name}}\n                </label>\n                <label>Method:</label>\n                <select [(ngModel)]=\"index.method\" name=\"index_method\" required>\n                    <option value=\"btree\">btree</option>\n                    <option value=\"hash\">hash</option>\n                    <option value=\"gist\">gist</option>\n                    <option value=\"gin\">gin</option>\n                </select>\n                <div><input type=\"checkbox\" [(ngModel)]=\"index.unique\" name=\"index_unique\">Set index as unique</div>\n                <input type=\"checkbox\" #indexNull [(ngModel)]=\"index.index_null\" name=\"index_index_null\">Index NULL values\n                <input type=\"checkbox\" [disabled]=\"!indexNull.checked\" [(ngModel)]=\"index.null_first\" name=\"index_null_first\">Sort NULL values first (unchecked: sort last)\n            </div>\n            \n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!indexForm.form.valid || index.fields.length<2\"  class=\"invert\" type=\"submit\">Add index</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>\n"

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = "<form #baseForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n        <content>\n            <label>Base name:</label>\n            <input #firstInput  type=\"text\" #bname=\"ngModel\" name=\"b_name\" [(ngModel)]=\"base.db_name\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\" autofocus>\n            <div [hidden]=\"bname.valid || bname.pristine\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n            </div>\n\n\n            <label>Type:</label>\n            <select [(ngModel)]=\"base.db_type\" name=\"b_method\" required>\n                <option value=\"postgres\">PostgreSQL</option>\n                <option value=\"mysql\">MySQL</option>\n                <option value=\"maria\">MariaDB</option>\n                <option value=\"mongo\">MongoDB</option>\n            </select>\n            <label>Port:</label>\n            <input type=\"number\"  min=\"1\" max=\"65535\" step=\"1\" name=\"b_port\" [(ngModel)]=\"base.db_port\" required>\n            <label>Host:</label>\n            <input #host=\"ngModel\" type=\"text\" name=\"b_host\" [(ngModel)]=\"base.host\" required pattern=\"^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9]))*$\">\n            <div [hidden]=\"host.valid || host.pristine\"\n             class=\"error\">\n                Host is not valid...\n            </div>\n            <label>login:</label>\n            <input type=\"text\" #log=\"ngModel\" name=\"b_log\" [(ngModel)]=\"base.login\" required>\n            <div [hidden]=\"log.valid || log.pristine\"\n             class=\"error\">\n                You must provide a login\n            </div>\n            <label>Password:</label>\n            <input type=\"text\" name=\"b_pswd\" [(ngModel)]=\"base.passwrd\">\n            \n\n\n            <!-- les contraintes de la table -->\n            <div class=\"group\">Custom Types:\n                <div *ngFor=\"let enum of base.enumerations\">\n                    <div  class=\"index-infos\">\n                        <span  class=\"name\">{{enum.key}}</span>(<span >{{enum.values}}</span>)\n                        <div>\n                            <a class=\"round\" (click)=\"updateEnum(enum)\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                            <a class=\"round\" (click)=\"deleteEnum(enum)\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                        </div>  \n                    </div>\n                </div>\n            \n                \n            </div>\n\n\n\n            \n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button class=\"invert\" type=\"button\" (click)=\"newEnum()\" type=\"button\">Add new Custom Type</button>\n            <button [disabled]=\"!baseForm.form.valid\"  class=\"invert\" type=\"submit\">Create Base</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>\n"

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = "<content>\n \n    <div class=\"commands\" >\n         \n             <a [hidden]=\"!project\" [download]=\"name+'.json'\" [href]=\"project | file_download\"  class=\"invert\">Download file?</a> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Close</button>      \n        </div>\n        \n</content>\n"

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = "<content>\n \n    <div class=\"commands\" >\n         \n            <div (dragover)=\"false\" (dragend)=\"false\" (drop)=\"handleDrop($event)\" id=\"drop_zone\">   Drop files here   </div>\n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Close</button>      \n        </div>\n        \n</content>\n"

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = "<form #dlgForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(dlgForm)\">\n    <content>\n        <label>Table name:</label>\n        <input #firstInput type=\"text\" #tname=\"ngModel\" name=\"table_name\" [(ngModel)]=\"table_cpy.name\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\" autofocus>\n        <div [hidden]=\"tname.valid || tname.pristine\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n        </div>\n\n        <label>Comment:</label>\n        <textarea type=\"text\" name=\"table_comment\" [(ngModel)]=\"table_cpy.comment\" ></textarea>\n\n        \n\n        <!-- les contraintes de la table -->\n        <div class=\"group\">Table Constraints:\n        <div *ngFor=\"let index of table_cpy.constraints\">\n            <div  class=\"index-infos\">\n                <span  class=\"name\">{{index.key}}</span>(<span >{{index.values}}</span>)\n                <div>\n                    <a class=\"round\" (click)=\"updateConstraint(index)\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                    <a class=\"round\" (click)=\"deleteConstraint(index)\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                </div>  \n            </div>\n        </div>\n        \n        <button class=\"invert\" type=\"button\" (click)=\"newConstraint()\">Add new Table Constraint</button>\n        </div>\n    </content>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\" >\n        <button [disabled]=\"!dlgForm.form.valid\"  class=\"invert\" type=\"submit\">OK</button> \n             \n    </div>\n</form>\n"

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-menu invert shadowed\" [style]=\"descriptor.coords | safeCSS\">\n    <!-- les menus necessaires pour afficher les differentes options pour une table -->    \n        <div class=\"menu-item\"  *ngFor=\"let item of descriptor.menus\" [hidden]=\"item.enabled == true\">\n            <a  (click)=\"onClick(item)\"><i class=\"material-icons\">{{item.icon}}</i>\n            <span>{{item.label}}</span></a>\n        </div>\n        \n</div>"

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = "<div >\n    <!--div #fieldElem class=\"field\" [class.notDraggable]=\"field.unique !=true && field.primary_key !=true\"  [draggable]=\"field.unique ==true || field.primary_key ==true\" (dragstart)=\"doStartDrag($event)\" (dragend)=\"doStopDrag($event)\"-->                    \n    <div #fieldElem class=\"field\" draggable=\"true\" (dragstart)=\"doStartDrag($event)\" (dragend)=\"doStopDrag($event)\"\n    (dragenter)=\"skip_evt($event)\"\n                  (dragover)=\"skip_evt($event)\"\n                  (dragleave)=\"skip_evt($event)\"\n                  (drop)=\"doDrop($event)\">                    \n        <h3 [id]=\"field.id\"  >\n            <a (click)=\"showItemProperty($event)\" >{{field.name}}</a>\n            <i class=\"material-icons\" *ngIf=\"field.is_reference\" title=\"Reference\" >link</i>\n            <i class=\"material-icons\" *ngIf=\"field.primary_key\" title=\"Primary Key\">vpn_key</i>\n            <i class=\"material-icons\" *ngIf=\"field.index\" title=\"Index\" >format_list_numbered</i>\n            <i class=\"material-icons\" *ngIf=\"field.unique\" title=\"Unique\">looks_one</i>\n            \n            <div *ngIf=\"!field.fields\" class=\"floater\">\n                <a class=\"fab child\" [class.first]=\"show_fabs\" (click)=\"updateField()\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                <a class=\"fab child\" [class.second]=\"show_fabs\" (click)=\"deleteField()\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                <a class=\"fab\" (click)=\"show_fabs=!show_fabs\"><i class=\"material-icons rippler\">keyboard_arrow_right</i></a>\n            </div> \n            <div *ngIf=\"field.fields\" class=\"floater\">\n                <a class=\"fab child\" [class.first]=\"show_fabs\" (click)=\"updateComposite()\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                <a class=\"fab child\" [class.second]=\"show_fabs\" (click)=\"deleteField()\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                <a class=\"fab\" (click)=\"show_fabs=!show_fabs\"><i class=\"material-icons rippler\">keyboard_arrow_right</i></a>\n            </div> \n        </h3>\n        \n        \n        \n        <p *ngIf=\"field.comment\">{{field.comment}}</p>    \n        <div class=\"composite\" *ngIf=\"field.fields\">\n            <div *ngFor=\"let f of field.fields\">\n                {{f.name}}\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = "\n<div #tableElem class=\"shadowed element\" [class.selected]=\"table.selected\" [style]=\"table.coords | safeCSS\" \n                    (dragenter)=\"skip_evt($event)\"\n                  (dragover)=\"skip_evt($event)\"\n                  (dragleave)=\"skip_evt($event)\"\n                  (drop)=\"doDrop($event)\">\n                  \n    <div class=\"header invert\"\n        (mousedown)=\"startDrag($event)\"\n        >\n        <span>{{table.name}}</span>\n        <a (click)=\"showMenu($event)\"><i class=\"material-icons rippler\">menu</i></a>\n    </div>\n    <div class=\"comment\" *ngIf=\"table.comment\">\n        {{table.comment}}\n    </div>\n    <content>\n        \n        <field-cmp *ngFor=\"let field of table.fields\" [field]=\"field\" [table]=\"table\"></field-cmp>\n        \n    </content>\n    <footer>\n\n    </footer>\n</div>\n\n\n"

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" [style]=\"work_size | widthHeight\">\n<header class=\"invert\">\n    <h1>{{title}}</h1>\n    <h2>{{slogan}}</h2>\n    <div>{{database | dbinfos }}</div>\n    \n    <a routerLink=\"/test\">Test</a>\n</header>\n<div id=\"wrapper\" #wrapper>\n<content (mousemove)=\"drag($event)\" (mouseup)=\"stop_drag($event)\" (click)=\"clearMenu()\" (contextmenu)=\"showContextMenu($event)\">   \n    \n    <div class=\"main\">\n        <!--div class=\"enumerations\" *ngIf=\"database?.enumerations\">\n            <div class=\"header\">Enumerations</div>\n            <div *ngFor=\"let enumeration of database?.enumerations\">\n                <h3 class=\"title\" title=\"Click to edit\" (click)=\"showEnumDlg(enumeration)\">{{enumeration.key}}</h3><span>({{enumeration.values}})</span>\n            </div>\n        </div-->\n\n\n        <table-cmp *ngFor=\"let table of database?.tables\" [table]=\"table\" (onSelectedTable)=\"setSelectedTable($event)\"\n        (onNewRelation)=\"setNewRelation($event)\"></table-cmp>\n\n        <menu-cmp *ngIf=\"descriptor\" [descriptor]=\"descriptor\"></menu-cmp>\n        \n    </div>\n    <svg width=\"100%\" height=\"100%\">\n        \n        <svg:g *ngFor=\"let relation of database?.relations\" >            \n            <polyline class=\"relation\" [attr.points]=\"relation.coords | relation2points\"/>\n        </svg:g>\n        \n    </svg>\n    <sql-dlg *ngIf=\"dlgDescriptor\" [descriptor]=\"dlgDescriptor\"></sql-dlg>\n    \n</content>\n</div>\n</div>"

/***/ }),
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(58);


/***/ })
],[168]);
//# sourceMappingURL=main.bundle.js.map