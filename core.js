(function(){

//Genere un UUID unique pour chaque objet qui doit etre lier
//@return string: l'UUID généré
//@public
function generateUUID() {
    var __uuid_date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(){
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
function Field(title, type, constraints){
    this._id = generateUUID();
    this.title = title || "a field";
    
}
function Link(){
    this._id = generateUUID();

}
function Table(nom,fields){
    this._id = generateUUID();

};

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
*/
db_facade.prototype.load_from_file = function(file_url){

}
/**
* ajout d'une table dans la base
*/
db_facade.prototype.add_table= function(nom, fields){

};
db_facade.prototype.delete_table= function(nom){

};
db_facade.prototype.update_table= function(nom, infos){

};
db_facade.prototype.add_field= function(id_table, field){


};
db_facade.prototype.update_field= function(id_table, field){

};

//les differents exports pour mon module
return {
    db:db_facade,


    //qqs methodes utilitaires
    generateUUID: generateUUID
    
};


})();
