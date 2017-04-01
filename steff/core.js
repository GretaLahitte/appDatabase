/**
 * Les datas et controllers pour l'application
 */
var myContext = (function (){

    

    //GESTION DRAG AND DROP DES TABLES -------------

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
     * Permet de supprimer les differents events mis en place
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
    /**
     * Event au mousemove si une table est selectionnée 
     * @param evt:MouseMoveEvent
     */
    function drag(evt){
        evt.preventDefault();
        //console.log("hello")
        if(__cible){
            __cible.coords = {x:evt.clientX + __shift_left,
                              y:evt.clientY + __shift_top};
            //met a jour les relations pour cette table...
            
            let tt = __cible.relations.length;
            for(var i=0;i<tt;i++){
                var r = __cible.relations[i];
                r.notifyDatasetChanged("top");
                r.notifyDatasetChanged("bottom");
            }
            
        }
    }
    /**
     * Event au mouse up: supprime les events au documnt et 
     * relache la cible 
     * @param evt: MouseUpEvent
     */
    function stop_drag(evt){
        if(__cible){
            console.log("release event");
            __cible.selected = false;
            console.log(__cible);
            __cible = null;
            __releaseEvent();
        }
        
    }
    // -----------------------------------------------

    /* affichage du menu pour une table */
    function show_menu (evt, elem){
        evt.preventDefault();
        evt.stopPropagation();
        //a voir...
    }
    function toggle_main_menu(evt, params){
        //un peu chiant lors du dev ca...
        // evt.stopPropagation();
        // evt.preventDefault();
        // //si decide de forcer l'appartition...
        // if(params && params.length > 0) CONTEXT.show_main_menu = params[0] === true;
        // //sinon, simple toggle
        // else CONTEXT.show_main_menu = !CONTEXT.show_main_menu;
        
    }



    //TEST ONLY: convertie les datas d'une relation en affichage des divs --------------------
    /**
     * place les divs pour affichage des relations entre les données
     * 
     * Probleme: scales negatifs!!!
     * @param v: la relation a representer... 
     */
    function createLink(v, relation){
        
       // console.log("Creation de la relation: ",relation, v);
        //recup les coords des tables 
        var r = relation[1];
        var obj = relation[0];

        

        var transform = "";
        if(obj == 'from'){
            var t1 = r.from.table.coords;
            var t2=r.to.table.coords;
            //le field demandé 
            var findex =43 + 33 * (r.from.index+0.5);            
            var tindex = 43 + 33 * (r.to.index+0.5);

            var hw = (t2.x - t1.x)/2;
            var hl = ((t2.y + tindex) - (t1.y + findex))/2;

            
            transform = "transform: translate("+t1.x+"px,"+(t1.y+findex)
                        +"px); width:"+hw+"px; height:"+hl+"px;";
        } else {
            
            var t1 = r.to.table.coords;
            var t2=r.from.table.coords;
            var findex =43 + 33 * (r.from.index+0.5);            
            var tindex = 43 + 33 * (r.to.index+0.5);

            var hw = (t1.x - t2.x)/2;
            var hl = ((t1.y + tindex) - (t2.y+findex))/2;

            transform = "transform: translate("+(t1.x - hw)+"px,"+(t1.y  + tindex - hl)+"px); width:"+hw+"px; height:"+hl+"px;";
        }
        //console.log("obj",obj,transform);
        return transform;
        
    }


    //Creation d'un jeu de données pour tester les renders -----------------------------------
    //DUMMY DATAS test only!


    //pour les relations, j'ai besoin d'avoir des pointeurs vers les objets
    //d'ou: creation a part...
    //note: je cree a part uniquement ceux dont je me sert, aucune methode
    //d'edition des données n'est faite encore...

    //le field pour l'ID client de la table 1
    var t1_id = {
                        id:"uuid1",
                        name:"id"
    };
    //la foregn_key de la table 2
    var t2_fk = {
                        id:"uuid2",
                        name:"id_client"
    };
    //FK de la table 3
    var t3_fk = {
                        id:"uuid52",
                        name:"other_commande"
                    };
    //les tables de la base
    var table1 = {
                id:"anId",//identifiant unique de la tables
                name:'FirstTable',//nom de la table 
                coords:{x:90,y:120},
                selected: false,
                fields:[
                    t1_id,
                    {
                        id:"uuid11",
                        name:"nom_client"
                    },
                    {
                        id:"uuid12",
                        name:"prenom_client"
                    }
                    //et le reste....
                ],
                relations: []
            };
    var table2 = {
                id:"anId2",//identifiant unique de la tables
                name:'SecondTable',//nom de la table 
                coords:{x:400,y:500},
                selected: false,
                fields:[
                    {
                        id:"uuid21",
                        name:"id"
                    },
                    t2_fk,
                    {
                        id:"uuid22",
                        name:"num_commande"
                    }
                    //et le reste....
                    
                ],
                //met a dispo les relations de cette table 
                relations:[]
            };
    var table3 = {
                id:"anId5",//identifiant unique de la tables
                name:'OtherTable',//nom de la table 
                coords:{x:600,y:500},
                selected: false,
                fields:[
                    {
                        id:"uuid51",
                        name:"id"
                    },
                    t3_fk,
                    
                    //et le reste....
                    
                ],
                //met a dispo les relations de cette table 
                relations:[]
            };
    
   
   
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
                    index: 0
                },
                to:{
                    table: table2,
                    field: t2_fk,
                    index: 1
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
                    index: 0
                },
                to:{
                    table: table3,
                    field: t3_fk,
                    index: 1
                }
    };
    table1.relations.push(relation2);
    table3.relations.push(relation2);
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
            table1,
            table2,
            table3,
            {
                id:"anId3",//identifiant unique de la tables
                name:'ThirdTable',//nom de la table 
                coords:{x:600,y:550},
                selected: false,
                fields:[
                    
                    //pas de fields ici pour les tests....
                    
                ],
                relations:[]
            }

        ],
        //desciption des relations entre les tables
        relations:[
            //decrit une relation (pas de 1 à n pour l'instant ou de truc comme ca...)
            //entre 2 tables
            relation,
            relation2
        ]
    }



    

    var CONTEXT =  {
        app_name : "GRETA SQL Tool",
        app_slogan : "a sql tool that is super cool!",
        show_main_menu: false,//affichage du click doit sur la zone de travail
        db:db,//les données de l'application

        //events drag&drop simul pour les tables
        start_drag: start_drag,
        drag: drag,
        stop_drag:stop_drag,
        show_menu: show_menu,
        showMainMenu: toggle_main_menu,

        //qqs converters
        coords_to_translate:function(v) {
            return "transform: translate("+v.x+"px,"+v.y+"px);";
        },
        setTableSelectedConverter: function(v){
            return v ? "selected" : "";
        },
        coords_to_position:createLink
        

    };

    return CONTEXT;
})();
