webpackJsonp([0,3],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__datas_base__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datas_field__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__datas_relation__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__datas_index__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__datas_enumeration__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__datas_utils__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FIELD_TYPES; });
/* unused harmony export COLUMN_CONSTRAINTS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBProvider; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FIELD_TYPES = [
    "bigint", "bigserial", "bit", "bit varying", "boolean", "box", "bytea",
    "character varying", "character", "cidr", "circle", "date", "double precision",
    "inet", "integer", "interval", "line", "lseg", "macaddr", "money", "numeric",
    "path", "point", "polygon", "real", "smallint", "serial", "text", "time", "time with timezone",
    "timestamp", "timestamp (TZ)", "tsquery", "tsvector", "txid_snapshot", "uuid", "xml"
];
var COLUMN_CONSTRAINTS = [
    "NOT NULL", "UNIQUE", "PRIMARY KEY",
];
var DBProvider = DBProvider_1 = (function () {
    function DBProvider() {
        this.db_subject = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
    }
    DBProvider.prototype.loadDummyBase = function () {
        //cree une base toute simple pour les tests...
        //le field pour l'ID client de la table 1
        var _db = new __WEBPACK_IMPORTED_MODULE_1__datas_base__["a" /* Base */]({
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
        var table = new __WEBPACK_IMPORTED_MODULE_2__datas_table__["a" /* Table */]({
            name: "GretaSQLTool",
            coords: {
                x: 400,
                y: 200
            },
            comment: "Thank's for using GretaSQLTool! Click on the burger menu overthere to access table context and add fields, constraints... or anywhere to access main context menu and add new tables or export to sql file",
            fields: [
                new __WEBPACK_IMPORTED_MODULE_3__datas_field__["a" /* Field */]({
                    name: "a_simple_field",
                    comment: "This is a simple field, click on the arrow to get the context menu and edit it's properties"
                }),
                new __WEBPACK_IMPORTED_MODULE_3__datas_field__["a" /* Field */]({
                    name: "a_simple_id",
                    comment: "This is a primary key, there can only be one, and it's UNIQUE, so you can drag it to another table to make a relation between them",
                    primary_key: true,
                }),
                new __WEBPACK_IMPORTED_MODULE_3__datas_field__["a" /* Field */]({
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
    DBProvider.prototype.setCurrentBase = function (base) {
        //validation de la base...
        this._db = base; //previent?
        this.db_subject.next(base);
    };
    DBProvider.prototype.createEmptyTable = function () {
        return new __WEBPACK_IMPORTED_MODULE_2__datas_table__["a" /* Table */]({});
    };
    /**
     * ajoute une nouvelle table a la base, verifie la validité des données...
     */
    DBProvider.prototype.add_table = function (table) {
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
    DBProvider.prototype.removeTable = function (table) {
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
    DBProvider.prototype.isDataTypeFree = function (type) {
        //verifie que n'existe pas deja
        for (var _i = 0, _a = this._db.enumerations; _i < _a.length; _i++) {
            var en = _a[_i];
            if (en.key == type.key)
                return false;
        }
        return true;
    };
    DBProvider.prototype.addDataType = function (type) {
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
    DBProvider.prototype.removeDataType = function (type) {
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
    DBProvider.prototype.addFieldTo = function (field, table) {
        //ajoute un id
        field.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__datas_utils__["a" /* generateUUID */])();
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
    DBProvider.prototype.removeField = function (infos) {
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
    DBProvider.prototype.addPKFieldTo = function (field, table) {
        this.addFieldTo(field, table);
        var p = new __WEBPACK_IMPORTED_MODULE_5__datas_index__["a" /* Index */]({});
        p.fields = [field];
        p.name = field.name;
        //p.is_unique = true;
        p.method = "btree";
        table.pk = p; //enregistrer
        //comme le field est la clé, on en profite 
        field.primary_key = true;
        //field.unique = true;
    };
    DBProvider.prototype.getTableById = function (id) {
        for (var _i = 0, _a = this._db.tables; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.id == id)
                return t;
        }
    };
    DBProvider.prototype.makeRelation = function (from, to_table) {
        //crée un nouveau element dans la table ciblfr
        var cf = null;
        if (from.field.fields) {
            //un index composite, a voir....
            //cree les champs necessaires dans la table?
            cf = new __WEBPACK_IMPORTED_MODULE_5__datas_index__["a" /* Index */]({
                name: from.field.name + "_" + from.table.name,
                type: from.field.type,
                fields: from.field.fields
            });
        }
        else {
            //un champs simple
            cf = new __WEBPACK_IMPORTED_MODULE_3__datas_field__["a" /* Field */]({
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
        var relation = new __WEBPACK_IMPORTED_MODULE_4__datas_relation__["a" /* Relation */]({
            id: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__datas_utils__["a" /* generateUUID */])(),
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
    DBProvider.prototype.dropConstraint = function (what) {
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
    /**
     * Convertie l'objet Base en json-compliant pour le webworker
     * Permet d'eviter les erreurs de redondances cycliques
     */
    DBProvider.prototype.convertToJSON = function (base) {
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
    DBProvider.prototype.convertFromJSON = function (jstr) {
        var desc = JSON.parse(jstr);
        var composites = [];
        //creation du bouzin....
        var base = new __WEBPACK_IMPORTED_MODULE_1__datas_base__["a" /* Base */]();
        base.db_name = desc.db_name;
        base.db_port = desc.db_port;
        base.db_type = desc.db_type;
        base.host = desc.host;
        base.login = desc.login;
        base.passwrd = desc.passwrd;
        //les type enums 
        for (var _i = 0, _a = Object.keys(desc.enumerations); _i < _a.length; _i++) {
            var enums = _a[_i];
            var e = new __WEBPACK_IMPORTED_MODULE_6__datas_enumeration__["a" /* Enumeration */]();
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
            var t = new __WEBPACK_IMPORTED_MODULE_2__datas_table__["a" /* Table */]();
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
                    f = new __WEBPACK_IMPORTED_MODULE_5__datas_index__["a" /* Index */]();
                    //index only datas 
                    f.method = fd.method;
                    f.index_null = fd.index_null;
                    f.null_first = fd.null_first;
                    //les fields references...
                    if (!fd.is_reference)
                        composites.push({ field: f, table: t, ref: fd.fields });
                }
                else
                    f = new __WEBPACK_IMPORTED_MODULE_3__datas_field__["a" /* Field */]();
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
                f.fields.push(DBProvider_1.getFieldByName(r, t));
            }
        }
        for (var _k = 0, _l = desc.relations; _k < _l.length; _k++) {
            var rel = _l[_k];
            var r = new __WEBPACK_IMPORTED_MODULE_4__datas_relation__["a" /* Relation */]();
            //recupe les infos depuis from et to 
            var ft = DBProvider_1.getTableByName(rel.from.table, base);
            var ff = DBProvider_1.getFieldByName(rel.from.field, ft);
            var tt = DBProvider_1.getTableByName(rel.to.table, base);
            var tf = DBProvider_1.getFieldByName(rel.to.field, tt);
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
    DBProvider.getTableByName = function (name, base) {
        for (var _i = 0, _a = base.tables; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.name == name)
                return t;
        }
        console.log("unknown table name: " + name);
        return null;
    };
    DBProvider.getFieldByName = function (name, table) {
        for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.name == name)
                return t;
        }
        console.log("unknown field name: " + name, table);
        return null;
    };
    return DBProvider;
}());
DBProvider = DBProvider_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DBProvider);

var DBProvider_1;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/db.provider.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__ = __webpack_require__(2);
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
    function DialogProvider(_db) {
        this._db = _db;
        this.dlg = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._history = [];
    }
    DialogProvider.prototype.getDialogObservable = function () {
        return this.dlg.asObservable();
    };
    DialogProvider.prototype.clearDialogs = function () {
        this._history = []; //vide l'historique
        this.dlg.next(null);
    };
    DialogProvider.prototype.back = function () {
        var last = null;
        if (this._history.length > 0) {
            //pop les 2 derniers
            this._history.pop(); //actuel
            last = this._history[this._history.length - 1];
        }
        this.dlg.next(last);
    };
    DialogProvider.prototype.next = function (dlg) {
        this._history.push(dlg);
        this.dlg.next(dlg);
    };
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
    DialogProvider.prototype.pushExportDialog = function () {
        var desc = {
            title: "Export your base",
            texte: "Export your base to  SQL",
            type: "EXPORT"
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
    DialogProvider.prototype.pushEditBaseDialog = function () {
        var desc = {
            title: "Base Properties",
            texte: "Edit and change base properties, but take care...",
            type: "CREATE_BASE",
            target: this._db._db
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */]) === "function" && _a || Object])
], DialogProvider);

var _a;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/dialog.provider.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "content {\n  width: 100%; }\n  content label {\n    display: block;\n    font-weight: bold; }\n  content input, content textarea, content select {\n    width: 100%;\n    padding: 5px;\n    margin-bottom: 10px; }\n    content input.ng-valid[required], content input .ng-valid.required, content textarea.ng-valid[required], content textarea .ng-valid.required, content select.ng-valid[required], content select .ng-valid.required {\n      border-left: 5px solid #42A948;\n      /* green */ }\n    content input.ng-invalid:not(form), content textarea.ng-invalid:not(form), content select.ng-invalid:not(form) {\n      border-left: 5px solid #a94442;\n      /* red */ }\n  content input[type=\"checkbox\"] {\n    display: inline;\n    width: auto; }\n  content select {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none;\n    background-color: white;\n    background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 99% 0;\n    height: 29px;\n    overflow: hidden;\n    border: 1px solid #ccc;\n    font-size: 16px; }\n\n.check-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .check-group * {\n    margin: 10px 10px; }\n\n.commands {\n  margin: 10px 0;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\nbutton, a {\n  min-width: 90px;\n  cursor: pointer;\n  border-radius: 5px;\n  font-family: Poiret cursive;\n  /*color: #ffffff;*/\n  border: none;\n  color: #E3E3E3;\n  padding: 10px 20px 10px 20px;\n  text-decoration: none;\n  text-transform: uppercase;\n  margin: 5px; }\n  button:hover:not([disabled]), a:hover:not([disabled]) {\n    text-decoration: none;\n    background: #3498db;\n    background-image: linear-gradient(to bottom, #3498db, #2980b9); }\n  button:disabled, a:disabled {\n    background-color: #cac9c9; }\n    button:disabled:hover, a:disabled:hover {\n      background-color: #cac9c9; }\n\na.round {\n  min-width: 0;\n  padding: 0;\n  color: #3E3E3E; }\n  a.round:hover:not([disabled]) {\n    text-decoration: none;\n    background: transparent; }\n  a.round:hover:disabled {\n    background-color: #cac9c9; }\n    a.round:hover:disabled:hover {\n      background-color: #cac9c9; }\n\n.error {\n  background: #f59694;\n  color: #400909;\n  padding: 10px;\n  font-size: 1em;\n  border-radius: 5px;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Table; });

var Table = (function () {
    function Table(args) {
        //relations: Array<Relation>;
        //les contraintes....
        this.constraints = [];
        args = args || {};
        this.id = args.id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* generateUUID */])();
        this.name = args.name;
        this.comment = args.comment;
        this.coords = args.coords || { x: 0, y: 0 };
        this.selected = args.selected || false;
        this.fields = args.fields || [];
        //this.relations = args.relations || [];
    }
    Object.defineProperty(Table.prototype, "name", {
        get: function () { return this.__name; },
        set: function (v) {
            //sinon, OK
            this.__name = v;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.addIndex = function (index) {
        if (!index.id)
            index.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* generateUUID */])();
        if (index.fields.length == 1) {
            var fi = index.fields[0];
            fi.index = true;
            fi.unique = index.unique;
            //this.fields.push(fi);
        }
        else {
            //verifications....
            var n = index.name;
            for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
                var t = _a[_i];
                if (t.name == n)
                    throw "Invalid name: index must be unique in table!";
            }
            index.index = true;
            this.fields.push(index);
        }
        //this.indexes.push(index);
    };
    Table.prototype.addConstraint = function (c) {
        var n = c.key;
        for (var _i = 0, _a = this.constraints; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.key == n)
                throw "Invalid name: constraint must be unique in table!";
        }
        this.constraints.push(c);
    };
    Table.prototype.removeConstraint = function (c) {
        var i = this.constraints.indexOf(c);
        if (i >= 0)
            this.constraints.splice(i, 1);
    };
    Table.prototype.addCompositePK = function (index) {
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
            this.fields.push(index);
        }
        //marque les clés ???
        this.pk = index;
    };
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

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/table.js.map

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(14);
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

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/field.js.map

/***/ }),
/* 13 */
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

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/enumeration.js.map

/***/ }),
/* 14 */
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
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/utils.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(2);
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
                this._dlg.pushEditBaseDialog();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */]) === "function" && _b || Object])
], MenuProvider);

