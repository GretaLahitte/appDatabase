/**
 * Les datas et controllers pour l'application
 */
var myContext = (function (){

    //Types de données pour l'application ------------------------------------------------------
    function Base(args){
        args = args || {};

        this.file_url = args.file_url || 'a/path',//chemin vers le fichier sql/dump ou enregistrer
        this.db_name = args.db_name || "nom_de_la_base",
        this.db_type = args.db_type || "postgres",//ou mysql, mongo....
        this.db_port = this.db_port || 5432,
        this.host = args.host || "host",
        this.login = args.login || "loginUtilisateur",
        this.passwrd = args.passwrd || "passwordUtilisateur";

        //a voir...
        this.tables = args.tables || [];
        this.relations = args.relations || [];

    }
    
    
    function Table (args){
        args = args || {};
        
        this.id = args.id || "anId";
        this.name = args.name || "a name";
        this.coords = args.coords || {x:0,y:0};
        this.selected = args.selected || false;
        this.fields = args.fields || [];
        this.relations = args.relations || [];

    }

    function Field(args){
        args = args || {};

        this.id = args || id;
        this.name = args.name || 'un nom';
        //voir le reste, type, ....

    }

    function Relation(args){
        args = args || {};
        this.id = args.id || 'anid';

        //va surement falloir recup les objets crées precedement...
        this.from = args.from || from;
        this.to = args.to || to;

    }
    

    //GESTION DRAG AND DROP DES TABLES ---------------------------------------------------------

    var __shift_top = 0;//pour positionner suivant le click de la souris
    var __shift_left = 0;
    var __cible = null;//la table a modifier


    /**
     * permet de mettre des listeners sur le document pour ne pas perdre
     * le move event de la table 
     * 
     * PRIVATE
     */
    function __captureEvents(){
         //start capture, ie: passe le gestionnaire dans le body de  la pageXOffset
        document.addEventListener("mousemove",drag);
        document.addEventListener("mouseup",stop_drag);
    }
    /**
     * Permet de supprimer les differents events mis en place sur le document
     * PRIVATE
     */
    function __releaseEvent(){
        //console.log("remove events");
         //start capture, ie: passe le gestionnaire dans le body de  la pageXOffset
        document.removeEventListener("mousemove",drag);
        document.removeEventListener("mouseup",stop_drag);
    }
    
    /**
     * Event au click de la souris dans le header d'une table 
     * permet de lancer le drag 
     * @param evt: MouseDownEvent
     * @param elem: la table (datas) selectionnée
     */
    function start_drag(evt, elem){
        if(evt.button != 0) return;

        evt.preventDefault();
        evt.stopPropagation();
        //evt.target.style.zIndex = 2000;
        var el = elem[0];
        el.selected = true;
        __shift_left =  el.coords.x - evt.clientX;
        __shift_top = el.coords.y - evt.clientY;
        __cible = el;
        __captureEvents();
       
    }


    //var timer;//pour les events throttling
    /**
     * Event au mousemove si une table est selectionnée 
     * @param evt:MouseMoveEvent
     */
    function drag(evt){
        evt.preventDefault();
        //console.log("hello")
        // if(!timer) {
            
        //     timer = window.setTimeout(function() {
                // actual callback
        if(__cible){
            __cible.coords = {x:evt.clientX + __shift_left,
                            y:evt.clientY + __shift_top};
            //met a jour les relations pour cette table...
            //test: bypass le moteur de rendu 
            
            let tt = __cible.relations.length;
            for(var i=0;i<tt;i++){
                
                var r = __cible.relations[i];
                //r.notifyDatasetChanged("id");
                r.id = {};
            }
            
        }
                
            // }, 50);
        //}
        
    }
    /**
     * Event au mouse up: supprime les events au documnt et 
     * relache la cible 
     * @param evt: MouseUpEvent
     */
    function stop_drag(evt){
        if(__cible){
           
            __cible.selected = false;
            //remet en place une derniere fois...
            __cible.coords = {x:evt.clientX + __shift_left,
                            y:evt.clientY + __shift_top};
            //met a jour les relations pour cette table...
            
            let tt = __cible.relations.length;
            for(var i=0;i<tt;i++){
                var r = __cible.relations[i];
                //r.notifyDatasetChanged("id");
                r.id = {};
            }
                    
                
            __cible = null;
            __releaseEvent();
        }
        
    }
    // ---------------------------------------------------------------------------------------

    /* affichage du menu pour une table EN ATTENTE POUR L'instant
    franchement, ne pas avoir le click droit pour debugger, c'est un peu lourd... */

    //les differentes actions possibles 
    var menu_actions = {
        "new_table": function(evt, params){
            //demande a afficher la dialog nouvelle table...
            var t = new Table();
            t.coords = {x:evt.clientX, y:evt.clientY};
            dialogs.new_table.content = t;
            console.log("create table dialog", t);
            CONTEXT.show_dlg = dialogs.new_table;
        },
        "export_sql":function(evt,params){
            dialogs.export_sql.content = {_data_type:"ExportSQLDlg"};
            CONTEXT.show_dlg = dialogs.export_sql;
        },
        "save_schema":function(evt,params){
            //sauvegarde en localstorage;
        },
        "new_base":function(evt,params){
            dialogs.export_sql.content = {_data_type:"ExportSQLDlg"};
            CONTEXT.show_dlg = dialogs.export_sql;
        },
        "show_properties":function(evt,params){
            dialogs.properties.content = selected_table;
            CONTEXT.show_dlg = dialogs.properties;
        },
        "add_field":function(evt,params){
            var t = new Field();
            dialogs.add_field.content = t;
            CONTEXT.show_dlg = dialogs.add_field;
        },
        "delete_table":function(evt,params){
            CONTEXT.show_dlg = {
                
                "title":"Confirm",
                "desc":"confirm deletion of table?",
                content:{
                    _data_type:"ConfirmDlg",
                    question:"This action can not be undone! Are you fucking sure???"
                },
                commands:[
                    {
                        label:"OK",
                        action:"delete_comfirmed"
                    },
                    {
                        label:"No",
                        action:"toggle_dlg"
                    }
                ]
            };
        }
    };
    //menu principal de l'appli (click droit)
    var main_menu = [
        {
            action:"new_table",
            icon:"insert_drive_file",
            label:"New TABLE"
        },
        {
            action:"save_schema",
            icon:"save",
            label:"Save SCHEMA"
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
        }
    ];
    //menu contextuel pour les tables
    var ctx_menu = [
        {
            action:"show_properties",
            icon:"settings",
            label:"Properties"
        },
        {
            action:"add_field",
            icon:"playlist_add",
            label:"Add new Field"
        },
        {
            action:"delete_table",
            icon:"delete",
            label:"Delete TABLE"
        },
    ]
    //var event_processed = false;
    var selected_table = null;
    function show_menu (evt, elem){
        evt.preventDefault();
        evt.stopPropagation();
        //a voir...
        // CONTEXT.show_ctx_menu = !CONTEXT.show_ctx_menu;
        // if(CONTEXT.show_ctx_menu){
        //     CONTEXT.menu_coords = {
        //             x:evt.pageX ||evt.offsetX,
        //             y:evt.pageY || evt.offsetY
        //         };
        // }
        if(CONTEXT.menu == null) {
            //menu de table
            selected_table = elem[0];
            CONTEXT.menu = ctx_menu;
             CONTEXT.menu_coords = {
                        x:evt.pageX ||evt.offsetX,
                        y:evt.pageY || evt.offsetY
                    };
        }
        //event_processed = true;
    }
    function toggle_main_menu(evt, params){
        //un peu chiant lors du dev ca...

        //1er event envoyé?
        
        ;
        if(evt.button == 2){
            //show main menu
            evt.stopPropagation();
            evt.preventDefault();
            CONTEXT.menu = main_menu;
            
            CONTEXT.menu_coords = {
                        x:evt.pageX ||evt.offsetX,
                        y:evt.pageY || evt.offsetY
                    };
        } else if(CONTEXT.menu) {
            //dismiss menus
            evt.stopPropagation();
            evt.preventDefault();
           
            CONTEXT.menu = null;
        }
        
        // if(!event_processed && CONTEXT.show_ctx_menu){
        //     //fait disparaitre
        //     show_menu(evt,null);
        //     return;//fini
        // }
        // event_processed = false;
        // evt.stopPropagation();
        // evt.preventDefault();
        // //si decide de forcer l'appartition...
        // if(params && params.length > 0) {
        //     CONTEXT.show_main_menu = params[0] === true;
            
        // }
        // //sinon, simple toggle
        // else CONTEXT.show_main_menu = !CONTEXT.show_main_menu;
        
        // if(CONTEXT.show_main_menu){
        //         //enregistre les coords du click
               
        //         CONTEXT.menu_coords = {
        //             x:evt.pageX ||evt.offsetX,
        //             y:evt.pageY || evt.offsetY
        //         };
                 
        //     }
    }



    //TEST ONLY: convertie les datas d'une relation en affichage des divs --------------------
    
    /**
     * place les polyline pour affichage des relations entre les données
     * 
     * 
     * @param v: la relation a representer... 
     */
    

    function createSVGLink(v, relation){
        //calcule les coords des points du link 
        var r = relation;
        //recup les infos de position
        var fromElem = r.from._link;
        var toElem = r.to._link;
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        //la premiere fois, ne connait pas les elements....
        if(!r.from._link){
            //bon, il me le faut...
            fromElem = r.from._link = document.getElementById(r.from.field.id);
            if(!fromElem) return;
            toElem = r.to._link = document.getElementById(r.to.field.id);
        }

        //calcule les coords actuelles
        var t1 = fromElem.getBoundingClientRect(); //r.from.table.coords;
        var t2= toElem.getBoundingClientRect();//r.to.table.coords;
        console.log(t1,t2);
        //calcul les centres des fields 
        var cfx = t1.left + scrollX + t1.width/2;
        var ctx = t2.left +scrollX + t2.width/2;
        var cfy = t1.top - 28.8 +scrollY +t1.height/2;
        var cty = t2.top - 28.8 +scrollY + t2.height/2;

        //les positions relatives des divs
        var hw = (ctx - cfx)/2  + cfx;
        var hl = (cty - cfy)/2 + cfy;


        return cfx+","+cfy+" "+hw+","+cfy+" "+hw+" "+cty+" "+ctx+","+cty;
    }



    // Dialogues modale (sur le meme principe que les menus) --------------------------------
    // utilise une feinte pour faire croire que les objets sont differents en 
    //en definissant un type (_data_type)...mouhahahahaha
   
    
    var dialog_actions = {
        "create_and_close": function(evt, params){
            console.log("Create new table!!!!");
            var db = CONTEXT.db;
            if(db){
                db.tables.push(params[1]);
            }
        },
        "delete_comfirmed": function(evt,params){
            //supprime la table, on verra apres les relations
            console.log("Suppression de la table");
            if(selected_table){
                var ts =CONTEXT.db.tables;
                
                var i = 0;
                for(;i<ts.length;i++){
                    
                    if(ts[i] == selected_table) break;
                }
                if(i>-1){
                     ts.splice(i,1);
                    //supprime les relations si existent 
                    if(selected_table.relations.length != 0){
                        for (let i=0;i<selected_table.relations.length;i++){
                            //supprime
                            var rel = selected_table.relations[i];
                            //recherche dans les relations haut niveau 
                            var id=rel.id;
                            var from = rel.from.table;
                            if(from.name == selected_table.name) from = rel.to.table;

                            console.log("Suppression dans les autres tables....")
                            for(var j=0;j<from.relations.length;j++){
                                if(id==from.relations[j].id){
                                    console.log("suppression!!!!",from.relations[j]);
                                    from.relations.splice(j,1);
                                    break;
                                }
                            }
                            console.log("suppression globales")
                            for(var j=0;j<CONTEXT.db.relations.length;j++){
                                if(id==CONTEXT.db.relations[j].id){
                                    console.log("suppression",CONTEXT.db.relations[j])
                                    CONTEXT.db.relations.splice(j,1);
                                    break;
                                }
                            }

                            
                        }
                    }
                
            
                }
            }
            
            console.log(CONTEXT.db.relations)
        },
        "create_field": function(evt, params){
            console.log("Creation d'un nouveau field");
            var field = params[1];
            //ajoute au selected 
            if(selected_table) selected_table.fields.push(field);
        },
        "create_field_and_back": function(evt, params){
             console.log("Creation d'un nouveau field");
            var field = params[1];
            //ajoute au selected 
            if(selected_table) selected_table.fields.push(field);
            if(CONTEXT.show_dlg) CONTEXT.show_dlg.content=new Field();

            return true;
        },
        "create_table_and_field":function(evt,params){
            var db = CONTEXT.db;
            if(db){
                db.tables.push(params[1]);
                selected_table = params[1];
                //lance la dialog de menu 
                menu_actions.add_field(evt,params);
                return true;//empeche la fermeture de la dialogue
            }
        },
        "update_and_close":function(evt, params){

        }
    }
    var dialogs = {
        "new_table":{
            "title":"Create new table",
            "desc":"create a new table for this db",
            content:null,
            commands:[
                {
                    label:"Create table & close",
                    action:"create_and_close"
                },
                {
                    label:"create table & add field",
                    action:"create_table_and_field"
                },
                {
                    label:"Cancel",
                    action:"toggle_dlg"
                }
            ]
        },
        "export_sql":{
            "title":"Export",
            "desc":"Export schema to SQL",
            content:null,
            commands:[
                {
                    label:"Export to file",
                    action:"toggle_dlg"
                },
                {
                    label:"Export & create",
                    action:"toggle_dlg"
                },
                {
                    label:"Cancel",
                    action:"toggle_dlg"
                }
            ]
        }, 
        "new_base":{
            "title":"Create a new DB",
            "desc":"Create a new DB",
            content:null,
            commands:[
                {
                    label:"Create",
                    action:"toggle_dlg"
                },
                {
                    label:"Cancel",
                    action:"toggle_dlg"
                }
            ]
        }, 
        "field_properties":{
            "title":"Field Properties",
            "desc":"Update field property",
            content:null,
            commands:[
                {
                    label:"OK",
                    action:"toggle_dlg"
                }
            ]
        }, 
        "add_field":{
            "title":"Create new field",
            "desc":"Create new field",
            content:null,
            commands:[
                {
                    label:"Create",
                    action:"create_field"
                },
                {
                    label:"Create & add new",
                    action:"create_field_and_back"
                },
                {
                    label:"Cancel",
                    action:"toggle_dlg"
                }
            ]
        }, 
        "properties":{
            "title":"Table Properties",
            "desc":"update table properties",
            content:null,
            commands:[
                {
                    label:"Ok",
                    action:"none"
                }
            ]
        },
    };


    //Creation d'un jeu de données pour tester les renders -----------------------------------
    //DUMMY DATAS test only!


    //pour les relations, j'ai besoin d'avoir des pointeurs vers les objets
    //d'ou: creation a part...
    //note: je cree a part uniquement ceux dont je me sert, aucune methode
    //d'edition des données n'est faite encore...

    //le field pour l'ID client de la table 1
    var t1_id = new Field({
                        id:"uuid1",
                        name:"id"
    });
    //la foregn_key de la table 2
    var t2_fk = new Field({
                        id:"uuid2",
                        name:"id_client"
    });
    //FK de la table 3 (vers table1 et table2)
    var t3_fk = new Field({
                        id:"uuid52",
                        name:"other_commande"
    });
    var t4_fk =new Field({
        id:"uuid53",
        name:"other_again"
    });
    //les tables de la base (ayant des relations)
    var table1 = new Table({
                id:"anId",//identifiant unique de la tables
                name:'FirstTable',//nom de la table 
                coords:{x:90,y:120},
                selected: false,
                fields:[
                    t1_id,
                    new Field({
                        id:"uuid11",
                        name:"nom_client"
                    }),
                    new Field({
                        id:"uuid12",
                        name:"prenom_client"
                    })
                    //et le reste....
                ],
                relations: []
    });
    var table2 = new Table({
                id:"anId2",//identifiant unique de la tables
                name:'SecondTable',//nom de la table 
                coords:{x:400,y:500},
                selected: false,
                fields:[
                    new Field({
                        id:"uuid21",
                        name:"id"
                    }),
                    t2_fk,
                    new Field({
                        id:"uuid22",
                        name:"num_commande"
                    })
                    //et le reste....
                    
                ],
                //met a dispo les relations de cette table 
                relations:[]
    });
    var table3 = new Table({
                id:"anId5",//identifiant unique de la tables
                name:'OtherTable',//nom de la table 
                coords:{x:578,y:316},
                selected: false,
                fields:[
                    new Field({
                        id:"uuid51",
                        name:"id"
                    }),
                    t3_fk,
                    t4_fk
                    //et le reste....
                    
                ],
                //met a dispo les relations de cette table 
                relations:[]
    });
    
   
   
    //une relation entre 2 tables
    var relation = {
                id:"link1",
                top:{
                    x: 20,
                    y: 30,
                },
                bottom: {
                    x: 400,
                    y: 350
                },
                from:{
                    table: table1,
                    field: t1_id,
                    _link: null //ca, c'est vraiement pas beau....
                },
                to:{
                    table: table2,
                    field: t2_fk,
                    _link: null
                }
    };
    table1.relations.push(relation);
    table2.relations.push(relation);

    //cree une autre relation 
    var relation2 = {
                id:"link2",
                top:{
                    x: 20,
                    y: 30,
                },
                bottom: {
                    x: 400,
                    y: 350
                },
                from:{
                    table: table1,
                    field: t1_id,
                    _link: null //ca, c'est vraiement pas beau....
                },
                to:{
                    table: table3,
                    field: t3_fk,
                    _link: null //ca, c'est vraiement pas beau....
                }
    };
    table1.relations.push(relation2);
    table3.relations.push(relation2);
    //et la derniere, on pense toujours a l'inscrire dans la table...
    var relation3 = {
        id:"link3",
                top:{
                    x: 20,
                    y: 30,
                },
                bottom: {
                    x: 400,
                    y: 350
                },
                from:{
                    table: table2,
                    field: t2_fk,
                    _link: null //ca, c'est vraiement pas beau....
                },
                to:{
                    table: table3,
                    field: t4_fk,
                    _link: null //ca, c'est vraiement pas beau....
                }
    }
    table2.relations.push(relation3);
    table3.relations.push(relation3);
    
    
    //les relations entre les differentes tables de la base,
    //pour me simplifier la vie, elles sont aussi globales (voir a changer ca plus tard...)
    var relations = [
            //decrit une relation (pas de 1 à n pour l'instant ou de truc comme ca...)
            //entre 2 tables
            relation,
            relation2,
            relation3
        ];
    //END DUMMY DATAS
    
    
   
   
   
   
   
    //Les données relatives a la base : connection, tables, relations... -----------------------------
    //c'est le coeur du programme!
    var db = new Base({
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
            table1,
            table2,
            table3
        ],
        //desciption des relations entre les tables
        //voir plus bas le pourquoi du hack...
        relations:null
    });



    
    /**
     * Le context de données global retourné par mon module ------------------------------------------
     * c'est lui qui est accessible pour le moteur de rendu
     */
    var CONTEXT =  {
        app_name : "GRETA SQL Tool",
        app_slogan : "a sql tool that is super cool!",
        
        db:db,//les données de l'application
        


        //events drag&drop simul pour les tables
        start_drag: start_drag,
        drag: drag,
        stop_drag:stop_drag,






        // show_main_menu: false,//affichage du click doit sur la zone de travail
        // show_ctx_menu: false,//affichage du click doit sur la zone de travail
        menu_coords:{
            x:0,
            y:0
        },//coords d'ou faire apparaitre le menu
        menu: null,//le menu a afficher
        show_menu: show_menu,
        showMainMenu: toggle_main_menu,
        menu_action:function(evt, params){
            //appelle lors du click sur un menu
            //d'abord, dismiss menu 
            evt.preventDefault();
            evt.stopPropagation();


            CONTEXT.menu = null; 
            var action =  params[0] || "none";

            if(menu_actions[action]){
               menu_actions[action](evt,params);
            }

        },



        // les boites de dialogue
        show_dlg : null,
        toggle_dlg: function(evt){CONTEXT.show_dlg = null;},
        dlg_action: function(evt, params){
            var action =  params[0] || "none";
            var res = false;
            if(dialog_actions[action]){
                var content = CONTEXT.show_dlg.content;
                params.push(content);
               res = dialog_actions[action](evt,params);
            }
            //dismiss dialog
            if(!res)CONTEXT.show_dlg = null;
            //action todo
        },
        show_item_properties:function(event, params){
            //affiche les properties du field 
            console.log("show item", params[0]);
            dialogs.field_properties.content = params[0];
            CONTEXT.show_dlg = dialogs.field_properties;
        },
        
        
        
        //qqs converters
        coords_to_translate:function(v) {
            return "transform: translate("+v.x+"px,"+v.y+"px);";
        },
        setTableSelectedConverter: function(v){
            return v ? "selected" : "";
        },
        relation_to_points_converter: createSVGLink,



        //test methode 
        test_change_name: function(){
            CONTEXT.db.db_name = "masuperbasequelleestbien";
        }

    };

    //HACK:comme j'ai besoin d'avoir les elements HTML pour pouvoir faire les dessins,----------------
    //je demande a charger les relations 100ms apres le reste, ca laisse le temps
    //pour les affichages...
    //MAIS: uniquement du au fait que les données soient en dur dans le javascript,
    //ne devrait :) pas poser de probleme avec les loading de fichiers...
    window.addEventListener("load", function(){
       window.setTimeout(function(){
           console.log("hello")
            CONTEXT.db.relations = relations;//force le 1er paint
        },100);
    });



    return CONTEXT;
})();
