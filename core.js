var DB = (function(){

//Genere un UUID unique pour chaque objet qui doit etre lier
//@return string: l'UUID généré
//@public
function generateUUID() {
    var __uuid_date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var d = __uuid_date;
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        }
    );
};

/**
* Une description super geniale pour les differents objets de ce fichier
*/
function Field(title, type, data_type, constraints){
    this._id = generateUUID();
    this.title = title || "a field";

    this.type = type;
    this.data_type = data_type;
    this.constraints = constraints;
    
}
function Link(desc){
    this._id = generateUUID();
    this.from = desc.from;
    this.to = desc.to;

}
function Table(nom,fields){
    this._id = generateUUID();
    this.title = nom || "un nom par defaut";
    //ajout des fields 
    this.fields = [];
    for (var desc of fields){
        var f = new Field(desc.title, desc.type, desc.data_type,desc.constraints);
        this.fields.push(f);
    }

    // this.links=[];//les ids des links a supprimer????

};
Table.prototype.add_field = function(field){

}
Table.prototype.add_fields = function(fields){

}
/**
*   les informations sur une base de données
*/
function db_facade(nom, file_url){
    this._id = generateUUID();
    this.nom = nom || "Un nom par default";
    this.file_url = file_url || null;//a voir, si fourni, merci de charger les données 
    this.tables = [];//les tables de la base
    this.links = [];//les links entre les tables
    
};

/**
* chargment d'un fichier sql decrivant une base
a partir d'un SQL???
*/
db_facade.prototype.load_from_file = function(file_url){
    
}
/**
* ajout d'une table dans la base
@param nom: string, le nom de la table
@param fields: array de fields pour la table (can be empty)

@return id: identifiant de la table nouvellement créee
*/
db_facade.prototype.add_table = function(nom, fields){
    var t = new Table(nom, fields);
    this.tables.push(t);
    return t._id;
};
/**
 * supprime une table de la liste
 * doit aussi supprimer les links vers cette table
@param nom: string, le nom de la table

@return table: les informations de la table supprimée
 */
db_facade.prototype.delete_table = function(id){
    var count = this.tables.length;
    for (var i=0; i<count; i++){
        var t = this.tables[i];
        if(t._id == id){
            //ok, recherche et supprime les relations avec cet id de table 
            
            for (var j=0;j<this.links.length;j++){
                var lnk = this.links[j];
                if(lnk.from.id == id || lnk.to.id == id){
                    this.links.splice(j,0);
                    j--;
                }
            }
            return this.tables.splice(i,1);
        }
    }
};
/**
 * Recuper les infos sur une table
 * @param id: identifiant unique de la table (table._id)
 * @return les infos de la table +  les links
 */
db_facade.prototype.get_table_infos = function(id){

    var tab = null;

    if(id){
        var count = this.tables.length;
        for (var i=0; i<count; i++){
            var t = this.tables[i];
            if(t._id == id){
                tab = t;
                break;
            }
        }
    } else {
        //on sait pas....
    }

    if(!tab) return null;

    console.log(tab);
    //les liens
    var lnks = [];
    for (var ln of this.links){
        console.log(ln)
        if(ln.from.table == tab._id || ln.to.table == tab._id ){

            lnks.push(ln);
        }
    }
    return {
        table:t,
        links:lnks
    };
}
/**
 * Met a jour les infos de la table
 */
db_facade.prototype.update_table = function(id, infos){

};
/**
 * ajoute un field a une table 
 * @param id_table: identifiant unique de la table (table._id)
 * @param field: informations sur un field peut (Array possible)
 * 
 * @return id: identifiant unqiue du/des field cree
 */
db_facade.prototype.add_field = function(id_table, field){
    var t = this.get_table_infos(id_table);
    if(t){
        if(typeof field == "Array") return t.add_fields(field);
        else return t.add_field(field);
    }

};
db_facade.prototype.update_field = function(id_table, field){

};
/**
 * Enregistre un nouveau link dans la table 
 * @param lnk: la description du link 
 * @return id: identifiant du link genere (Link._id)
 */
db_facade.prototype.link = function(lnk){
    var link = new Link(lnk);
    
    //ajoute dans les tables 
    // var t = this.get_table_infos(lnk.from.id);
    // var t2 = this.get_table_infos(lnk.to.id);

    // if(t || t2) throw "Invalid table ID!!!";

    // //tout est OK 
    // t.links.push(link);
    // t2.links.push(link);
    this.links.push(link);
    return this.links._id;
}

/**
 * supprime un lien entre les tables
 */
db_facade.prototype.remove_link = function(id){
    var count = this.links.length;

    for(var i=0;i<count;i++){
        var lnk = this.links[i];
        if(lnk._id == id){
            //supprime des tables aussi
            // var t = this.get_table_infos(lnk.from.id);
            // if(t) t.remove_link(lnk);
            // var t2 = this.get_table_infos(lnk.to.id);
            // if(t2) t2.remove_link(lnk);
            // //supprime le lien
            this.links.splice(i,1);
            break;

        }
    }
}


/**
 * genere un set de données pour les debug
*/
var generate_dummy_db = function(){

    /** TEST ONLY permet de tester les differentes parties de l'API */

    var _db = new DB.db();
    var formateur_id = _db.add_table("formateurs",[{
            title:"id",
            type:"PK",
            data_type:"BIGINT",
            constraints:{
                autoincrement:true
            }
        },{
            title:"nom",
            type:"value",
            data_type:"varchar",
            constraints:{
                not_null:true,
                length:50,
                minLength:3,
                pattern:"^[A-Z][a-z]+$"
            }
        },{
            title:"prenom",
            type:"value",
            data_type:"varchar",
            constraints:{
                not_null:true,
                length:50
            }
        },{
            title:"age",
            type:"value",
            data_type:"number",
            constraints:{
                min:18,
                max:99
            }
    }]);





    var formation_id = _db.add_table("formation",[{
            title:"id",
            type:"PK",
            data_type:"BIGINT",
            constraints:{
                autoincrement:true
            }
        },{
            title:"nom",
            type:"value",
            data_type:"varchar",
            constraints:{
                not_null:true,
                length:50,
                minLength:3,
                pattern:"^[A-Z][a-z]+$"
            }
        },{
            title:"duree",
            type:"value",
            data_type:"number",
            constraints:{
                not_null:true,
                min:1
            }
        },{
            title:"prix",
            type:"value",
            data_type:"number",
            constraints:{
                min:100,
                max:9999
            }
    }]);

    _db.link({
        from:{
            table:formateur_id,
            key:"id",
            relation:"1"
        },
        to:{
            table:formation_id,
            key:"id",
            relation:"N"
        }
    })

   
    var t = _db.get_table_infos(formateur_id);
    console.log(t);


    return _db;
}


//les differents exports pour mon module
return {
    db:db_facade,
    //qqs methodes utilitaires
    generateUUID: generateUUID,
    generate_dummy_db : generate_dummy_db
    
};


})();

//DEBUG
DB.generate_dummy_db();