var _a, _b;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/menu.provider.js.map

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field__ = __webpack_require__(12);
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

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/index.js.map

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base; });
var Base = (function () {
    function Base(args) {
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

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/base.js.map

/***/ }),
/* 26 */
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
                console.log(e);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WorkerProvider);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/worker.provider.js.map

/***/ }),
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
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 37;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reflect_metadata__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reflect_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reflect_metadata__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_es6_shim__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_es6_shim___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_es6_shim__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_zone_js__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_zone_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_zone_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_module__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__(71);







if (__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_5__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/main.js.map

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_menu_provider__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import {ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
var AppComponent = (function () {
    function AppComponent(_db, _menu, _dlg) {
        this._db = _db;
        this._menu = _menu;
        this._dlg = _dlg;
        this.title = 'GRETA SQL Tool';
        this.slogan = "a sql tool that's super cool!";
        this.selectedTable = null;
        this.shift_left = 0;
        this.shift_top = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
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
    AppComponent.prototype.setSelectedTable = function (el) {
        console.log("setSelectedTable");
        this.selectedTable = el.cible;
        this.shift_left = el.shift_left;
        this.shift_top = el.shift_top;
    };
    AppComponent.prototype.drag = function (evt) {
        if (this.selectedTable) {
            evt.preventDefault();
            evt.stopPropagation();
            var __cible = this.selectedTable;
            //nouvelles coords de la table
            __cible.coords = { x: evt.clientX + this.shift_left,
                y: evt.clientY + this.shift_top };
        }
    };
    /**
     * Event au mouse up: supprime les events au documnt et
     * relache la cible
     * @param evt: MouseUpEvent
     */
    AppComponent.prototype.stop_drag = function (evt) {
        if (this.selectedTable) {
            var __cible = this.selectedTable;
            __cible.selected = false;
            //remet en place une derniere fois...
            __cible.coords = { x: evt.clientX + this.shift_left,
                y: evt.clientY + this.shift_top };
            this.selectedTable = null;
            //recalcule parent height and width
            var maxX = 0, maxY = 0;
            for (var _i = 0, _a = this._db._db.tables; _i < _a.length; _i++) {
                var rel = _a[_i];
                maxX = maxX > rel.coords.x ? maxX : rel.coords.x + 100;
                maxY = maxY > rel.coords.y ? maxY : rel.coords.y + 100;
            }
            //redimensionne l'element conteneur
            this.wrapper.nativeElement.width = maxX;
            this.wrapper.nativeElement.height = maxY;
        }
    };
    AppComponent.prototype.clearMenu = function (desc) {
        if (this.descriptor)
            this._menu.clearMenus();
    };
    AppComponent.prototype.showContextMenu = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._menu.pushMainContextMenu(this.database, {
            x: evt.pageX || evt.offsetX,
            y: evt.pageY || evt.offsetY
        });
    };
    //si l'application decide de quitter, tente de sauvegarder l'etat pour la prochaine fois
    AppComponent.prototype.beforeUnloadHander = function (event) {
        // enregistre les datas du formulaire courant???
        this._db.convertToJSON(this.database).then(function (jstr) { return window.localStorage.setItem("gretasql", jstr); });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])("wrapper"),
    __metadata("design:type", Object)
], AppComponent.prototype, "wrapper", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* HostListener */])('window:beforeunload', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppComponent.prototype, "beforeUnloadHander", null);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(90),
        styles: [__webpack_require__(74)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_menu_provider__["a" /* MenuProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_menu_provider__["a" /* MenuProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/app.component.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tables__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_field__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_menu__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dialog__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_db_infos_pipe__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_bypass_css_pipe__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_relation_to_points_pipe__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_has_pk_pipe__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_file_download__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_pure_field_pipe__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_extra_type_pipe__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipes_width_height_pipe__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_menu_provider__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_worker_provider__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_dialogs_dialogs__ = __webpack_require__(54);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// import {RelationComponent} from "./components/relation";















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__pipes_db_infos_pipe__["a" /* DBInfosPipe */],
            __WEBPACK_IMPORTED_MODULE_10__pipes_bypass_css_pipe__["a" /* BypassCSSPipe */],
            __WEBPACK_IMPORTED_MODULE_11__pipes_relation_to_points_pipe__["a" /* Relation2PointsPipe */],
            __WEBPACK_IMPORTED_MODULE_12__pipes_has_pk_pipe__["a" /* HasPrimaryKeyPipe */],
            __WEBPACK_IMPORTED_MODULE_13__pipes_file_download__["a" /* FileDownloadPipe */],
            __WEBPACK_IMPORTED_MODULE_14__pipes_pure_field_pipe__["a" /* PureFieldyPipe */],
            __WEBPACK_IMPORTED_MODULE_15__pipes_extra_type_pipe__["a" /* ExtraTypePipe */],
            __WEBPACK_IMPORTED_MODULE_16__pipes_width_height_pipe__["a" /* WidthHeightPipe */]
        ].concat(__WEBPACK_IMPORTED_MODULE_21__components_dialogs_dialogs__["a" /* default */], [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_tables__["a" /* TableComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_field__["a" /* FieldComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_menu__["a" /* MenuComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_dialog__["a" /* DialogComponent */]
            // RelationComponent
        ]),
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_17__providers_db_provider__["a" /* DBProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_dialog_provider__["a" /* DialogProvider */], __WEBPACK_IMPORTED_MODULE_19__providers_menu_provider__["a" /* MenuProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_worker_provider__["a" /* WorkerProvider */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/app.module.js.map

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialogComponent = (function () {
    // @Output("onCloseDialog") onClose:EventEmitter<any> = new EventEmitter<any>();
    function DialogComponent(_db, _dlg) {
        this._db = _db;
        this._dlg = _dlg;
    }
    DialogComponent.prototype.skip = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    };
    return DialogComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], DialogComponent.prototype, "descriptor", void 0);
DialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-cmp",
        template: __webpack_require__(91),
        styles: [__webpack_require__(75)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object])
], DialogComponent);

var _a, _b;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/dialog.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__ = __webpack_require__(3);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-about",
        template: __webpack_require__(92),
        styles: [__webpack_require__(76), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _a || Object])
], AboutDialog);

var _a;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/about.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_datas_enumeration__ = __webpack_require__(13);
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
        this.types = __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["b" /* FIELD_TYPES */]; //les types de field possibles....
        this.custom_type = new __WEBPACK_IMPORTED_MODULE_5__providers_datas_enumeration__["a" /* Enumeration */]();
        this.make_custom = false;
    }
    AddFieldDialog.prototype.ngOnInit = function () {
        //this.tmp = new Field({id:null});
    };
    AddFieldDialog.prototype.ngOnChanges = function (dt) {
        if (dt.field && dt.field.currentValue) {
            //copy les données necessaires                   
            this.tmp = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__["a" /* Field */]({});
            this.tmp.copy(dt.field.currentValue);
        }
        else {
            this.tmp = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__["a" /* Field */]({ id: null });
        }
    };
    AddFieldDialog.prototype.process_dialog_form = function () {
        //cree la nouvelle table et ajoute
        //suivant le submit...
        this.error = "";
        //copy les données du tmp dans le field courant...
        if (!this.field)
            this.field = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__["a" /* Field */]({ id: null }); //genere un id
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
                    this.tmp = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__["a" /* Field */]({ id: null });
                    this.custom_type = new __WEBPACK_IMPORTED_MODULE_5__providers_datas_enumeration__["a" /* Enumeration */]();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__["a" /* Table */]) === "function" && _a || Object)
], AddFieldDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__["a" /* Field */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_datas_field__["a" /* Field */]) === "function" && _b || Object)
], AddFieldDialog.prototype, "field", void 0);
AddFieldDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-addfield",
        template: __webpack_require__(93),
        styles: [__webpack_require__(77), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], AddFieldDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/add.field.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__ = __webpack_require__(17);
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
        this.index = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]({});
    }
    PKDialog.prototype.ngOnChanges = function (dt) {
        console.log(dt);
        if (dt.field && dt.field.currentValue) {
            //copy les données necessaires                   
            this.index = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]({ id: null });
            var f = dt.field.currentValue;
            this.index.name = f.name;
            //la liste des composites
            this.index.fields = f.fields;
        }
        else {
            this.index = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]({ id: null });
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
            this.table.addCompositePK(this.index);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__["a" /* Table */]) === "function" && _a || Object)
], PKDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]) === "function" && _b || Object)
], PKDialog.prototype, "field", void 0);
PKDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-pk",
        template: __webpack_require__(94),
        styles: [__webpack_require__(78), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], PKDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/add.primary.js.map

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_field__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(2);
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
                var f = new __WEBPACK_IMPORTED_MODULE_1__providers_datas_field__["a" /* Field */]({ name: "id" });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], AddTableDialog.prototype, "coords", void 0);
AddTableDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-addtable",
        template: __webpack_require__(95),
        styles: [__webpack_require__(79), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object])
], AddTableDialog);

var _a, _b;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/add.table.js.map

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__ = __webpack_require__(2);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], ConfirmDialog.prototype, "next", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], ConfirmDialog.prototype, "target", void 0);
ConfirmDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-confirm",
        template: __webpack_require__(96),
        styles: [__webpack_require__(80), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */]) === "function" && _b || Object])
], ConfirmDialog);

var _a, _b;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/confirm.js.map

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_datas_enumeration__ = __webpack_require__(13);
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
        this.constraint = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_enumeration__["a" /* Enumeration */]();
        this.error = null;
    }
    ConstraintDialog.prototype.ngOnChanges = function (dt) {
        console.log(dt.cnt);
        if (dt.cnt && dt.cnt.currentValue) {
            this.constraint = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_enumeration__["a" /* Enumeration */](dt.cnt.currentValue); //fait une copie
        }
    };
    ConstraintDialog.prototype.process_dialog_form = function (form) {
        if (this.cnt) {
            this.table.removeConstraint(this.cnt);
        }
        try {
            this.table.addConstraint(this.constraint);
            this._dlg.back();
        }
        catch (err) {
            this.error = err;
        }
    };
    ConstraintDialog.prototype.cancel = function () {
        this._dlg.back();
    };
    return ConstraintDialog;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_datas_table__["a" /* Table */]) === "function" && _a || Object)
], ConstraintDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__providers_datas_enumeration__["a" /* Enumeration */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_datas_enumeration__["a" /* Enumeration */]) === "function" && _b || Object)
], ConstraintDialog.prototype, "cnt", void 0);
ConstraintDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-constraint",
        template: __webpack_require__(97),
        styles: [__webpack_require__(81), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_db_provider__["a" /* DBProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], ConstraintDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/constraint.js.map

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_enumeration__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dialog_provider__ = __webpack_require__(3);
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
            this.e = new __WEBPACK_IMPORTED_MODULE_1__providers_datas_enumeration__["a" /* Enumeration */](dt.enumeration.currentValue);
        }
        else
            this.e = new __WEBPACK_IMPORTED_MODULE_1__providers_datas_enumeration__["a" /* Enumeration */]();
    };
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_datas_enumeration__["a" /* Enumeration */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_datas_enumeration__["a" /* Enumeration */]) === "function" && _a || Object)
], CustomTypeDialog.prototype, "enumeration", void 0);
CustomTypeDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-customtype",
        template: __webpack_require__(98),
        styles: [__webpack_require__(82), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], CustomTypeDialog);

var _a, _b, _c;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/custom.type.js.map

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_table__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_field__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__show_table_properties__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constraint__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_primary__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__export__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__new_base__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__confirm__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__custom_type__ = __webpack_require__(53);











//toutes les dialogs sont la...
var DIALOGS = [__WEBPACK_IMPORTED_MODULE_0__add_table__["a" /* AddTableDialog */], __WEBPACK_IMPORTED_MODULE_1__about__["a" /* AboutDialog */], __WEBPACK_IMPORTED_MODULE_2__add_field__["a" /* AddFieldDialog */], __WEBPACK_IMPORTED_MODULE_3__show_table_properties__["a" /* ShowTableProperties */], __WEBPACK_IMPORTED_MODULE_4__index__["a" /* IndexDialog */], __WEBPACK_IMPORTED_MODULE_5__constraint__["a" /* ConstraintDialog */],
    __WEBPACK_IMPORTED_MODULE_6__add_primary__["a" /* PKDialog */], __WEBPACK_IMPORTED_MODULE_7__export__["a" /* ExportDialog */], __WEBPACK_IMPORTED_MODULE_8__new_base__["a" /* NewBaseDialog */], __WEBPACK_IMPORTED_MODULE_9__confirm__["a" /* ConfirmDialog */], __WEBPACK_IMPORTED_MODULE_10__custom_type__["a" /* CustomTypeDialog */]];
