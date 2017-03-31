/**
 * Les datas et controllers pour l'application
 */
var myContext = (function (){

    //Creation d'un jeu de données pour tester les renders
    var db = {
        //qqs infos d'ordre generales sur la base elle meme et l'utilisateur
        file_url:'a/path',//chemin vers le fichier sql/dump ou enregistrer
        db_name:"nom_de_la_base",
        db_type:"postgres",//ou mysql, mongo....
        db_port:5432,
        host:"host",
        login:"loginUtilisateur",
        passwrd:"passwordUtilisateur",

        //description des tables 
        tables:[

        ],
        //desciption des relations entre les tables
        relations:[

        ]
    }



    return {
        app_name : "GRETA SQL Tool",
        app_slogan : "a sql tool that is super cool!",
        db:db

    };
})();

console.log(myContext)