/* harmony default export */ __webpack_exports__["a"] = DIALOGS;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/dialogs.js.map

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_worker_provider__ = __webpack_require__(26);
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
        this._db.convertToJSON(db).then(function (jstr) {
            return _this._worker.process_SQL(jstr);
        }).then(function (sql) { return _this.sql_datas = sql; })
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'dlg-export',
        template: __webpack_require__(99),
        styles: [__webpack_require__(83), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* DBProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_worker_provider__["a" /* WorkerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_worker_provider__["a" /* WorkerProvider */]) === "function" && _c || Object])
], ExportDialog);

var _a, _b, _c;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/export.js.map

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__ = __webpack_require__(17);
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
        this.index = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]({ id: null });
    }
    IndexDialog.prototype.ngOnChanges = function (dt) {
        if (dt.field && dt.field.currentValue) {
            //copy les données necessaires                   
            this.index = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]({ id: null });
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
            this.index = new __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]({ id: null });
        }
    };
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
            this.table.addIndex(this.index);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */]) === "function" && _a || Object)
], IndexDialog.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_datas_index__["a" /* Index */]) === "function" && _b || Object)
], IndexDialog.prototype, "field", void 0);
IndexDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-index",
        template: __webpack_require__(100),
        styles: [__webpack_require__(84), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object])
], IndexDialog);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/index.js.map

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_base__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(2);
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
            this.base = new __WEBPACK_IMPORTED_MODULE_1__providers_datas_base__["a" /* Base */]({});
            this.copy(this.base, e);
        }
    };
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_datas_base__["a" /* Base */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_datas_base__["a" /* Base */]) === "function" && _a || Object)
], NewBaseDialog.prototype, "editable", void 0);
NewBaseDialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-newbase",
        template: __webpack_require__(101),
        styles: [__webpack_require__(85), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], NewBaseDialog);

var _a, _b, _c;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/new.base.js.map

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(2);
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
        this.table_cpy = new __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */]({});
        if (dt.table && dt.table.currentValue) {
            this.table_cpy.copy(dt.table.currentValue);
        }
    };
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */]) === "function" && _a || Object)
], ShowTableProperties.prototype, "table", void 0);
ShowTableProperties = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "dlg-tableprops",
        template: __webpack_require__(102),
        styles: [__webpack_require__(86), __webpack_require__(4)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _c || Object])
], ShowTableProperties);

var _a, _b, _c;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/show.table.properties.js.map

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_field__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dialog_provider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_db_provider__ = __webpack_require__(2);
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
        if (!this.field.unique && !this.field.primary_key)
            return;
        console.log("OK");
        //event.preventDefault();
        //event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        //transfert les données...
        event.dataTransfer.setData("js/field", this.table.id + " " + this.field.id);
        // this.dragSrc = true;
        // this._app.onDragStarted(true);
    };
    FieldComponent.prototype.doStopDrag = function (evt) {
        event.stopPropagation();
        event.preventDefault();
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
    return FieldComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_datas_field__["a" /* Field */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_datas_field__["a" /* Field */]) === "function" && _a || Object)
], FieldComponent.prototype, "field", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_datas_table__["a" /* Table */]) === "function" && _b || Object)
], FieldComponent.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])("fieldElem"),
    __metadata("design:type", Object)
], FieldComponent.prototype, "fieldElem", void 0);
FieldComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "field-cmp",
        template: __webpack_require__(103),
        styles: [__webpack_require__(87)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_dialog_provider__["a" /* DialogProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_dialog_provider__["a" /* DialogProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_db_provider__["a" /* DBProvider */]) === "function" && _e || Object])
], FieldComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/field.js.map

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_menu_provider__ = __webpack_require__(15);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], MenuComponent.prototype, "descriptor", void 0);
MenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "menu-cmp",
        template: __webpack_require__(104),
        styles: [__webpack_require__(88)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_menu_provider__["a" /* MenuProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_menu_provider__["a" /* MenuProvider */]) === "function" && _a || Object])
], MenuComponent);

var _a;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/menu.js.map

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_menu_provider__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(2);
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
        this.selectedTable = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    TableComponent.prototype.ngOnChanges = function (dt) {
        if (dt.table) {
            this.table.__elem = this.tableElem;
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
        console.log("data-transfert", dt);
        if (dt) {
            var ids = dt.split(" ");
            //recupe la table
            var table = this._db.getTableById(ids[0]);
            if (!table || table == this.table)
                return;
            var field = null;
            for (var _i = 0, _a = table.fields; _i < _a.length; _i++) {
                var f = _a[_i];
                if (f.id == ids[1]) {
                    field = f;
                    break;
                }
            }
            // //teste les indexs
            // if(!field) {
            //     for (let f of table.indexes){
            //         if(f.id == ids[1]) {
            //             field = f;
            //             break;
            //         }
            //     }
            // }
            if (!field)
                return;
            console.log("transferring:");
            console.log(field);
            //sinon, crée une nouvelle relation entre les tables
            //probleme, ai besoin de connaitre la table de depart...
            console.log("make relation");
            this._db.makeRelation({ table: table, field: field }, this.table);
        }
    };
    return TableComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_datas_table__["a" /* Table */]) === "function" && _a || Object)
], TableComponent.prototype, "table", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])("onSelectedTable"),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]) === "function" && _b || Object)
], TableComponent.prototype, "selectedTable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* ViewChild */])("tableElem"),
    __metadata("design:type", Object)
], TableComponent.prototype, "tableElem", void 0);
TableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: "table-cmp",
        template: __webpack_require__(105),
        styles: [__webpack_require__(89)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_menu_provider__["a" /* MenuProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_menu_provider__["a" /* MenuProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* DBProvider */]) === "function" && _d || Object])
], TableComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/tables.js.map

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(8);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'safeCSS' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _a || Object])
], BypassCSSPipe);

var _a;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/bypass.css.pipe.js.map

/***/ }),
/* 63 */
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'dbinfos' })
], DBInfosPipe);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/db.infos.pipe.js.map

/***/ }),
/* 64 */
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'extratype' })
], ExtraTypePipe);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/extra.type.pipe.js.map

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(8);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'file_download' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _a || Object])
], FileDownloadPipe);

var _a;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/file.download.js.map

/***/ }),
/* 66 */
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'has_PK' })
], HasPrimaryKeyPipe);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/has.pk.pipe.js.map

/***/ }),
/* 67 */
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'pure_fields' })
], PureFieldyPipe);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/pure.field.pipe.js.map

/***/ }),
/* 68 */
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
        if (!relation)
            return "";
        //calcule les coords des points du link 
        var r = relation;
        //recup les infos de position
        var fromElem = r.from.field;
        var toElem = r.to.field;
        //fait un link entre les tables
        if (!fromElem.__elem) {
            return; //pas encore rendu
        }
        var e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
        var e2 = toElem.__elem.nativeElement.getBoundingClientRect();
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        //calcule le centre des elements
        var t1 = {
            x: e1.width / 2 + e1.left + scrollX,
            y: e1.height / 2 + e1.top + scrollY
        };
        var t2 = {
            x: e2.width / 2 + e2.left + scrollX,
            y: e2.height / 2 + e2.top + scrollY
        };
        var cfx = (t2.x - t1.x) / 2 + t1.x;
        var cfy = (t2.y - t1.y) / 2 + t1.y;
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
        return t1.x + "," + t1.y + " " + cfx + "," + t1.y + " " + cfx + "," + t2.y + " " + t2.x + "," + t2.y;
        // return this.sanitizer.bypassSecurityTrustStyle(`<svg:polyline stroke-linejoin="round" 
        //     fill="none" 
        //     stroke="#3E3E3E" 
        //     stroke-width:"1" 
        //     stroke-dasharray="5px 5px"  points="${c}"/>`);
    };
    return Relation2PointsPipe;
}());
Relation2PointsPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'relation2points', pure: false }) //ca craint un peu ca...
], Relation2PointsPipe);

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/relation.to.points.pipe.js.map

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(8);
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


var WidthHeightPipe = (function () {
    function WidthHeightPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    WidthHeightPipe.prototype.transform = function (tables) {
        //calcule la taille minimale de la zone de dessin
        var maxX = 0, maxY = 0;
        for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
            var table = tables_1[_i];
            var c = table.__elem.nativeElement.getBoundingClientRect();
            var mx = c.right + window.scrollX;
            var my = c.bottom + window.scrollY;
            maxX = mx > maxX ? mx : maxX;
            maxY = my > maxY ? my : maxY;
        }
        maxX = maxX < window.innerWidth ? window.innerWidth : maxX;
        maxY = maxY < window.innerHeight ? window.innerHeight : maxY;
        return this.sanitizer.bypassSecurityTrustStyle("width:" + maxX + "px; height:" + maxY + "px;");
    };
    return WidthHeightPipe;
}());
WidthHeightPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'widthHeight', pure: false }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _a || Object])
], WidthHeightPipe);

var _a;
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/width.height.pipe.js.map

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Relation; });

var Relation = (function () {
    function Relation(args) {
        args = args || {};
        this.id = args.id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* generateUUID */])();
        //va surement falloir recup les objets crées precedement...
        this.from = args.from;
        this.to = args.to;
    }
    return Relation;
}());

//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/relation.js.map

/***/ }),
/* 71 */
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
//# sourceMappingURL=/home/user9/Documents/postgres-tool/appDatabase/a2/src/environment.js.map

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#main {\n  position: relative;\n  min-width: 100%; }\n\nheader {\n  position: absolute;\n  top: -68px;\n  left: 0;\n  right: 0;\n  padding-bottom: 5px;\n  padding-left: 5px;\n  box-sizing: border-box;\n  z-index: 9999;\n  transition: top 0.5s ease; }\n  @media print {\n    header {\n      background-color: white !important;\n      color: #3E3E3E !important; } }\n  header:hover {\n    top: 0; }\n  header h1 {\n    margin-bottom: 2px; }\n  header h2 {\n    margin: 0; }\n  header .recap {\n    overflow: hidden;\n    /* word-wrap: normal; */\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n    header .recap span {\n      font-size: 1.1em; }\n\n#wrapper {\n  position: relative;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\ncontent {\n  /*fait lui prendre toute la place dispo*/\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n  content .main {\n    /* la zone graphique */\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0; }\n\n.relation {\n  stroke-linejoin: round;\n  stroke-dasharray: 5 5;\n  fill: none;\n  stroke: #3E3E3E; }\n\n.enumerations {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-width: 50px;\n  min-height: 50px;\n  max-width: 400px;\n  border-radius: 5px;\n  z-index: 1;\n  left: 10px;\n  top: 30px;\n  padding: 5px;\n  background-color: #E9E9E9;\n  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.25); }\n  .enumerations div {\n    padding: 5px;\n    border-bottom: 1px dashed #3E3E3E; }\n    .enumerations div.header {\n      font-size: 1.1em; }\n    .enumerations div h3 {\n      margin: 0;\n      cursor: pointer; }\n    .enumerations div span {\n      text-align: right;\n      display: block;\n      width: 100%; }\n    .enumerations div:last-child {\n      border: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* Modal dialog */\n/* The Modal (background) */\n.modal {\n  position: fixed;\n  /* Stay in place */\n  z-index: 9999;\n  /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%;\n  /* Full width */\n  height: 100%;\n  /* Full height */\n  overflow-x: hidden;\n  /* Enable scroll if needed */\n  overflow-y: auto;\n  background-color: black;\n  /* Fallback color */\n  background-color: rgba(0, 0, 0, 0.4);\n  /* Black w/ opacity */ }\n\n/* Modal Content/Box */\n.modal-content {\n  margin: 15% auto;\n  /* 15% from the top and centered */\n  padding: 20px;\n  border: 1px solid #888;\n  width: 50%;\n  /* Could be more or less, depending on screen size */\n  background-color: #fbfbfb;\n  color: #3E3E3E;\n  border-radius: 10px; }\n\n.modal-content > h2 {\n  font-size: 1.2em;\n  text-transform: uppercase; }\n\n.modal-content > p {\n  text-align: justify; }\n\n.modal-content > content {\n  margin: 10px 0; }\n\n.ok {\n  background: #3498db;\n  background-image: linear-gradient(to bottom, #3498db, #2980b9); }\n\n.ok:hover {\n  background: #3cb0fd;\n  background-image: linear-gradient(to bottom, #3cb0fd, #3498db); }\n\n.warn {\n  background: #c6d934;\n  background-image: linear-gradient(to bottom, #c6d934, #9ea628); }\n\n.warn:hover {\n  background: #e6fc3c;\n  background-image: linear-gradient(to bottom, #e6fc3c, #ced934); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: space-around;\n      -ms-flex-align: space-around;\n          align-items: space-around;\n  padding: 10px 0;\n  border-top: 1px dashed #E3E3E3;\n  border-bottom: 1px dashed #E3E3E3; }\n  content .present {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 0px;\n            flex: 1 1 0;\n    margin: 0 20px;\n    border-radius: 5px; }\n    content .present header {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row; }\n      content .present header img {\n        width: 128px;\n        height: 128px; }\n      content .present header .infos {\n        padding: 0 10px; }\n        content .present header .infos p {\n          text-align: right; }\n    content .present a {\n      display: block;\n      text-align: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".invisible {\n  display: none !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".group {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-bottom: 20px;\n  border-bottom: 1px dashed #3E3E3E; }\n  .group .index-infos {\n    margin-left: 10px; }\n    .group .index-infos .name {\n      font-weight: bold;\n      font-size: 1.3em; }\n    .group .index-infos div {\n      display: float;\n      float: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".group {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-bottom: 20px;\n  border-bottom: 1px dashed #3E3E3E; }\n  .group .index-infos {\n    margin-left: 10px; }\n    .group .index-infos .name {\n      font-weight: bold;\n      font-size: 1.3em; }\n    .group .index-infos div {\n      display: float;\n      float: right; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".field {\n  position: relative;\n  border: none;\n  border-bottom: 1px dashed #3E3E3E;\n  cursor: move; }\n  .field.notDraggable {\n    cursor: default; }\n  .field p {\n    margin: 1px;\n    text-align: right; }\n  .field .composite {\n    margin-left: 10px;\n    border-left: 1px solid #BEBEBE; }\n    .field .composite div {\n      padding-left: 5px; }\n\n:host:last-child .field {\n  border: none !important; }\n\n.floater {\n  display: float;\n  float: right;\n  position: relative;\n  right: 0;\n  padding-left: 20px; }\n\n.fab {\n  background: transparent;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  text-align: center;\n  z-index: 3;\n  position: absolute;\n  left: 2px;\n  display: inline-block;\n  cursor: default; }\n\n.fab span {\n  vertical-align: middle; }\n\n.fab.child {\n  background: white;\n  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5), 3px 3px 3px rgba(0, 0, 0, 0.25);\n  padding: 2px;\n  opacity: 0;\n  transition: left 0.2s ease, opacity 0.2s ease;\n  z-index: 0; }\n\n.first, .second {\n  display: block !important;\n  opacity: 1 !important;\n  z-index: 9999; }\n\n.first {\n  left: 30px !important; }\n\n.second {\n  left: 66px !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".main-menu {\n  min-width: 50px;\n  min-height: 50px;\n  max-width: 200px;\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-top: 0;\n  padding: 5px;\n  border-radius: 10px;\n  transition: opacity 0.2s ease;\n  z-index: 9999; }\n\n.main-menu .menu-item {\n  padding: 5px;\n  font-size: 1.2em;\n  cursor: pointer; }\n  .main-menu .menu-item a {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    .main-menu .menu-item a span {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 0px;\n              flex: 1 1 0;\n      display: inline-block; }\n\n.main-menu .menu-item:hover {\n  color: #16a7f3; }\n\n.main-menu .material-icons {\n  position: relative;\n  top: 2px;\n  margin-right: 5px; }\n\n.visible {\n  display: block;\n  z-index: 9999;\n  opacity: 1; }\n\n.invisible {\n  display: none;\n  z-index: 0;\n  opacity: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".element {\n  position: absolute;\n  border: 1px solid #3E3E3E;\n  background-color: #fbfbfb;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-width: 50px;\n  min-height: 50px;\n  max-width: 400px;\n  border-radius: 5px;\n  z-index: 1; }\n  .element .header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    padding: 5px;\n    font-size: 1.3em;\n    font-weight: bold;\n    cursor: move; }\n    .element .header a {\n      position: relative;\n      margin-left: 10px;\n      cursor: pointer; }\n      .element .header a:hover {\n        /*ripple effect*/\n        position: relative;\n        margin-left: 10px;\n        cursor: pointer; }\n      .element .header a:active {\n        -webkit-animation: ripple 0.21s ease;\n        animation: ripple 0.21s ease; }\n    .element .header h3 {\n      cursor: pointer; }\n  .element .comment {\n    padding: 5px; }\n  .element content {\n    padding: 5px; }\n\n.selected {\n  z-index: 1000 !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" [style]=\"database?.tables | widthHeight\">\n<header class=\"invert\">\n    <h1>{{title}}</h1>\n    <h2>{{slogan}}</h2>\n    <div>{{database | dbinfos }}</div>\n    \n    \n</header>\n<div id=\"wrapper\" #wrapper>\n<content (mousemove)=\"drag($event)\" (mouseup)=\"stop_drag($event)\" (click)=\"clearMenu()\" (contextmenu)=\"showContextMenu($event)\">   \n    \n    <div class=\"main\">\n        <!--div class=\"enumerations\" *ngIf=\"database?.enumerations\">\n            <div class=\"header\">Enumerations</div>\n            <div *ngFor=\"let enumeration of database?.enumerations\">\n                <h3 class=\"title\" title=\"Click to edit\" (click)=\"showEnumDlg(enumeration)\">{{enumeration.key}}</h3><span>({{enumeration.values}})</span>\n            </div>\n        </div-->\n\n\n        <table-cmp *ngFor=\"let table of database?.tables\" [table]=\"table\" (onSelectedTable)=\"setSelectedTable($event)\"></table-cmp>\n\n        <menu-cmp *ngIf=\"descriptor\" [descriptor]=\"descriptor\"></menu-cmp>\n        \n    </div>\n    <svg width=\"100%\" height=\"100%\">\n        \n        <svg:g *ngFor=\"let relation of database?.relations\" >            \n            <polyline class=\"relation\" [attr.points]=\"relation | relation2points\"/>\n        </svg:g>\n        \n    </svg>\n    <dlg-cmp *ngIf=\"dlgDescriptor\" [descriptor]=\"dlgDescriptor\"></dlg-cmp>\n    \n</content>\n</div>\n</div>"

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal\" (contextmenu)=\"skip($event)\">\n    <div class=\"modal-content  shadowed\">\n    <h2>{{descriptor.title}}</h2>\n    <p>{{descriptor.texte}}</p>\n    <div [ngSwitch]=\"descriptor.type\">\n        <dlg-addtable *ngSwitchCase=\"'ADD_TABLE'\" [coords]=\"descriptor.coords\"></dlg-addtable>\n        <dlg-addfield *ngSwitchCase=\"'ADD_FIELD'\" [table]=\"descriptor.target\" [field]=\"descriptor.field\"></dlg-addfield>\n        <dlg-about *ngSwitchCase=\"'ABOUT'\"></dlg-about>\n        <dlg-tableprops *ngSwitchCase=\"'SHOW_TABLE'\" [table]=\"descriptor.target\"></dlg-tableprops>\n        <dlg-index *ngSwitchCase=\"'ADD_INDEX'\" [table]=\"descriptor.target.table\" [field]=\"descriptor.target.index\"></dlg-index>\n        <dlg-constraint *ngSwitchCase=\"'ADD_CONSTRAINT'\" [table]=\"descriptor.target\" [cnt]=\"descriptor.constraint\"></dlg-constraint>\n        <dlg-pk *ngSwitchCase=\"'ADD_PK'\" [table]=\"descriptor.target?.table || descriptor.target \" [field]=\"descriptor.target?.pk\"></dlg-pk>\n        <dlg-export *ngSwitchCase=\"'EXPORT'\"></dlg-export>\n        <dlg-newbase *ngSwitchCase=\"'CREATE_BASE'\" [editable]=\"descriptor.target\"></dlg-newbase>\n        <dlg-confirm *ngSwitchCase=\"'CONFIRM'\" [next]=\"descriptor.next\" [target]=\"descriptor.target\"></dlg-confirm>\n        <dlg-customtype *ngSwitchCase=\"'CREATE_CTYPE'\" [enumeration]=\"descriptor.target\"></dlg-customtype>\n        <div *ngSwitchDefault>\n            Oups!\n        </div>\n    </div>\n</div>\n</div>"

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "<div class=\"about\">\n    <content>\n        <div class=\"present\">\n            <header>\n                <img src=\"https://avatars1.githubusercontent.com/u/26115418?v=3&s=460\">\n                <div class=\"infos\">\n                    <h2>Lahitte Mathieu</h2>\n                    <p>javascript, SQL</p>\n\n                </div>\n            </header>\n            <p>un petit texte de presentation un petit texte de presentation un petit texte de presentation</p>\n            <a href=\"mailto:???\">contact me.</a>\n        </div>\n        <div class=\"present\">\n            <header>\n                <img src=\"https://avatars2.githubusercontent.com/u/17245172?v=3&s=460\">\n                <div class=\"infos\">\n                    <h2>Stéphane Ponteins</h2>\n                    <p>Typescript, Angular2</p>\n                </div>\n            </header>\n            <p>un petit texte de presentation un petit texte de presentation</p>\n            <a href=\"mailto:???\">contact me.</a>\n        </div>\n    </content>\n    <div class=\"commands\" >\n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">OK, thanks guys!</button>      \n    </div>\n</div>"

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "<form #fieldForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n    <content>\n        <label>Field name *</label>\n        <input type=\"text\" #Fname=\"ngModel\" name=\"field_name\" [(ngModel)]=\"tmp.name\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\">\n        <div [hidden]=\"Fname.valid || Fname.pristine\"\n             class=\"error\">\n          Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n        </div>\n        <label>Field comment:</label>\n        <textarea name=\"field_comment\" [(ngModel)]=\"tmp.comment\"></textarea>\n        <label>Field type:</label>\n        <select [disabled]=\"tmp.is_reference\" name=\"field_type\" #Ftype=\"ngModel\" [disabled]=\"newType.checked\" [(ngModel)]=\"tmp.type\" required>\n            <option *ngFor=\"let type of types\" [value]=\"type\">{{type}}</option>\n        </select>\n        <div [hidden]=\"Ftype.valid || Ftype.pristine\"\n             class=\"error\">\n          You must select a data type.\n        </div>\n        <div [ngSwitch]=\"tmp.type | extratype\">\n            <div *ngSwitchCase=\"'LENGTH'\">\n                <label>Size:</label>\n                <input [disabled]=\"tmp.is_reference\"  type='number' min=\"0\" [(ngModel)]=\"tmp.type_extras.length\" name=\"ex_ty_length\">\n            </div>\n            <div *ngSwitchCase=\"'MINMAX'\">\n                <label>Precision:</label>\n                <input [disabled]=\"tmp.is_reference\"  type='number' #precision=\"ngModel\" min=\"0\" [(ngModel)]=\"tmp.type_extras.precision\" name=\"ex_ty_min\">\n                <div [hidden]=\"precision.valid || precision.pristine\"\n                    class=\"error\">\n                    Precision must be higher than scale.\n                </div>\n                <label>Scale:</label>\n                <input [disabled]=\"tmp.is_reference\"  type='number' #scale=\"ngModel\" min=\"0\" [(ngModel)]=\"tmp.type_extras.scale\"  name=\"ex_ty_max\">\n                <div [hidden]=\"scale.valid || scale.pristine\"\n             class=\"error\">\n                Scale must be lower than precision.\n            </div>\n            </div>\n            \n\n        </div>\n\n        <label>\n            <input [disabled]=\"tmp.is_reference\" type=\"checkbox\" [(ngModel)]=\"make_custom\" #newType name=\"new_type\">Create custom ENUM\n        </label>\n        <div class=\"enum-group\">\n            <label>Type name:</label>\n            <input #NTname=\"ngModel\" [disabled]=\"!newType.checked\" type=\"text\" name=\"enum_name\" [(ngModel)]=\"custom_type.key\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]*$\">\n            <div [hidden]=\"!newType.checked || (NTname.valid || NTname.pristine)\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]*$\n            </div>\n            <label>Type values (comma separated):</label>\n            <textarea #tvalues=\"ngModel\" [disabled]=\"!newType.checked\" name=\"enum_vals\" [(ngModel)]=\"custom_type.values\" required pattern=\"^([a-zA-Z0-9_]+,)*[a-zA-Z0-9_]+$\"></textarea>\n            <div [hidden]=\"tvalues.valid || tvalues.pristine\"\n             class=\"error\">\n                Values are required, and must match: ^([a-zA-Z0-9_],)*[a-zA-Z0-9_]+$\n            </div>\n\n            \n        </div>\n        <label>Default Value:</label>\n        <input [disabled]=\"tmp.is_reference\" type=\"text\" name=\"field_default\" [(ngModel)]=\"tmp.default_value\">\n        \n        \n\n        <div class=\"check-group\">\n            <label [ngClass]=\"table | has_PK:field?.primary_key\">\n                <input type=\"checkbox\" [disabled]=\"tmp.is_reference\"  [(ngModel)]=\"tmp.primary_key\" name=\"field_pk\">Primary Key\n            </label>\n            <label>\n                <input type=\"checkbox\" [disabled]=\"tmp.is_reference\" [(ngModel)]=\"tmp.index\" name=\"field_index\">INDEX\n            </label>\n            <label>\n                <input type=\"checkbox\"[disabled]=\"tmp.is_reference\" [(ngModel)]=\"tmp.not_null\" name=\"field_null\">NOT NULL\n            </label>\n            <label>\n                <input type=\"checkbox\" [disabled]=\"tmp.is_reference\" [(ngModel)]=\"tmp.unique\" name=\"field_index\">UNIQUE\n            </label>\n        </div>\n        <label>Check Constraint:</label>\n        <input type=\"text\" [disabled]=\"tmp.is_reference\" name=\"field_check\" [(ngModel)]=\"tmp.check\">\n\n    </content>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\" *ngIf=\"!tmp.id\" >\n        <button [disabled]=\"!fieldForm.form.valid\"  class=\"invert\" type=\"submit\">Create new field</button> \n        <button [disabled]=\"!fieldForm.form.valid\"  (click)=\"addfield=true\"  class=\"invert\" type=\"submit\">Create & add another</button> \n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n    </div>\n    <div class=\"commands\" *ngIf=\"tmp.id\" >\n        <button [disabled]=\"!fieldForm.form.valid\"  class=\"invert\" type=\"submit\">Update field</button> \n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button> \n    </div>\n</form>"

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "<form #pkForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(pkForm)\">\n        <content>\n            <label>PK name:</label>\n            <input type=\"text\" #Fname=\"ngModel\" name=\"index_name\" [required]=\"index.fields.length!=1\" [(ngModel)]=\"index.name\" pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\">\n            <div [hidden]=\"Fname.valid || Fname.pristine\"\n             class=\"error\">\n                Name is required for composite key, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n            </div>\n\n\n            <!-- les cles primaires depend si en a deja une ou pas... \n            <input type=\"checkbox\" name=\"add_primary\">Add auto-increment primary key (name: id)-->\n            <label>Select fields for primary key:</label>\n            <label *ngFor=\"let field of table.fields | pure_fields; let i = index\">\n                <input type=\"checkbox\" [name]=\"'field_'+i\" [value]=\"field.id\" \n                [checked]=\"index.fields.indexOf(field)>=0\"\n                (change)=\"updateCheckedOptions(field, $event)\">{{field.name}}\n            </label>\n            \n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!pkForm.form.valid || index.fields.length < 2\"  class=\"invert\" type=\"submit\">Create Primary Key</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>"

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = " <form #dlgForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n        <content>\n            <label>Table name:</label>\n            <input type=\"text\" name=\"table_name\" [(ngModel)]=\"table.name\" required>\n            <label>Comment:</label>\n            <textarea type=\"text\" name=\"table_comment\" [(ngModel)]=\"table.comment\" ></textarea>\n\n            <!-- les cles primaires depend si en a deja une ou pas... -->\n            <input type=\"checkbox\" name=\"add_primary\" [(ngModel)]=\"add_primary\">Add auto-increment primary key (name: id)\n\n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!dlgForm.form.valid\"  class=\"invert\" type=\"submit\">Create Table</button> \n            <button [disabled]=\"!dlgForm.form.valid\"  (click)=\"addfield=true\"  class=\"invert\" type=\"submit\">Create & add Field</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>"

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = "<p *ngIf=\"error\" class=\"error\">{{error}}</p>\n<div class=\"commands\" >\n    <button  class=\"invert\" (click)=\"perform_action()\">OK</button> \n    <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n</div>"

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = "<form #constraintForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n        <content>\n            <label>Constraint name:</label>\n            <input type=\"text\" #cname=\"ngModel\" name=\"c_name\" [(ngModel)]=\"constraint.key\" required  pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\">\n            <div [hidden]=\"cname.valid || cname.pristine\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n            </div>\n            <!-- les cles primaires depend si en a deja une ou pas... \n            <input type=\"checkbox\" name=\"add_primary\">Add auto-increment primary key (name: id)-->\n            <label>Check Expression:</label>\n            <textarea #check=\"ngModel\" name=\"c_value\" [(ngModel)]=\"constraint.values\" required></textarea>\n            <div [hidden]=\"check.valid || check.pristine\"\n             class=\"error\">\n                You must enter an expression for check... (valid, if possible)\n            </div>\n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!constraintForm.form.valid\"  class=\"invert\" type=\"submit\">Add Constraint</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>"

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = "<form #fieldForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n    <content>\n        \n        <label>Type name:</label>\n        <input #NTname=\"ngModel\" [readonly]=\"enumeration\"  type=\"text\" name=\"enum_name\" [(ngModel)]=\"e.key\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]*$\">\n        <div [hidden]=\"NTname.valid || NTname.pristine\"\n            class=\"error\">\n            Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]*$\n        </div>\n        <label>Type values (comma separated):</label>\n        <textarea #tvalues=\"ngModel\"  name=\"enum_vals\" [(ngModel)]=\"e.values\" required pattern=\"^([a-zA-Z0-9_]+,)*[a-zA-Z0-9_]+$\"></textarea>\n        <div [hidden]=\"tvalues.valid || tvalues.pristine\"\n            class=\"error\">\n            Values are required, and must match: ^([a-zA-Z0-9_],)*[a-zA-Z0-9_]+$\n        </div>\n    </content>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\">\n        <button [disabled]=\"!fieldForm.form.valid\"  class=\"invert\" type=\"submit\">Create Type</button> \n        <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button> \n    </div>\n    \n</form>"

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = "<content>\n    <h4>SQL</h4>\n    <textarea *ngIf=\"sql_datas\" [(ngModel)]=\"sql_datas\" rows=\"30\"></textarea>\n    <p *ngIf=\"!error && !sql_datas\">Loading sql, please wait...</p>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\" >\n            <a [hidden]=\"!sql_datas\" [download]=\"name+'.sql'\" [href]=\"sql_datas | file_download\"  class=\"invert\">Download file?</a> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Close</button>      \n        </div>\n        \n</content>"

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = "<form #indexForm=\"ngForm\" (ngSubmit)=\"process_dialog_form(indexForm)\">\n        <content>\n            <label>Index name:</label>\n            <input type=\"text\" name=\"index_name\" [(ngModel)]=\"index.name\" required>\n            \n            \n            <div *ngIf=\"!index.is_reference\">\n                <!-- les cles primaires depend si en a deja une ou pas... \n                <input type=\"checkbox\" name=\"add_primary\">Add auto-increment primary key (name: id)-->\n                <label>Select fields for index:</label>\n                <label *ngFor=\"let field of table.fields | pure_fields; let i = index\">\n                    <input type=\"checkbox\" [name]=\"'field_'+i\" [value]=\"field.id\" \n                    [checked]=\"index.fields.indexOf(field)>=0\"\n                    (change)=\"updateCheckedOptions(field, $event)\">{{field.name}}\n                </label>\n                <label>Method:</label>\n                <select [(ngModel)]=\"index.method\" name=\"index_method\" required>\n                    <option value=\"btree\">btree</option>\n                    <option value=\"hash\">hash</option>\n                    <option value=\"gist\">gist</option>\n                    <option value=\"gin\">gin</option>\n                </select>\n                <div><input type=\"checkbox\" [(ngModel)]=\"index.unique\" name=\"index_unique\">Set index as unique</div>\n                <input type=\"checkbox\" #indexNull [(ngModel)]=\"index.index_null\" name=\"index_index_null\">Index NULL values\n                <input type=\"checkbox\" [disabled]=\"!indexNull.checked\" [(ngModel)]=\"index.null_first\" name=\"index_null_first\">Sort NULL values first (unchecked: sort last)\n            </div>\n            \n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button [disabled]=\"!indexForm.form.valid || index.fields.length<2\"  class=\"invert\" type=\"submit\">Add index</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>"

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "<form #baseForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n        <content>\n            <label>Base name:</label>\n            <input type=\"text\" #bname=\"ngModel\" name=\"b_name\" [(ngModel)]=\"base.db_name\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\">\n            <div [hidden]=\"bname.valid || bname.pristine\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n            </div>\n\n\n            <label>Type:</label>\n            <select [(ngModel)]=\"base.db_type\" name=\"b_method\" required>\n                <option value=\"postgres\">PostgreSQL</option>\n                <option value=\"mysql\">MySQL</option>\n                <option value=\"maria\">MariaDB</option>\n                <option value=\"mongo\">MongoDB</option>\n            </select>\n            <label>Port:</label>\n            <input type=\"number\"  min=\"1\" max=\"65535\" step=\"1\" name=\"b_port\" [(ngModel)]=\"base.db_port\" required>\n            <label>Host:</label>\n            <input #host=\"ngModel\" type=\"text\" name=\"b_host\" [(ngModel)]=\"base.host\" required pattern=\"^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9]))*$\">\n            <div [hidden]=\"host.valid || host.pristine\"\n             class=\"error\">\n                Host is not valid...\n            </div>\n            <label>login:</label>\n            <input type=\"text\" #log=\"ngModel\" name=\"b_log\" [(ngModel)]=\"base.login\" required>\n            <div [hidden]=\"log.valid || log.pristine\"\n             class=\"error\">\n                You must provide a login\n            </div>\n            <label>Password:</label>\n            <input type=\"text\" name=\"b_pswd\" [(ngModel)]=\"base.passwrd\">\n            \n\n\n            <!-- les contraintes de la table -->\n            <div class=\"group\">Custom Types:\n                <div *ngFor=\"let enum of base.enumerations\">\n                    <div  class=\"index-infos\">\n                        <span  class=\"name\">{{enum.key}}</span>(<span >{{enum.values}}</span>)\n                        <div>\n                            <a class=\"round\" (click)=\"updateEnum(enum)\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                            <a class=\"round\" (click)=\"deleteEnum(enum)\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                        </div>  \n                    </div>\n                </div>\n            \n                \n            </div>\n\n\n\n            \n        </content>\n        <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n        <div class=\"commands\" >\n            <button class=\"invert\" type=\"button\" (click)=\"newEnum()\" type=\"button\">Add new Custom Type</button>\n            <button [disabled]=\"!baseForm.form.valid\"  class=\"invert\" type=\"submit\">Create Base</button> \n            <button type=\"button\" (click)=\"cancel()\" class=\"invert\">Cancel</button>      \n        </div>\n    </form>"

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "<form #dlgForm=\"ngForm\" (ngSubmit)=\"process_dialog_form()\">\n    <content>\n        <label>Table name:</label>\n        <input type=\"text\" #tname=\"ngModel\" name=\"table_name\" [(ngModel)]=\"table_cpy.name\" required pattern=\"^[a-zA-Z_]+[a-zA-Z0-9_]+$\">\n        <div [hidden]=\"tname.valid || tname.pristine\"\n             class=\"error\">\n                Name is required, and must match: ^[a-zA-Z_]+[a-zA-Z0-9_]+$\n        </div>\n\n        <label>Comment:</label>\n        <textarea type=\"text\" name=\"table_comment\" [(ngModel)]=\"table_cpy.comment\" ></textarea>\n\n        \n\n        <!-- les contraintes de la table -->\n        <div class=\"group\">Table Constraints:\n        <div *ngFor=\"let index of table_cpy.constraints\">\n            <div  class=\"index-infos\">\n                <span  class=\"name\">{{index.key}}</span>(<span >{{index.values}}</span>)\n                <div>\n                    <a class=\"round\" (click)=\"updateConstraint(index)\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                    <a class=\"round\" (click)=\"deleteConstraint(index)\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                </div>  \n            </div>\n        </div>\n        \n        <button class=\"invert\" type=\"button\" (click)=\"newConstraint()\">Add new Table Constraint</button>\n        </div>\n    </content>\n    <p class=\"error\" *ngIf=\"error\">{{error}}</p>\n    <div class=\"commands\" >\n        <button [disabled]=\"!dlgForm.form.valid\"  class=\"invert\" type=\"submit\">OK</button> \n             \n    </div>\n</form>"

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = "<div >\n    <div #fieldElem class=\"field\" [class.notDraggable]=\"field.unique !=true && field.primary_key !=true\"  [draggable]=\"field.unique ==true || field.primary_key ==true\" (dragstart)=\"doStartDrag($event)\" (dragend)=\"doStopDrag($event)\">                    \n        <h3 [id]=\"field.id\"  >\n            <a (click)=\"showItemProperty($event)\" >{{field.name}}</a>\n            <i class=\"material-icons\" *ngIf=\"field.is_reference\" title=\"Reference\" >link</i>\n            <i class=\"material-icons\" *ngIf=\"field.primary_key\" title=\"Primary Key\">vpn_key</i>\n            <i class=\"material-icons\" *ngIf=\"field.index\" title=\"Index\" >format_list_numbered</i>\n            <i class=\"material-icons\" *ngIf=\"field.unique\" title=\"Unique\">looks_one</i>\n            \n            <div *ngIf=\"!field.fields\" class=\"floater\">\n                <a class=\"fab child\" [class.first]=\"show_fabs\" (click)=\"updateField()\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                <a class=\"fab child\" [class.second]=\"show_fabs\" (click)=\"deleteField()\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                <a class=\"fab\" (click)=\"show_fabs=!show_fabs\"><i class=\"material-icons rippler\">keyboard_arrow_right</i></a>\n            </div> \n            <div *ngIf=\"field.fields\" class=\"floater\">\n                <a class=\"fab child\" [class.first]=\"show_fabs\" (click)=\"updateComposite()\"><i class=\"material-icons rippler\">mode_edit</i></a>\n                <a class=\"fab child\" [class.second]=\"show_fabs\" (click)=\"deleteField()\"><i class=\"material-icons rippler\">delete_forever</i></a>\n                <a class=\"fab\" (click)=\"show_fabs=!show_fabs\"><i class=\"material-icons rippler\">keyboard_arrow_right</i></a>\n            </div> \n        </h3>\n        \n        \n        \n        <p *ngIf=\"field.comment\">{{field.comment}}</p>    \n        <div class=\"composite\" *ngIf=\"field.fields\">\n            <div *ngFor=\"let f of field.fields\">\n                {{f.name}}\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-menu invert shadowed\" [style]=\"descriptor.coords | safeCSS\">\n    <!-- les menus necessaires pour afficher les differentes options pour une table -->    \n        <div class=\"menu-item\"  *ngFor=\"let item of descriptor.menus\" [hidden]=\"item.enabled == true\">\n            <a  (click)=\"onClick(item)\"><i class=\"material-icons\">{{item.icon}}</i>\n            <span>{{item.label}}</span></a>\n        </div>\n        \n</div>"

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "\n<div #tableElem class=\"shadowed element\" [class.selected]=\"table.selected\" [style]=\"table.coords | safeCSS\" \n                    (dragenter)=\"skip_evt($event)\"\n                  (dragover)=\"skip_evt($event)\"\n                  (dragleave)=\"skip_evt($event)\"\n                  (drop)=\"doDrop($event)\">\n                  \n    <div class=\"header invert\"\n        (mousedown)=\"startDrag($event)\"\n        >\n        <span>{{table.name}}</span>\n        <a (click)=\"showMenu($event)\"><i class=\"material-icons rippler\">menu</i></a>\n    </div>\n    <div class=\"comment\" *ngIf=\"table.comment\">\n        {{table.comment}}\n    </div>\n    <content>\n        \n        <field-cmp *ngFor=\"let field of table.fields\" [field]=\"field\" [table]=\"table\"></field-cmp>\n        \n    </content>\n    <footer>\n\n    </footer>\n</div>\n\n\n"

/***/ }),
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(38);


/***/ })
],[131]);
//# sourceMappingURL=main.bundle.js.map