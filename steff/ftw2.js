var ftw2 = (function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    return factory();
  }
}(this, function () {

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  
objects.js: pour permettre le binding d'objet

surcharge defineProperty: c'est appell� a etre modifier dans une future version
*/

//test rewrite des objets



//defini une methode qui peut etre appell� par le constructeur lui meme pour le data-context 
//evite les closures
//Probleme, n'ajoute pas dans l'objet (genre, methode statique) mais dans l'objet Function
//a cause du this! me manque l'instance!
Function.prototype.defineBindProperty = function( name, accessors) {
        
  // enrobe le setter
  if(accessors.set) {
        setters = {     get: function(){ return accessors.get.call(this)},//le getter, obligatoire
                        set: function(v){              

                            //("Hello setter!");
                            //(this);
                            //(this.__uuid__);
                            accessors.set.call(this,v);
                            //met a jour les bindings....
				//passe l'UUID de l'objet pour retrouver avec la cl?
				//note, context itou?
				//notifyDatasetChanged(this.__uuid__+":"+obj_k);
                                //OU: creer une classe particuliere?
                                if (this.__uuid__){
                                        //("has uuid");
                                        var key = this.__uuid__+":"+name;
                                        var bindings = BINDINGS;
                                        if (key in bindings) {
                                                __notifyDatasetChanged(this,bindings[key], key);
                                        }
                                }
                                
				
                        },
                        enumerable: accessors.enumerable,
                        //writable: accessors.writable
        };
        Object.defineProperty(this.prototype, name, setters);
  }
  else
  {
          //cree un getter/setter normalement
          Object.defineProperty(this.prototype, name, accessors);
  }
  
  
};


//permet de creer le necessaire pour la liaison de donn�e  (ie: property et notify)
//@param obj: le plain object javascript a rendre 'bindable'
var defineBindObject = function(obj){
    if (obj == null) return;
    var is_array = false;

    if (obj.hasOwnProperty('__uuid__') !== true){
        if (Array.isArray(obj) && ""+Object.prototype.toString.call(obj)!="[object String]"){
            is_array = true;
        }

        else if (""+Object.prototype.toString.call(obj)!="[object Object]") {

    		return;//deja fait
    	}
    } else return;


	//cree la property de marquage
        //pour array et objet, idem
	var uuid = generateUUID();

	Object.defineProperty(obj, '__uuid__',{value:uuid , enumerable: false, writable:false});//????? avec le in, pe un probleme?
	Object.defineProperty(obj, 'notifyDatasetChanged',{value: function(name, extra){
		
				//passe l'UUID de l'objet pour retrouver avec la cl?
				//note, context itou?
				//notifyDatasetChanged(this.__uuid__+":"+obj_k);
				var key = this.__uuid__+":"+name;
                                // console.log("search for "+key);
				if (key in BINDINGS) {
					////("OK");
                                        //("notify from setter");
					__notifyDatasetChanged(this,BINDINGS[key], key, extra);
				}
	}, enumerable: false, writable:false});
	//defini des  owners pour l'objet EXPERIMENTAL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	Object.defineProperty(obj, "__owners__",{value:[], enumerable:false, modifiable:true});
	//ajoute, supprime un owners
	obj.AddToOwners = function(owner, prop_name){
		this.__owners__.push( [owner, prop_name]);//ajoute a la liste
	};
	obj.RemoveFormOwners = function(owner, prop_name){
		if (this.__owners__){
                        var owi = this.__owners__.length;
                        while(owi--){
			//for (owi=0;owi<this.__owners__.length; owi++){
				var ow = this.__owners__[owi];
				if (ow[0] == owner && ow[1]==prop_name){
					this.__owners__.slice(owi,1);//supprime
					break;//fini
				}
			}
		}
	};

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //si array, binde de facon particuliere
    if (is_array){
        //("ArrayBinding data: particulier");
        obj.__proto__ = DBArray;//change le prototype!
        return;
    }
    else {
        //un objet normal, binde les property
        /*var keys = Object.keys(obj);
        var key_count = keys.length;*/
        //while (key_count--){
        for (obj_k in obj){
        //        var obj_k = keys[key_count];
    		if (typeof obj[obj_k] == "function" || obj_k.substr(0,1) == '_')continue;
                

    		//cree le binding, ie, cree une nouvelle property pour l'objet
    		//non enumerable
                var old = obj[obj_k];

    		Object.defineProperty(obj, "__"+obj_k,{
    			value : obj[obj_k],
    			enumerable:false,
    			writable:true
    		});

    		//change la property pour mettre en place le notifydatasetchanged
    		//cree une cl? de la forme className_propName

    		//probleme prop_key change, probleme closure
    		__define_property(obj, obj_k);

			//(obj);

           //Si une valeur, binde la valeur
            if(obj[obj_k]!= undefined){
			//("binding de "+obj_k);
                defineBindObject(obj[obj_k]);
                if (obj[obj_k]!= undefined && obj[obj_k].AddToOwners)  obj[obj_k].AddToOwners(obj, obj_k);
            }
    	}
    }


}




//definie une property pour un objet a lier
//INTERNAL
//@param obj: l'instance de l'objet a lier
//@param obj_k: nom de la property a lier
function __define_property(obj, obj_k){
	Object.defineProperty(obj,obj_k,{
			get : function(){
				return this["__"+obj_k];
			},
			set : function(value){

                                //experimental !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                var old = this["__"+obj_k];
                                if (value != null ) defineBindObject(value);


                                if (old != null && old.RemoveFromOwners) old.RemoveFromOwners(this,obj_k);
                                if (value!= null && value.AddToOwners) value.AddToOwners(this, obj_k);
                                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

				this["__"+obj_k] = value;
                                if (this.__uuid__){
                                        var key = this.__uuid__+":"+obj_k;
                                        var bindings = BINDINGS;
                                        if (key in bindings) {
                                                __notifyDatasetChanged(this,bindings[key], key);
                                        }
                                }
			}
		});
}



/*
//permet de creer le necessaire pour la liaison de donn�e  (ie: property et notify)
//@param obj: le plain object javascript a rendre 'bindable'
var defineBindObject = function(obj){
    if (obj == null) return;
    var is_array = false;

    //("defining bind object");
    //("Verify si a un uuid");
    //if (!('__uuid__' in obj)){
    if (typeof obj.__uuid__ == "undefined" ) {
        //("n'a pas d'uuid....");
        if (Array.isArray(obj) && ""+Object.prototype.toString.call(obj)!="[object String]"){
            is_array = true;
        }

        else if (""+Object.prototype.toString.call(obj)!="[object Object]") {

    		return;//deja fait
    	}
    } else return;


	//cree la property de marquage
	var uuid = generateUUID();
        //("Generating UUID for obj");
        //(obj.__proto__);
	obj.__proto__.constructor.defineBindProperty( '__uuid__',{value:uuid , enumerable: false, writable:false});//????? avec le in, pe un probleme?
	obj.__proto__.constructor.defineBindProperty( 'notifyDatasetChanged',{value: function(name, extra){
		
				//passe l'UUID de l'objet pour retrouver avec la cl?
				//note, context itou?
				//notifyDatasetChanged(this.__uuid__+":"+obj_k);
				var key = this.__uuid__+":"+name;
                                //("search for "+key);
				if (key in BINDINGS) {
					////("OK");
                                        //("notify from setter");
					__notifyDatasetChanged(this,BINDINGS[key], key, extra);
				}
	}, enumerable: false, writable:false});
	//defini des  owners pour l'objet EXPERIMENTAL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	Object.defineProperty(obj, "__owners__",{value:[], enumerable:false, modifiable:true});
	//ajoute, supprime un owners
	obj.AddToOwners = function(owner, prop_name){
		this.__owners__.push( [owner, prop_name]);//ajoute a la liste
	};
	obj.RemoveFormOwners = function(owner, prop_name){
		if (this.__owners__){
                        var owi = this.__owners__.length;
                        while(owi--){
			//for (owi=0;owi<this.__owners__.length; owi++){
				var ow = this.__owners__[owi];
				if (ow[0] == owner && ow[1]==prop_name){
					this.__owners__.slice(owi,1);//supprime
					break;//fini
				}
			}
		}
	};

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //si array, binde de facon particuliere          => Probleme ici, chance le prototype!!!!!!!!
    if (is_array){
        //("ArrayBinding data: particulier");
        obj.__proto__ = DBArray;//change le prototype!
        return;
    }
    else {
        //un objet normal, binde les property
        //IE: cree les getters/setters DANS LE PROTOTYPE? (faire un switch de prototype?)
       
        
        
        /*var keys = Object.keys(obj);
        var key_count = keys.length;*
        //while (key_count--){
        for (var obj_k in obj){
        //        var obj_k = keys[key_count];
    		if (!obj.hasOwnProperty(obj_k) || typeof obj[obj_k] == "function" || obj_k.substr(0,1) == '_')continue;
                

    		//cree le binding, ie, cree une nouvelle property pour l'objet
    		//non enumerable
                var old = obj[obj_k];

    		obj.__proto__.constructor.defineBindProperty( "__"+obj_k,{
    			value : old,
    			enumerable:false,
    			writable:true
    		});

    		//change la property pour mettre en place le notifydatasetchanged
    		//cree une cl? de la forme className_propName

    		//probleme prop_key change, probleme closure
    		__define_property(obj, obj_k);
                //supprime de l'objet lui meme??? sinon, la property cache le setter
                //uniquement si existe deja????
                delete obj[obj_k];//ca, ca ne va pas.....                                              ===============> TODO: comment faire pour ne pas delete?????
                
                
           //Si une valeur, binde la valeur: normalement, passe par le setter du prototype!
            if(obj[obj_k]!= undefined){
			//("binding de "+obj_k);
                defineBindObject(obj[obj_k]);
                if (obj[obj_k]!= undefined && obj[obj_k].AddToOwners)  obj[obj_k].AddToOwners(obj, obj_k);
            }
    	}
        
        //probleme, les variables de l'objet surchargent les getters/setters, et pas bon...
    }


}




//definie une property pour un objet a lier
//INTERNAL
//@param obj: l'instance de l'objet a lier
//@param obj_k: nom de la property a lier
function __define_property(obj, obj_k){
	obj.__proto__.constructor.defineBindProperty(obj_k,{
			get : function(){
				return this["__"+obj_k];
			},
			set : function(value){

                                //experimental !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                var old = this["__"+obj_k];
                                if (value != null ) defineBindObject(value);


                                if (old != null && old.RemoveFromOwners) old.RemoveFromOwners(this,obj_k);
                                if (value!= null && value.AddToOwners) value.AddToOwners(this, obj_k);
                                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

				this["__"+obj_k] = value;
			}
		});
}
*/






        ;/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  array.js: l'objet de base pour les tableaux "bind�s" par le framework
  Permet d'etre prevenu lors d'une modification du tableau
  

*/

//surcharge qqs methodes de array pour etr prevenu des push, slice...
var DBArray = Object.create(Array);

//DBArray.__proto__ = new Array();
DBArray.push = function(){

    //ajoute a l'array
    Array.prototype.push.apply(this,arguments);
    if(this.__owners__){
        //previens les owners
        var extra = {action:'PUSH', value: arguments.length};//le nombre de datas ajout�s: voir plus tard...
        
        for (owi=0;owi<this.__owners__.length; owi++){
            ow = this.__owners__[owi];
            if(ow[0].notifyDatasetChanged){
                //DOIT INFORMER DE CE QU'IL DOIT FAIRE: ie AJOUT A LA FIN
                ow[0].notifyDatasetChanged(ow[1],extra);
            }
        }
    }

};
DBArray.splice = function(){
    //ajoute ET supprime
    
    Array.prototype.splice.apply(this,arguments);
    extra = {action:"SPLICE",index:arguments[0], howmany:arguments[1], count:arguments.length - 2}//
    if(this.__owners__){

        for (owi=0;owi<this.__owners__.length; owi++){
            ow = this.__owners__[owi];
            if(ow[0].notifyDatasetChanged) ow[0].notifyDatasetChanged(ow[1],extra);
        }
    }
};
DBArray.pop = function(){
    //supprime le dernier element de la liste
    var p = Array.prototype.pop(this,arguments);
    
    if(this.__owners__){
        var extra = {action:'POP'};
        for (owi=0;owi<this.__owners__.length; owi++){
            ow = this.__owners__[owi];
            if(ow[0].notifyDatasetChanged) ow[0].notifyDatasetChanged(ow[1], extra);
        }
    }
    return p;
};
DBArray.shift = function(){
    //retire le premier elemnt du tableau
    p = Array.prototype.shift.apply(this,arguments);
    extra = {action:'SHIFT'}
    if(this.__owners__){

        for (owi=0;owi<this.__owners__.length; owi++){
            ow = this.__owners__[owi];
            if(ow[0].notifyDatasetChanged) ow[0].notifyDatasetChanged(ow[1],extra);
        }
    }
    return p;
};
DBArray.unshift = function(){
    //ajoute un ou plusieurs element au tableau en debut
    p = Array.prototype.unshift.apply(this,arguments);
    extra = {action:'UNSHIFT', value: arguments.length};//le nombre de datas ajout�s: voir plus tard...

    if(this.__owners__){

        for (owi=0;owi<this.__owners__.length; owi++){
            ow = this.__owners__[owi];
            if(ow[0].notifyDatasetChanged) ow[0].notifyDatasetChanged(ow[1], extra);
        }
    }
    return p;//la nouvelle longueur du tableau
};
//overribe bracket setter? voir avec les proxies
DBArray.set = function (obj, index){
    //modifie l'item a l'index
    //NOTE: on pourrait (!!) creer des property pour chaque element de l'array
    //mais si il y en a beaucoup????
    old = this[index].__uuid__;

    this[index] = obj;
    extra = {action:'SET', index: index};//uuid de l'objet a supprimer...

    if(this.__owners__){

        for (owi=0;owi<this.__owners__.length; owi++){
            ow = this.__owners__[owi];
            if(ow[0].notifyDatasetChanged) ow[0].notifyDatasetChanged(ow[1], extra);
        }
    }
}

;/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

 
*/

/*le binding par defaut, remplace les données de la property bindée par
le nouvelle valeur
*/
function __prop_binding(infos){
    if (infos == null) return;
    //initialisations pas glop, serait mieux si init a vide...
    this._path = infos.path; 			//getDomPath(this._element, infos.root);
    this.to=infos.to;				//nom de la property a binder, par defaut setValue?
    this.from = infos.from;			//nom de la datas (ou path) a binder
    
    
    this.mode = infos.mode;			//choix one_way, 2 way si input?
    this.converter = infos.converter;	        //pour convertir les donn�es en ce qu'on veut
    this._converter_params = null;		//parametres pour le converter
    this._fallback = null;			//quoi afficher par defaut
    
    this.converter_params = infos.converter_params;//des parametres optionnels pour le converter TODO
    this.fallback = infos.fallback;		//si la valeur est null (ou invalide?), ce qui doit etre afficher

        

    this.alt = infos.alt;			//liaison a d'autres property
    this.root = infos.root;			//l'element root du binding
    this._element = infos._element;		//element html a binder (peut se trouver dans un model!!!)

    this._key_uuid_ = null;			//je m'en sert encore de ca???
    
    

	
}
__prop_binding.prototype = {
        get converter_params(){return this._converter_params;},
        set converter_params(value){
                if (value==null) this._converter_params = null;
                //split la chaine en un tableau de parametres
                else if (value[0]=='[' && value[value.length-1]==']'){
                        
                        value = value.substring(1, value.length-1);
                        this._converter_params = [];
                        vs = value.split(",");
                        for (vp=0;vp<vs.length;vp++){
                            p=vs[vp];
                            this._converter_params.push(__unstringify(p));
                        }
                }

                else {
                    //un seul parametre...
                    this._converter_params = __unstringify(value);
                }
        },
        
        get fallback(){return this._fallback;},
        set fallback(value){this._fallback = __unstringify(value);}
};

//initialisation du binding au besoin
__prop_binding.prototype.init = function (context){
        //rien ici...
}
//nettoyage du binding: rien ici
__prop_binding.prototype._clean = function (){}
//Recupere le nom de toutes les property a surveiller pour la mise
//a jour de ce binding
//PROBLEME: appel a cette méthode a chaque mise a jour des données, il faudrait mettre le resultat en cache?                  ====> TODO
//@param infos: les informations de binding
//@return array: les noms de property a surveiller (from, alts et converter_params)
__prop_binding.prototype.getBindingKeys = function(infos){

        var infos = infos || this;
        //gestion du 'alt' ------------------------------------------------
        var keys = infos.alt;
        if(keys) keys = keys.split(',');
        else keys = [];


        //si des parametres de converter, bind aussi....
        if(this.converter_params != null){
            var ci = this.converter_params.length;
            var p = null;
            while(ci--){
            //for (ci=0;ci<this.converter_params.length;ci++){
                p = this.converter_params[ci];
                if (p[0]=='$'){
                    p=p.substring(1);
                    keys.push(p);//ajoute a la liste, pas acces au context pour l'instant...
                }
            }
        }


        keys.push(infos.from);//ajoute le from qd meme!

        return keys;
    }

//met a jour le contenu du binding
//@param value: la valeur a afficher (peut etre null)
//@param context: le context de données courant
//@param extra: des parametres en plus (non utilisé pour l'instant)
__prop_binding.prototype.populate = function(value, context, extra){

        if(value == null) value = this.fallback;
        value = this.convert_value (value, context);
        //modif: utilise dom_batch pour eviter les mises a jour du DOM directement
        _dom_batch_.dom_batch_set_property(this._element, this.to, value);
        //this._element[this.to] = value;
        this._key_uuid_ = context.__uuid__+":"+this.from;

    }

 
//convertie la valeur passée au populate en fonction du converter et de ses
//parametres
//@param value: la valeur a convertir
//@param context: le context de données courant
//@param return: la valeur convertie
__prop_binding.prototype.convert_value=function(value, context){
        //au cas ou des params commencant par $
        
        if (this.converter!=null)
	{
            
            var p = null;//pour stocker les valeurs courantes des parametres...
            var cp = null, key=null, keys = null, v = null;
            
            if(this.converter_params != null){
                    
                if (Array.isArray(this.converter_params)){
                    p = [];
                    var cpi = this.converter_params.length;
                    
                    while(cpi--){                    
                        cp = this.converter_params[cpi];
                            
                        if (cp[0]=='$'){
                            key = cp.slice(1);
                            if(key == "this") v = context;
                            else {
                                v = context;
                                keys = key.split('.');
                                if (keys[0] == "global") {
                                    v = CONTEXT;//passe en context global
                                    keys = keys.slice(1);//et supprime global de la liste
                                }
                                
                                for (var k = 0, e=keys.length; k<e;k++){
                                    k=keys[k];
                                    if (k in v) v= v[k];
                                    else {
                                        v = null;
                                        break;
                                    }
                                }
                            }
                            p.push(v);//ajoute la valeur trouvée!

                        } else {p.push(cp);}
                    }
                } else {
                    //un seul parametre passé
                    cp = this.converter_params;
                    if (cp[0]=='$'){

                        key = cp.slice(1);
                        if(key == "this") p = context;
                        else if(key in context){
                            p = context[key];//recupere la valeur actuelle, mais doit se tenir informé des modifs
                        }
                    }else {p=cp;}
                }
            }
		//la methode: si commence par ftw2:, une methode du framework
                if (this.converter.startsWith("ftw2:")){
                        converter = this.converter.substr(5);
                        //appel a la methode
                        value = eval(converter)(value,p);
                } else {
                        //considere que la methode se trouve en portée globale.
                        //OU oblige a la creer dans le context de données global?????                                   ==> TODO
                        
                        
                        if (this.converter in CONTEXT && CONTEXT[this.converter] instanceof Function) value = CONTEXT[this.converter](value,p);
                        else value = window[this.converter](value,p); 
                }
	}
        return value;
    }

//@deprecated
__prop_binding.prototype.clone = function(root){
        //cree un nouveau binding lié au root element
        infos = {};
        for(k in this._infos){
                infos[k]=this._infos[k];
        }
        //autorise le process event
        infos["process_event"] = true;
        //recupere l'element html a partir du root
        ////("INFOS PATH: "+this._path);
        infos._element = root.querySelector(this._path);

        ////("root of element");
        ////(infos._element);
        return __create_binding_from_infos(infos);

	}


        
        
        ;//--require property_binding

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  textcontent_binding.js:

*/
      
/* un binding sur une zone de texte (en general, entre 2 balises)*/
function __textContent_binding(infos){    
    
    __prop_binding.call(this, infos);
    this._index = infos._index;		//index dans la chaine argument ou se trouve le binding
    this._length = infos._length;	//taille de la donn�e du binding (en char)


    
}

__textContent_binding.prototype = new __prop_binding( );
__textContent_binding.prototype.populate = function(value, context, extra){


        if(value == null) value = this.fallback;
	value =""+ this.convert_value (value, context);//force string



        //probleme, si binding interieur, il y a du texte...
        var dt = this._element.textContent;


        //remplace dans la string html, garde ce qu'il y a avant et apres
        var start = this._index == 0 ? "" : dt.substring(0, this._index);
        var end = dt.substring(this._index + this._length);
        //la taille de la datas (pour pouvoir modifier apres)

        this._length = value.length;
        _dom_batch_.dom_batch_set_property(this._element, "textContent", start + value + end );
        //this._element.textContent = start + value + end ;
        this._key_uuid_ = context.__uuid__+":"+this.from;
    };//--require property_binding

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  attribute_binding.js:

*/

/*binding d'un attribute HTML (ex: class)*/
function __attr_binding(infos){

    __prop_binding.call(this, infos);


    this._index = infos._index;		//index dans la chaine argument ou se trouve le binding
    this._length = infos._length;	//taille de la donn�e du binding (en char)
    
}
__attr_binding.prototype = new __prop_binding(  );
__attr_binding.prototype.populate = function(value, context, extra){

        //pas une property de l'element (ex: class), modifie le html
        if(value == null) value = this.fallback;
		value =""+ this.convert_value (value, context);//force string

        var dt = this._element.getAttribute("data-binded-"+this.to);
        if(dt == null){
            //ancienne facon?
            dt = this._element.getAttribute(this.to);
        }
        //remplace dans la string html, garde ce qu'il y a avant et apres
        var start = this._index == 0 ? "" : dt.substring(0, this._index);
        var end = dt.substring(this._index + this._length);
        
        var finale_value = start + value + end;
        _dom_batch_.dom_batch_set_attribute(this._element, this.to, finale_value);
        //this._element.setAttribute(this.to,start + value + end );
        this._key_uuid_ = context.__uuid__+":"+this.from;
    }

    
    ;//--require property_binding

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
todo: systeme de recyclage de vues

*/

function __model_binding(infos){
        
    if (infos == null) return;
    
    this.deep = infos.deep || true;             //binde les proprietes de l'objet??
    
    __prop_binding.call(this, infos);
    this.presenter = infos.presenter;	//le code html pour l'affichage des donn�es de l'objet
    this.merge = infos.merge;		//@deprecated compliqué a expliquer pour une utilisation tres reduite (voir exemple SVG)
    this.empty = infos.empty;

    this._empty = false;
    
    this._child_binding = []; //les bindings générées par ce model
    this._generated_keys = [];//les clés de ce binding!
    this._ftw2_type = null;//le type de données actuellement affichée
    
    
    
    //les data-types, met les en cache, de toute facon, il faudra les recuperer...
    //MAIS: recupere tous les types en place du type necessaire uniquement
    //a voir....
    
    
    //probleme, chq model_binding correspond a un MODEL[id ou id_type]
    
    //a passer dans AppInit!!!!                                 ====> TODO
    /*model = document.getElementById(this.presenter);
    if (model){
           
        this._root_model = model;
        this._cache_types = {};
        
        //recupere les datas types si existent
        var children = model.children;
        if (children == null){
                children = [];
                var childs = model.childNodes;
                var end = childs.length;
                for (i= 0; i< end; i++){
                      if (childs[i].nodeType != 8 && (childs[i].nodeType != 3 || /\S/.test(childs[i].nodeValue))){
                              children.push( childs[i] );
                              break;
                      }
                }
        }
        var count = children.length;
        while (count--){
                var elem = children[count];
                var type="defaut";
                
                if (elem.hasAttribute("data-type")){
                        type = elem.getAttribute("data-type");
                } 
                //enregistre
                this._cache_types[type] = elem;
        }
        if (this.fallback) this._cache_types['fallback'] = document.getElementById(this.fallback);
        if (this.empty) this._cache_types['empty'] = document.getElementById(this.empty);
    }*/
    
    
}
__model_binding.prototype = new __prop_binding();

//nettoyage du binding
__model_binding.prototype._clean = function(root, child, index){
        if (root == null) root = this._element;
        if (child == undefined) child = root.firstChild;
        if (index == undefined) index = 0;
        
        
        
        if (child != null) {
                var type = child._ftw2_type;//le type de données stockées dans l'element
                //("type de donnée a recycler:"+type);
                //les clés générées par ce model
                var current_keys = this._generated_keys.splice(index,1)[0];
                
                var model_bindings = {}; //les bindings de cette vue
                
                //("clean model datas");
                //(current_keys);
                //TODO: supprime les cl�s de BINDINGS[PAGES_ID] cr�es precedement
                if(current_keys){
                        var current = null, cr = null, index = 0, test = null;
                        
                        for (var key in current_keys){
                                //(key);//clé type UUID:nom
                                //si tableau, probleme....
                                //supprime de la page
                                current = current_keys[key];
                                glob_binding = BINDINGS[key];
                                
                                /*if(!glob_binding) continue;*/
                                
                                var bi = current.length;
                                while(bi--){
                                //for (var bi=0;bi<current.length;bi++){
                                        cr = current[bi];
                                        //nettoie au besoin
                                        //("cleaning");
                                        cr._clean();
                                        //supprime  le context si existe
                                       
                                        if (cr.context) cr.context= null;
                                        if(glob_binding && key in glob_binding){
                                                index = glob_binding[key].indexOf(cr);

                                                test = glob_binding[key].splice(index,1)[0];
                                                if(glob_binding[key].length == 0) delete(glob_binding[key]);
                                        }

                                        //ajoute au model_bindings pour le recyclage
                                        var from = cr.from;
                                        if (!(from in model_bindings)) model_bindings[from]=[];
                                        model_bindings[from].push(cr);
                                }
                                

                        }
                }
            //sauvegarde dans le stack
            removeChildAndClearEvents(root, child);
            var template = MODELS[type];
            //("Enregistre un nouveau recycle pour le type:"+type);
            //(model_bindings);
            template.recycle.push( [child, model_bindings ])
        }

}

//gestion du cas value==null
__model_binding.prototype._process_fallback = function(){
    

        //si value = null, affiche et bind le fallback
        //check d'abord le data-type!!!
        //regarde si a un datatype=fallback
            var p_type =  this.presenter;
            var presenter_type = p_type+"_fallback";

                if (presenter_type in MODELS){
                        return this._populate_model(CONTEXT, p_type, "fallback", false);

                } 

                
                //si ici, pas de data-type=fallback, cherche le fallback normal?
                
        if (this.fallback) {
                
            //affiche le fallback
                //cree un nouveau model avec le fallback
                //binding du fallback: utilise le context global
                return this._populate_model(CONTEXT, this.fallback, "fallback", false);
            
        }
        
        //si ici, pas de fallback, pas de type, renvoie juste une infos simple?
        return document.createTextNode("");//tostring sur context
}



// AFFICHAGE OBJET SIMPLE
//affiche le contenu du model
//@param context: l'objet javascript qui servira de context de données
//@param mroot: element HTML root du presenter (par defaut, recupere this.presenter)
//@param type: string type de la donnée (par defaut: context.constructor.name)
//@param deep: si doit binder les données du context (par defaut iinfos.deep)
__model_binding.prototype._populate_model = function(context, mroot,type, deep){
       
       
        // UTILISER UN STACK DE RECYCLAGE =====================================> TODO
        //probleme, parfois, ne doit pas utiliser le converter...
        defineBindObject(context);
        //la convertion au besoin
        //context = this.convert_value (value, parent);
        var context = this.convert_value (context, mroot);
        
        var model =null
        var bindings = null;


        //probleme, si heritage, doit verifier TOUTE la chaine de prototype...
        var item_type = type || context.constructor.name || "defaut";
        var p_type = mroot || this.presenter;

        var frag =null;
        var current_keys = [];//les clés crées pour ce model
        var deep_binding = deep || this.deep || true;//pour savoir si rend accessible les données internes au binding

     
        var bindings = null;
        var model = null;
        var recycle = null;

        var proto = context;
        var item_type = "";
        
        this._ftw2_type = null;
        
        //verifie si existe dans le stack de recyclage...            =======================> TODO

        //recherche le model
        if (type=="fallback"){
                var md = MODELS[p_type+"_fallback"];
                if(md){bindings = md.bindings;
                model = md.template;
                recycle = md.recycle;
                this._ftw2_type = p_type+"_fallback";}
                /*bindings = MODELS[p_type+"_fallback"] ;
        	model = this._cache_types['fallback'];*/
        }
        else if(type=="empty"){
                /*bindings = MODELS[p_type+"_empty"] ;
        	model = this._cache_types['empty'];*/
                var md = MODELS[p_type+"_empty"];
                if(md){bindings = md.bindings;
                model = md.template;
                recycle = md.recycle;
                
                this._ftw2_type = p_type+"_empty";}
        }
        else{
                //test un type donné 
                if(context._data_type){
                        var presenter_type = p_type+"_" + context._data_type;
                        console.log(p_type,presenter_type,MODELS)
                        if (presenter_type in MODELS){
                                console.log("gottcha");
                                var item_type = context._data_type;
                                var md = MODELS[presenter_type];
                                if(md){
                                        bindings = md.bindings;
                                        model = md.template;
                                        recycle = md.recycle;
                                        
                                        this._ftw2_type = presenter_type;
                                        
                                }
                        }
                        //assume in  model for now...
                        else throw "Unknown data-type model: "+context._data_type;
                } 
                else {
                        var pppp = proto.constructor.name;
                        if(pppp=="Table") console.log("Search for type:",pppp,context,MODELS)
                        while (proto != null){

                                var presenter_type = p_type+"_" + proto.constructor.name;
                                if(pppp=="Table") console.log("Search for type:",presenter_type)
                                if (presenter_type in MODELS){

                                        var item_type = proto.constructor.name;
                                        /*bindings = MODELS[presenter_type] ;
                                        model = this._cache_types[item_type];//root_model.querySelector("[data-type='"+item_type+"']");*/
                                        var md = MODELS[presenter_type];
                                        if(pppp=="Table") console.log("affiche model",md)
                                        if(md){
                                                if(pppp=="Table") console.log("mise en place")
                                                bindings = md.bindings;
                                        model = md.template;
                                        recycle = md.recycle;
                                        
                                        this._ftw2_type = presenter_type;
                                        break;}
                                }
                                //sinon, suivant
                                proto = proto.__proto__;


                        }
                }
        }
            
        if (model == null){
                //celui par defaut
                item_type = "defaut";
                /*bindings = MODELS[p_type] ;
                
                model = this._cache_types['defaut'];*/
                var md = MODELS[p_type];
                if(md){
                bindings = md.bindings;
                model = md.template;
                recycle = md.recycle;
                this._ftw2_type = p_type;
                }
        }



        if (model == null ){

                //this._element[this.to] = " unknown model! "+context;//pas de model, ne fait rien
                console.log("NO MODEL FOR ",context)
                return;
        }

        
        //("populate model: item type: "+this._ftw2_type);
        // if (recycle.length > 0){
        //         //recupere la template et bindings associés
        //         //("Recuperation d'un template dans recycle!");
        //         var r = recycle.pop();
        //         frag = r[0];
        //         bindings = r[1];
        //         //(bindings);
        //         //enregistre les bindings
        //         for(var key in bindings){
        //                 //("clé:"+key);

        //                 var bd = [];
        //                 var h=bindings[key].length;
        //                 //("nbr de bindings: "+h);
        //                 while(h--){
        //                         var clone = bindings[key][h];
        //                         //(clone);
        //                         //copie les infos du binding
        //                         /*var infos = {};
        //                         var inf = bindings[key][h];
        //                         for(var k in inf){
        //                                 infos[k]=inf[k];
        //                         }

        //                         //autorise le process event
        //                         infos["process_event"] = true;
                                
        //                         infos._element = cpy_model;
        //                         if (infos.path)	infos._element = cpy_model.querySelector(infos.path);
                                
                                
        //                         var clone = __create_binding_from_infos(infos);//cree le binding, passe la valeur a binder pour determiner le type
        //                         //("deep:"+deep_binding);
        //                         //(context.__uuid__);*/
        //                         if (context.__uuid__){
        //                                 //gestion du 'alt' ------------------------------------------------
        //                                 var keys =  clone.getBindingKeys();
        //                                 var kk = keys.length;
        //                                 while(kk--){
        //                                 //enregistre les bindings
        //                                     var n_key = keys[kk];
                                            
        //                                     //si processinput, utilise UUID du contexte globale
        //                                     var g_key =context.__uuid__+":"+n_key;
        //                                     //("clé de binding: "+g_key);
        //                                     if ( deep_binding === true){
        //                                             if (g_key in BINDINGS){
        //                                                 //deja connu, ajoute simplement a la liste
        //                                                 BINDINGS[g_key].push(clone);
        //                                             }
        //                                             else {
        //                                                 //inconnu, cree une nouvelle entr�e
        //                                                 BINDINGS[g_key]= [clone] ;
        //                                             }
        //                                     }   
        //                                     //enregistre pour pouvoir nettoyer plus tard....
        //                                     if (g_key in current_keys){
        //                                         //deja connu, ajoute simplement a la liste

        //                                         current_keys[g_key].push(clone);
        //                                     }
        //                                     else {
        //                                         //inconnu, cree une nouvelle entr�e

        //                                         current_keys[g_key]= [clone] ;
        //                                     }


        //                                 }
        //                         }

        //                         //enregistre le binding
        //                         bd.push(clone);
        //                         //("notify recycle");
        //                         clone.init(context);

        //                 }

        //                 __notifyDatasetChanged(context,bd, key);
        //         }
        // }
        // else
        // {
                if(pppp=="Table") console.log("creation d'un nouveau model")
                //("Creation d'un nouveau model");
                var cpy_model = model.cloneNode(true);
                frag = cpy_model;
        
        
                //cree les bindings necessaires
        
                for(var key in bindings){
                        //("clé:"+key);

                        var bd = [];
                        var h=bindings[key].length;
                        //("nbr de bindings: "+h);
                        while(h--){
                                //copie les infos du binding
                                var infos = {};
                                var inf = bindings[key][h];
                                for(var k in inf){
                                        infos[k]=inf[k];
                                }

                                //autorise le process event
                                infos["process_event"] = true;
                                
                                infos._element = cpy_model;
                                if (infos.path)	infos._element = cpy_model.querySelector(infos.path);
                                
                                
                                var clone = __create_binding_from_infos(infos);//cree le binding, passe la valeur a binder pour determiner le type
                                //("deep:"+deep_binding);
                                //(context.__uuid__);
                                if (context.__uuid__){
                                        //gestion du 'alt' ------------------------------------------------
                                        var keys =  this.getBindingKeys(infos);
                                        var kk = keys.length;
                                        while(kk--){
                                        //enregistre les bindings
                                            var n_key = keys[kk];
                                            
                                            //si processinput, utilise UUID du contexte globale
                                            var g_key =context.__uuid__+":"+n_key;
                                            //("clé de binding: "+g_key);
                                            if ( deep_binding === true) {
                                                    if (g_key in BINDINGS){
                                                        //deja connu, ajoute simplement a la liste
                                                        BINDINGS[g_key].push(clone);
                                                    }
                                                    else {
                                                        //inconnu, cree une nouvelle entr�e
                                                        BINDINGS[g_key]= [clone] ;
                                                    }
                                            }
                                            //enregistre pour pouvoir nettoyer plus tard....
                                            if (g_key in current_keys){
                                                //deja connu, ajoute simplement a la liste

                                                current_keys[g_key].push(clone);
                                            }
                                            else {
                                                //inconnu, cree une nouvelle entr�e

                                                current_keys[g_key]= [clone] ;
                                            }


                                        }
                                }

                                //enregistre le binding
                                bd.push(clone);
                                clone.init(context);

                        }

                        __notifyDatasetChanged(context,bd, key);
                }

        //}
        //("nbr de clés de bindings global crées: ");
        //(current_keys);
        //doit ajouter a la fin du tableau...
        //probleme, si array, se retrouve avec pour chq items un array de bindings
        //modif, enregistre les keys en tant 
        frag._ftw2_type = this._ftw2_type;//le type de données pour cette vue
        this._generated_keys.push(current_keys);
        //probleme, pour un array, toutes les clés seront présentes, doit faire une selection...
        //this._generated_keys = current_keys;//enregistre les clés de bindings de ce model uniquement!
        return frag;
    }
    
    

__model_binding.prototype.populate_object = function(context, parent, extra, frag){
        /*var fragment = document.createDocumentFragment();
        var sibling = this._element.nextSibling;
        
        var parent = this._element.parentNode;
        
        
        var frag = this._element;
        
        
        fragment.appendChild(frag);
        defineBindObject(context);
        //la convertion au besoin
        value = this.convert_value (value, parent);*/
        
        
        this._clean(frag);

        //un objet DOIT tenter de binder l'objet
        if (context == null ){
                //modif, utilise le fallback comme data-type
                frag.appendChild(this._process_fallback());


        }
        else{
                //ajoute l'element d'un coup, pas besoin de fragment?
                frag.appendChild(this._populate_model(context));//le html generé
        }

		
        //replace l'element dans la page
        //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
}

  
//AFFICHAGE ARRAY

__model_binding.prototype.populate_array = function (value, context, extra, frag){

        //definie les actions par defaut (ie: pas d'extras)
        //recupere l'element et place le dans un fragment pour eviter les reflows
        /*var fragment = document.createDocumentFragment();
        var sibling = this._element.nextSibling;

        var parent = this._element.parentNode;
        var frag = this._element;


        fragment.appendChild(frag);//ajoute directement l'element au fragment...

        //si un textnode, supprime
        if (frag.firstChild && frag.firstChild.nodeType===3) removeChildAndClearEvents(frag,frag.firstChild);//frag.removeChild(frag.firstChild);
        */
        defineBindObject(context);
        //la convertion au besoin
        //value = this.convert_value (value, parent);

        if (value == null){
                this._empty = true; //marque empty
                
                //si a des childs, supprime les tous
                while (frag.firstChild) {
                        //frag.removeChild(frag.firstChild);
                        removeChildAndClearEvents(frag,frag.firstChild);
                }
            
            
                frag.appendChild(this.process_fallback());
                
            
                //replace l'element dans la page
                //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                return;
        }
        
        
        
        if (value.length == 0){
                  this._empty = true; //marque empty
                
                //si a des childs, supprime les tous
                while (frag.firstChild) {
                        //frag.removeChild(frag.firstChild);
                        removeChildAndClearEvents(frag,frag.firstChild);
                }
                if (this.empty ){                             
                    frag.appendChild(this._populate_model(CONTEXT, this.empty, "empty", false));
                }
                //replace l'element dans la page
                //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                return;
        }

        if (this._empty){
                //supprime la empty view
                while (frag.firstChild) {
                        //frag.removeChild(frag.firstChild);
                        removeChildAndClearEvents(frag,frag.firstChild);
                }
                this._empty = false;
                
        }
        
        //si un extra, modifie les actions...
        if (extra != null){
            
            //suivant l'action (set,push,...) agit au mieux...
            switch(extra.action){
                case 'SET':{
                    //modifie 1 seul element, ie: supprime et remet en place
                    var ci = extra.index;

                    //nettoie les elements html inutiles si besoin
                    //this._clean_child(frag.children[ci], frag);
                    this._clean(frag, frag.children[ci], ci);
                    var item = value[ci];
                    var result = this._populate_item(item);
                    //result.__uuid__ = item.__uuid__;//pour pouvoir le retrouver plus tard...

                    
                    var prec = ci == 0 ? frag.firstChild : frag.children[ci-1];
                    frag.insertBefore(result,prec);
                    //replace l'element dans la page
                    //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                    
                    return ;


                }
                case 'POP':{
                    //supprime le  dernier de la listes
                    //this._clean_child(frag.children[frag.children.length -1], frag);
                    this._clean(frag, frag.children[frag.children.length -1],frag.children.length -1);
                    //replace l'element dans la page
                    //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                    return;
                }
                case 'PUSH':{
                    //ajoute a la fin
                    var count = extra.value
                    //recupere les counts derniers elements
                    var  add_childs = [];
                    var first = value.length - count;
                    for (var c=value.length-1;c>= first; c--){add_childs.push(value[c]);}
                    for (var ci=0; ci<add_childs.length;ci++){
                            
                        var item = add_childs[ci];
                        var result = this._populate_item(item);
                        //result.__uuid__ = item.__uuid__;//pour pouvoir le retrouver plus tard...

                       frag.appendChild(result);
                    }
                    //replace l'element dans la page
                    //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                    return;
                }
                case 'SHIFT':{
                    //retire le premier element
                    //this._clean_child(frag.children[0],frag);
                    this._clean(frag, frag.children[0],0);
                     //replace l'element dans la page
                    //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                    return;
                }
                case 'UNSHIFT':{
                    //ajoute en debut de tableau
                    var count = extra.value
                    //recupere les counts derniers elements
                    var add_childs = [];
                    for (var c=count - 1 ;c>=0; c--){add_childs.push( value[c]);}
                    for (var ci=0; ci<add_childs.length;ci++){
                        //doit etre placé???
                        var item = add_childs[ci];
                        var result = this._populate_item(item);
                        //result.__uuid__ = item.__uuid__;//pour pouvoir le retrouver plus tard...

                        frag.insertBefore(result, frag.firstChild);
                    }
                    //replace l'element dans la page
                    //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                    return;
                }
                case 'SPLICE':{

                        console.log("SPLICE ARRAY")
                    //supprime ET ajoute
                    var index=extra.index;//probleme, si IE???
                    var howmany=extra.howmany;
                    var count = extra.count;
                    
                    
                    for (var ci=index;ci<index+howmany;ci++){
                            ////(frag.children[index]);
                            this._clean(frag, frag.children[index], ci);
                            //this._clean_child(frag.children[ci],frag);//par defaut, supprime tous les childs de la liste
                    }
                    

                    //si doit ajouter en position...
                    if (count != undefined && count >0){
                        var add_childs = [];
                        var prec = frag.children[index];
                        for (var c=count - 1 ;c>=0; c--){add_childs.push( value[index+c]);}
                        for (var ci=0; ci<add_childs.length;ci++){
                            var item = add_childs[ci];
                            var result = this._populate_item(item);
                            //result.__uuid__ = item.__uuid__;//pour pouvoir le retrouver plus tard...

                            frag.insertBefore(result, prec);
                            
                        }


                    }
                    //replace l'element dans la page
                    //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                    return;

                }
                default: break;
            }
        }



        //("remove all array!");
        
        var removeChilds = frag.children ;
        if (removeChilds==null){
                removeChilds = [];
                var childs = frag.childNodes;
                var end = childs.length;
                for (i= 0; i< end; i++){
                      if (childs[i].nodeType != 8 && (childs[i].nodeType != 3 || /\S/.test(childs[i].nodeValue))){
                              removeChilds.push( childs[i] );
                              
                      }
                }
        }
        //nettoie les elements html inutiles si besoin
        for(var ci=removeChilds.length-1;ci>=0;ci--){
            //this._clean_child(removeChilds[ci], frag);
            this._clean(frag, removeChilds[ci], ci);
        }

        //ajoute les nouveaux elements
        for (var ci=0; ci<value.length;ci++){
            var item = value[ci];
            var result = this._populate_item(item);
            frag.appendChild(result);
        }
        //affichage des groupes

        this._key_uuid_ = context.__uuid__+":"+this.from;
        //replace l'element dans la page
        //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}

};



__model_binding.prototype._populate_item = function(context, parent, extra){
    
        if (context == null ){
                //modif, utilise le fallback comme data-type
                console.log("null context")
                return this._process_fallback();
        }

        //ajoute l'element d'un coup, pas besoin de fragment?
        console.log("populate item",context);
        var child = this._populate_model(context);//le html generé

        this._key_uuid_ = context.__uuid__+":"+this.from;
        return child;

}


//MODIFICATION: determine au runtime si la data est un tableau (DBArray) ou un objet simple...

__model_binding.prototype.populate = function(value, parent, extra){
	//probleme, si array, doit faire ca  a chaque item....
        
        //defineBindObject(value);
        
        var fragment = document.createDocumentFragment();
        var sibling = this._element.nextSibling;

        var parent = this._element.parentNode;
        var frag = this._element;
        //si un textnode, supprime
        if (frag.firstChild && frag.firstChild.nodeType===3) frag.removeChild(frag.firstChild);

        //force le redraw aussi?
        fragment.appendChild(frag);//ajoute directement l'element au fragment...
        
        //probleme! si deep=false et array, n'est pas detecté!!!
        if (value && (value.__proto__ == DBArray || value instanceof Array) ) this.populate_array(value,parent,extra,frag);
        else this.populate_object(value,parent,extra,frag);
        
        //if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
        if (sibling){_dom_batch_.dom_batch_insertBefore(parent,frag,sibling);}else{_dom_batch_.dom_batch_append_child(parent,frag);}
        
        /*
        A REMETTRE DANS POPULATE_OBJET ET POPULATE_ARRAY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        value = this.convert_value (value, parent);
        
        //2: process fallback et empty
        
        //si un textnode, supprime
        if (frag.firstChild && frag.firstChild.nodeType===3) removeChildAndClearEvents(frag,frag.firstChild);//frag.removeChild(frag.firstChild);



        if (value == null){
                this._empty = true; //marque empty
                
                //si a des childs, supprime les tous
                while (frag.firstChild) {
                        //frag.removeChild(frag.firstChild);
                        removeChildAndClearEvents(frag,frag.firstChild);
                }
            
            
                if (this.fallback) {
                    //populate le model fallback
                    frag.appendChild(this._populate_model(CONTEXT, this.fallback, "fallback", false));
                }
            
                //replace l'element dans la page
                if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                return;
        }
        
        
        
        if (value.length == 0){
                  this._empty = true; //marque empty
                
                //si a des childs, supprime les tous
                while (frag.firstChild) {
                        //frag.removeChild(frag.firstChild);
                        removeChildAndClearEvents(frag,frag.firstChild);
                }
                if (this.empty ){                             
                    frag.appendChild(this._populate_model(CONTEXT, this.empty, "empty", false));
                }
                //replace l'element dans la page
                if (sibling){ parent.insertBefore(frag, sibling);}else{parent.appendChild(frag);}
                return;
        }

        if (this._empty){
                //supprime la empty view
                while (frag.firstChild) {
                        //frag.removeChild(frag.firstChild);
                        removeChildAndClearEvents(frag,frag.firstChild);
                }
                this._empty = false;
                
        }
        
        
        
        //3: affiche les données
        //si ici, value!=null
        
        
        //3: si DBArray, populate array, sinon, object
        
        
        
        if (value.__proto__ == DBArray) this.populate_array(value,parent,extra, frag);
        else this.populate_object(value, parent, extra, frag);
        
        */
        
}  
    
;//--require property_binding

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  command_binding.js:

*/
/*binding d'une commande*/
function __command_binding(infos){

    __prop_binding.call(this, infos);
    
    //NOTE: si crée un element a partir d'un model????
    /*if (this._element){
            proto = new CommandBindingElement();
            proto.__proto__ = this._element.__proto__;
            this._element.__proto__ = proto;
    }*/
    var bind = this;
    this.__process_event = function(evt){
        
        if (bind.context == null) return;
        
        
        //recupere le nom de la methode
        var value = bind.command;
        if(value == null) value = bind.fallback;
        value = bind.convert_value (value, bind.context);
        var params = null;
        //appel a la methode, passe les données
        if (bind.command_params!=null){
            params=[];


            for (cpi=0;cpi<bind.command_params.length;cpi++){
                if (bind.command_params[cpi][0]=="$"){
                    //recupere le nom de la prop
                    var prop = bind.command_params[cpi].substr(1);
                    if(prop == "this") params.push(bind.context);//le context lui meme
                    else if (prop in bind.context) params.push(bind.context[prop]);//par valeur
                    else params.push('null');
                }
                else params.push(bind.command_params[cpi]);
            }

        }
        
        
        CONTEXT[value](evt,params);
    }
    
    
    infos.from = this.from = "COMMANDS";

    this.context = null;
    this.command = infos.command; 	//la methode du context de données global a executer
    this._cmd_parameters = null;    //des parametres pour la methode
	
    this.command_params =  infos.command_params;

}
//le prototype...
var cb_pr = {
        get command_params(){return this._cmd_parameters;},
        set command_params(value){
                if (value==null) this._cmd_parameters = null;
                //split la chaine en un tableau de parametres
                else if (value[0]=='[' && value[value.length-1]==']'){
                        //un tableau de parametres
                        value = value.substring(1, value.length-2);
                        this._cmd_parameters = [];
                        var cmds = value.split(',');
                        var cmd_length = cmds.length;
                        
                        for (var p=0;p<cmd_length;p++){
                            this._cmd_parameters.push(cmds[p]);
                        }
                }

                else {
                        this._cmd_parameters = [value];
                }
        }
};
cb_pr.__proto__ = new __prop_binding(  );
__command_binding.prototype =cb_pr;


//initialise la commande
	//@param ctx: le context de donnée
__command_binding.prototype.init = function(ctx){
        
        this.context=ctx;
        if (this.command != null && this.to!=null){
                

            this._element.addEventListener(this.to,this.__process_event, true);
            //addCommandListener(this._element, this.to,this.__process_event);
            //this._element._cmd_binding = this;                                                                                  // memory leaks?????? TODO
        }
};
__command_binding.prototype.populate = function (value, context, extra){
        //this.init(context);
};
__command_binding.prototype._clean = function(){
        //supprime le listener
        this._element.removeEventListener(this.to,this.__process_event );
        this.context = null;
}
    
    
    ;//--require property_binding

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  input_binding.js: j'ai un gros probleme de closure ici...

*/

  
/*binding d'un element de formulaire (input?)*/
function __input_binding(infos){
	__prop_binding.call(this, infos);
        //un input, doit modifier le prototype
        /*if (this._element){
                proto = new InputBindingElement();
                proto.__proto__ = this._element.__proto__;
                this._element.__proto__ = proto;
        }*/
        var bind = this;
        this.on_process_event = function(evt){

                //var bind = this._input_binding;
                if( bind.context == null) return;
                
                
		var value = bind.return_value === true ? this.value : this[bind.to];
                if(value == null || value == undefined || value=="") {
                    this.placeholder = bind.fallback;
                    
                }
                
                
		try{
                        
			bind.mirror(value);//appel a methode mirror de l'event, ie evite le notify
			this.setCustomValidity("");
                        
		}catch(err){
			
			this.setCustomValidity(err.message);
                        
                        //si a un formulaire, utilise la validation pour afficher les popups
                        if (this.form){
                                if(this.form.reportValidity){
                                        window.setTimeout(function(){
                                                //PROBLEME DE CLOSURE ICI: bind
                                                bind._element.form.reportValidity();//doit empecher le submit normalement et afficher les messages d'erreurs...
                                                //remet la valeur par defaut, voir si c'est le comportement le plus normal
                                                var value = bind.convert_value (bind.context[bind.from], bind.context);
                                                if(value === null || value === undefined || value==="") {
                                                    //bind._element.placeholder = this.fallback;
                                                    _dom_batch_.dom_batch_set_property(bind._element,"placeholder",bind.fallback);
                                                    return;
                                                }
                                                //met a jour l'UI
                                                //bind._element[bind.to] = value;
                                                _dom_batch_.dom_batch_set_property(bind._element, bind.to, value);
                                                                
                                                //supprime le message d'erreur, probleme, doit attendre un peu...
                                                //une autre closure inutile?
                                                window.setTimeout(function(){
                                                                bind._element.setCustomValidity("");
                                                        },2000);
                                        });
                                }
                                else {
                                        //recupere le bouton submit si existe...
                                        form = bind._element.form;
                                        
                                        for (i=form.length-1;i>=0;i--){
                                                var input = form[i];
                                                if (input.getAttribute("type")=="submit") {
                                                        window.setTimeout(function(){
                                                                input.click();
                                                                
                                                                 //remet la valeur????
                                                                value = bind.convert_value (bind.context[bind.from], bind.context);
                                                                if(value === null || value === undefined || value==="") {
                                                                    _dom_batch_.dom_batch_set_property(bind._element,"placeholder",bind.fallback);
                                                                    _dom_batch_.dom_batch_set_property(bind._element,"value","");
                                                                    return;
                                                                }
                                                                //met a jour l'UI
                                                                //bind._element[bind.to] = value;
                                                                _dom_batch_.dom_batch_set_property(bind._element,bind.to,value);
                                                                
                                                                //remet le custom validity a null?
                                                                //supprime le message d'erreur, probleme, doit attendre un peu...
                                                                window.setTimeout(function(){
                                                                        bind._element.setCustomValidity("");
                                                                        //("Remise a zero de la custom validity...");
                                                                },2000);//laisse le message 1sec
                                                                
                                                        }, 20);
                                                        return;
                                                }
                                        }
                                       
                                }
                                
                        }
		}
};
        
        
        
	this._pass = false;					//pour firefox mobile!
        this.return_value = infos.return_value;                 //force a retourner la propriete "value" de l'input
        
        
       	this._event =infos.event == null ? 'change' : infos.event;//qd envoyer les infos de changement
	//par defaut, sur le lost focus/enter ?
	
        //dans le cas ou le binding se trouve dans la page directement, lie le context global
        if (infos.process_event){
                //forcement le context global
                this.init(CONTEXT);
        }
}




__input_binding.prototype=new __prop_binding( );

__input_binding.prototype.init = function(context){
                this._element.addEventListener(this._event, this.on_process_event);
                //addCommandListener(this._element, this._event, this.on_process_event);
                this.context = context;//enregistre le context de donn�es pour plus tard....
		//penser a nettoyer ca plus tard...
                //this._element._input_binding = this;//il faudrait eviter de stocker des infos dans les elements ==========> TODO
        }
__input_binding.prototype._clean = function(){
        
        this._element.removeEventListener(this._event,this.on_process_event );
        this.context=null;
}

//met a jour la donnée javascript
//@param value: la valeur entrée par l'utilisateur
__input_binding.prototype.mirror = function(value){
		this._pass = true;
		ctx = this.context == null ? CONTEXT : this.context;
                ctx[this.from] = value;
		this._pass=false;
    }
 
        
        
__input_binding.prototype.populate = function(value, context, extra){
                
                //doit mettre en place les events
		if(this._pass){ //firefox mobile! si change la value programmatiquement, lance qd meme l'event change/input
                
			return;
		}

                //une property de l'element, modifie directement et completement
		value = this.convert_value (value, context);
                if(value === null || value === undefined || value==="") {
                    _dom_batch_.dom_batch_set_property(this._element, "placeholder", this.fallback);
                    //this._element.placeholder = this.fallback;
                    if (this.to == "value") _dom_batch_.dom_batch_set_property(this._element, "value", "");//this._element.value="";//laisse le placeholder
                    else    _dom_batch_.dom_batch_set_property(this._element, this.to, this.fallback);//this._element[this.to]=this.fallback;
                    return;
                }
		//met a jour l'UI
		//this._element[this.to] = value;
                _dom_batch_.dom_batch_set_property(this._element, this.to, value);
    }

;//--require model_binding

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  webservice_binding.js: revoir un peu tout ca...

*/


var __webservice_param_regex = new RegExp(/([\w_-]+)=(\??\$\w[\w_\d]+)/g);
function __webservice_parameter(name,value){
        //suivant le cas....
        this.name = name;
        this.value = value;//le nom de la propriete
        this.important = true;//par defaut, doit etre valide
        
        if (value.startsWith("$")) this.value = value.substr(1);
        else {
                this.value = value.substr(2);
                this.important = false;
        }
}
__webservice_parameter.prototype.getParameter = function(context){
        value = context[this.value];
        if (value == null){
                if( this.important) throw Error();
                else return this.name+"=";
        }
        
        return this.name+"="+encodeURI(value);
}
__webservice_parameter.prototype.toString = function(){return this.value;}//renvoie le  nom du parametre de binding



function __webservice_url (url){
        //recupere les infos a partir de l'URL:
        //la cibe, les parametres
        this._url =  url;
        
        this._params = [];//liste des parametres pour l'url (binding)
        this._param_str = "";//les parametres autres de l'url (sans binding)
        
        //recupere la premiere position du ? pour les parametres
        var params_pos = url.indexOf("?");
        if(params_pos != -1){
                //recupere le corps de l'URL
                this._url = url.substr(0,params_pos);
                param_str = url.substr(params_pos+1);//unqiement les parametres...
                match = __webservice_param_regex.exec(param_str);
                if (match){
                        params = [];
                        pi = 0;
                        while (match){
                                //recupere le nom du parametre et sa valeur: nom de la propriété
                                str = match[0];
                                name = match[1];
                                value = match[2];
                                this._params.push(new __webservice_parameter(name, value));
                                
                                //??? doit supprimer aussi les & de la requete
                                param_str = param_str.replace(str,"{"+pi+"}");
                                pi++;
                                //supprime de la chaine de parametres
                                
                                __webservice_param_regex.lastIndex = 0;//remet a zero pour leprochain coup
                                match = __webservice_param_regex.exec(param_str);
                        }
                        
                        
                        this._param_str = param_str;
                        
                    }
        }           

}
__webservice_url.prototype.getURL = function(context){
        //cree l'url avec les données du context
        //ajouter les & entre parametres?
        try{
                url = this._url;
                //ajoute les parametres
                if (this._param_str.length>0){
                        url+="?";
                        str = this._param_str;
                        for (upi=0;upi<this._params.length;upi++){
                                v = this._params[upi].getParameter(context);
                                str = str.replace("{"+upi+"}",v);
                        }
                        
                        url+= str;
                
                }
                return url;
        } catch(Error){  return null;}
};
__webservice_url.prototype.getParametersNames = function(){
        //renvoie la liste des parametres sous forme de string csv
        return this._params.join(",");
}


//Recuperation des datas depuis un service web (renvoyant du JSON)
//Les erreurs: timeout et loaderror
//l'objet AJAX lui meme 
var xhr_timeout = 4000;//4 secondes avant annulation de la requete XHR

//data-type: le webservice est en train de charger....
function WEBSERVICE_LOADING (msg){ this.message = msg;}
//oups.
function WEBSERVICE_ERROR (err){
        this.message=""+err;
}
//trop long
function WEBSERVICE_TIMEOUT (err){
        this.message = ""+err;
}


function __load_async_datas ( url, context, prop, key){
          var xhr = new XMLHttpRequest();
          context[prop] = new WEBSERVICE_LOADING();
          context.notifyDatasetChanged(key,1);
                      
                      
          xhr.onload = function(e){
            if(xhr.status !== 200) {
                      //erreur serveur, voir a permettre de la renvoyer???
                      context[prop] = new WEBSERVICE_ERROR(xhr.responseText);
                      context.notifyDatasetChanged(key,1);
                      return;
                }
            
            datas = xhr.response;
            
            if (datas == null){
                    context[prop] = null ;
                    context.notifyDatasetChanged(key,1);
                    return;
            }
            
            //recupere le content type de la requete, si json, recupere l'objet directement
            //MAIS si renseigne un reader aussi, decider quoi faire
            type = xhr.getResponseHeader("content-type");
            if (type.startsWith("application/json")){
                    //parse le contenu JSON
                    try{                                
                                datas = JSON.parse(datas);
                        } catch(Error){
                                datas  = new WEBSERVICE_ERROR("Erreur lors du parse JSON");
                        }
                        
            } else if(this.reader){
                    datas = window[this.reader](datas);
            } 
           //sinon, assume simple string?
           context[prop] = datas ;
           context.notifyDatasetChanged(key,1);
                    
          };
        
            xhr.onerror = function(err){
                    //("une erreur");
                    //(err);
                context[prop] = new WEBSERVICE_ERROR(err);
                context.notifyDatasetChanged(key,1);
            };
        
          
        xhr.timeout = xhr_timeout;
        xhr.ontimeout = function(err){
                context[prop] = new WEBSERVICE_TIMEOUT(err);
                context.notifyDatasetChanged(key,1);
        };
            
          

          xhr.open('GET', url);
          xhr.send();
}




function __webservice_model_binding (infos){
        
        __model_binding.call(this,infos);
        this.reader =  infos.reader;
        if (this.from.startsWith("http://")==true || this.from.startsWith("https://")==true){
            
            this._url = new __webservice_url(this.from);//recupere les infos de l'URL
            this.from = infos.as || generateUUID();//le nom de la propriete: as: si a besoin de la recuperer dans le code
            this._prop_name = "_"+this.from;
            
            
            //ajoute les parametres au alt pour etre prevenu d'un changement
            var params = this._url.getParametersNames();
            if(params){
                if (this.alt == undefined){
                        this.alt = params;
                } else {
                       this.alt += ","+params;
                }
            }
   
            
    } 
}
__webservice_model_binding.prototype = new __model_binding();
__webservice_model_binding.prototype.init = function(context){
        if (this._url != undefined){
                if (context[this._prop_name]==undefined){
                        //cree la prop et le setter
                        context[this._prop_name] = null;
                        var prop_name = this._prop_name;
                        
                        Object.defineProperty(context,this.from,{
                           get: function(){
                                   
                                   return this[prop_name];}
                        });
                }
                
        }
}
__webservice_model_binding.prototype.populate = function(value, context, extra){
        //ici, populate relance la requete ajax
        if (extra){
                //populate normal
                __model_binding.prototype.populate.call(this, value, context);
                
        } else {
                //chargement des données
                url = this._url.getURL(context);
                if (url) __load_async_datas (url, context, this._prop_name, this.from);
        }
}
    
    ;//--require ftw2 --namespace utilities

/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  utils.js: 
        quelques méthodes utilitaires pour le framework, a defaut de les placer ailleurs
        
*/

//pour stocker la date crée lors de  la generation d'un UUID
//je me demande si on peut faire autrement qu'un global comme ca...
//@private
var __uuid_date = null;


//Genere un UUID unique pour chaque objet qui doit etre lier
//@return string: l'UUID généré
//@public
function generateUUID() {
    __uuid_date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, __replace_uuid);
};

//une methode interne pour la generation
//appellé pour chaque charactere de l'UUID
//@param c: le charactere a etudier
//@return le charactere généré
//@private
function __replace_uuid(c){
        var d = __uuid_date;
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
}


//Recupere le path vers l'element visé
//@param elem: l'element html visé
//@param root: l'element root a partir duquel chercher (racine si null)
//@return path: le chemin d'acces a l'element, style CSS selector
//@public
function getDomPath(elem, root) {

	//si root = null, a partir de la racine
	var el = elem;
	if (!el) {
		return;
	}


        var stack = [];

        while (el != root && el.parentNode != null) {
            //si a un id, utilise le

            if ( el.hasAttribute('id') && el.id != '' ) {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else {
                    
		var sibCount = 0;//nbr de siblings (de meme nom de tag)
		var sibIndex = 0;//index de l'element parmis les siblings
		var nodeName = el.nodeName;
                var length = el.parentNode.childNodes.length;
                var childs = el.parentNode.childNodes;
                
		for ( var i = 0; i < length; i++ ) {
		  var sib = childs[i];
		  if ( sib.nodeName == nodeName ) {
			if ( sib === el ) {
			  sibIndex = sibCount;
			  break;
			}
			sibCount++;
		  }
		}


		if ( sibIndex >0 ) {
		  stack.unshift(nodeName + ':nth-of-type(' + (sibIndex+1) + ')');
		} else {
		  stack.unshift(nodeName);
		}

        }
	el = el.parentNode;

  }
  
  return stack.join(' > ');
}


//une méthode converter pour les radios values (pour un input binding)
//@param value: la valeur actuelle du binding
//@param params: la valeur aquelle comparer le value
//@return true si value==params sinon false, null si value==null (pour les fallbacks)
//@public global
function check_radio_value(value, params){
        return value ? value == params : null;
}
//converter: verifie si une valeur est true/false
//@param value: la valeur a veriier
//@param params: un tableau de 2 valeurs possibles si false=>0, true=>1 
//@return true/false ou params[0] si false, params[1] si true
function is_true (value, params){
      var res = value ;//== true;
      if (params && params.length >= 2) {
              res = res? params[1] : params[0];
      }
      return res;
}


function ftw2_getLocale(){
         if (navigator.languages != undefined) return navigator.languages[0]; 
         else return navigator.language;
}
//localize un nombre pour affichage
//@params value: le nombre a localizer
//@params params: parametres optionels
//      1: locale: une chaine decrivant la langue a utiliser (defaut: navigator.languages[0])
//      0: after_dot_count: le nombre de chiffres apres la virgule (defaut: 2)
//@return string: le nombre localisé
function localize_number (value, params){
  //remplace le point par une virgule
  if (value == null) return "";
  after = 2;
  locale = ftw2_getLocale();
  if(params){
        after = params[0] || 2;
        locale = params[1] || locale;
  }
  
  return  value.toLocaleString("fr-FR",{maximumFractionDigits:after, minimumFractionDigits:after});

}
//helper methode, retire les '' d'une propriete
//@temp en attendant de faire mieux pour la regex
//@param value: la string a deshabiller
//@return: la string sans les quotes
//@public
function __unstringify(value){
        
    if (value!=null && value[0]=="'" && value[value.length-1]=="'"){
        //un tableau de parametres
        value = value.substring(1, value.length-1);
    }
    return value;
}




//ajoute un listener pour un event
//@param elem: l'element html qui va recevoir l'ecouteur
//@param a: l'event a ecouter
//@param b: la fonction a appeller lors de l'event
/*
function addCommandListener(elem,a,b){
        elem.addEventListener(a,b);//event, function

        //supprimer ca....                      ==============================================> TODO
	/*if(!elem.eventListenerList) elem.eventListenerList = {};
	if(!elem.eventListenerList[a]) elem.eventListenerList[a] = [];
	elem.eventListenerList[a].push(b);*
}*/

//Supprime un node enfant d'un element html, en profite pour
//supprimer les listeners d'events
//@param elem: l'element parent
//@param child: l'element a supprimer
function removeChildAndClearEvents(elem, child){
        elem.removeChild(child);
	//clear_events(child);
}

//supprime les ecouteurs d'events des elements html
//@DEPRECATED
//@param child: l'element a qui supprimer les ecouteurs (lui et ses enfants)
function clear_events (child){
    //uniqument pour lui ou aussi pour les inners????
	if(child.eventListenerList){
                var events = null;
                var j=0;
		for (key in child.eventListenerList){
				events = child.eventListenerList[key];
                                j = events.length;
                                while (j--){
					child.removeEventListener(key,events[j] );
                                        
                                        if(child._input_binding)child._input_binding=null;
                                        if(child._cmd_binding)child._cmd_binding=null;
				}
			}
	}
	if(child.children){
		//parcours les elements pour virer les events
                var elem = null;
                var ci = child.children.length;
                while(ci--){
			elem = child.children[ci];
			clear_events(elem);
		}

	}
}
   
   

;//permet de faire un pool de modifications a apporter au DOM
// en utilisant un requestAnimationFrame (pour controler qd cela se produit et 
//combien de temps on lui laisse pour le faire
//inspiration: fastdom par Wilson Page <wilsonpage@me.com> et Kornel Lesinski <kornel.lesinski@ft.com>


//une commande pour le dom batch, permet de savoir quoi faire (append, insert, modifie un attribut....)
//liste chain�e (doublement?)
function dom_batch_command (arguments){
        this._next = null; //pour ma chaine, permet de connaitre le suivant sur la liste        
        this._params = arguments;//les parametres, depend de l'action, un simple tableau avec:
        //0: l'action a realiser (append,...)
        //1...n: les parametres necessaires
}
var BATCH_RECYCLE = [];
function batch_optain(){
        var tmp = null;
        if (BATCH_RECYCLE.length>0){
                tmp = BATCH_RECYCLE.pop();
                tmp._params = arguments;
        }
        else tmp = new dom_batch_command(arguments);
        return tmp;               
}
function batch_recycle(b){ 
        b._next = null;
        b._params = null;
        BATCH_RECYCLE.push(b); 
}
//qqs actions basiques
var BATCH_APPEND = 0;//params: parent, child
var BATCH_REMOVE = 1;//params: parent, child
var BATCH_INSERT_BEFORE = 2;//params: parent, child, reference
var BATCH_SET_ATTRIBUTE = 3;//params: node, attribute name, attribute value
var BATCH_SET_PROPERTY = 4;//params: node, propery name, property value
//...



function dom_batch ( ){
        this.dom_batch_budget = 10; //le temps en millisecondes pour effectuer une mise a jour du dom
                //si il reste des updates, on le fera dans une prochaine frame...
        this.raf_called = false;
        
        //@debug
        this.infos = function(){
                return "INFOS: called:"+this.raf_called;
        }
        
        //pour le timer
        this.performance = window.performance || {};
        this.performance.now = performance.now       ||
                performance.mozNow    ||
                performance.msNow     ||
                performance.oNow      ||
                performance.webkitNow ||            
                Date.now  ;/*none found - fallback to browser default */

        //les buffers pour suppression d'un element, ajout d'une element
        /*this.dom_batch_suppress = [];
        this.dom_batch_append = [];
        this.dom_batch_inserts = [];*/
        this._commands = null;
        this._last = null;//pour ajouter facilement les commandes

        this.append_command = function (cmd){
                if (this._last!=null) {
                        this._last._next = cmd;
                } else {
                        this._commands = cmd;
                }
                this._last = cmd;
                
        }
        //les methodes a appeller en place de appendChild et removeChild
        //ajoute a la queue et demande la mise a jour dans prochaine frame
        this.dom_batch_removeChild = function(parent, child){
                
                //cree une nouvelle commande
                var cmd = batch_optain(BATCH_REMOVE,parent, child);
                //ajoute a la liste
                this.append_command(cmd);
                this.update_dom();//demande la mise a jour si possible
        }
        this.dom_batch_append_child = function(parent, child){
                var cmd =batch_optain(BATCH_APPEND,parent, child);
                this.append_command(cmd);
                this.update_dom();//demande la mise a jour si possible
        }
        this.dom_batch_insertBefore = function(parent, child, before){
                var cmd = batch_optain(BATCH_INSERT_BEFORE,parent, child, before);
                this.append_command(cmd);
                this.update_dom();//demande la mise a jour si possible
        }
        this.dom_batch_set_attribute = function(node, attr_name, attr_value){
                var cmd = batch_optain(BATCH_SET_ATTRIBUTE,node, attr_name, attr_value);
                this.append_command(cmd);
                this.update_dom();//demande la mise a jour si possible
        }
        this.dom_batch_set_property = function(node, p_name, p_value){
                var cmd = batch_optain(BATCH_SET_PROPERTY,node, p_name, p_value);
                this.append_command(cmd);
                this.update_dom();//demande la mise a jour si possible
        }
        
        
        this.update_dom=function(force){
                if (!this.raf_called || force){
                        this.raf_called = true;
                        r_a_f(dom_batch_update_dom);
                }
        }
        
};
r_a_f =  window.requestAnimationFrame //normal
          || win.webkitRequestAnimationFrame  //webkit
          || win.mozRequestAnimationFrame //firefox old
          || function(callback) { return setTimeout(callback, 16); }; //16ms = 60fps, le budget conseill� pour une webapp, si requestAF non dispo
//la m�thode de mise a jour du dom
function dom_batch_update_dom (delay){
                
                var batch = _dom_batch_;
                var cmds = batch._commands;
                if (!cmds) return;
                
                
                var start = batch.performance.now();//le debut de l'update en ms
                var last = batch.dom_batch_budget;
                
                //supprime d'abords
                while (last>0 && cmds!=null){
                        var task = cmds._params;
                        var tmp = cmds;
                        cmds = cmds._next;
                        
                        batch_recycle(tmp);
                        
                        var action = task[0];
                        //suivant l'action, possible d'eviter le switch en ayant le nom de la fonction?
                        switch(action){
                                case 0:
                                {
                                        //append
                                        task[1].appendChild(task[2]);
                                        break;
                                }
                                case 1:
                                {
                                        task[1].removeChild(task[2]);
                                        break;
                                }
                                case 2:
                                {
                                        task[1].insertBefore(task[2],task[3]);
                                        break;
                                }
                                case 3:
                                {
                                        task[1].setAttribute(task[2], task[3]);
                                        break;
                                }
                                case 4:
                                {
                                        task[1][task[2]]=task[3];
                                        break;
                                }
                                default: break;
                        }
                        last -= _dom_batch_.performance.now() - start;
                }
                
                batch._commands = cmds;
                //si il en reste, prochaine frame
                if (cmds!=null) _dom_batch_.update_dom(true);//demande la mise a jour
                //sinon, fini!
                else {
                        //console.log(_dom_batch_.infos());
                        batch._last = null;
                        batch._commands = null;
                        _dom_batch_.raf_called=false;
                }
                
}
var _dom_batch_ = new dom_batch();
;/*
  ----------------------------------------------------------------------------
  "THE BEER-WARE LICENSE" (Revision 42):
  <steph.ponteins@gmail.com> wrote this file. As long as you retain this notice you
  can do whatever you want with this stuff. If we meet some day, and you think
  this stuff is worth it, you can buy me a beer in return.
  ----------------------------------------------------------------------------


  Fear the walking web - Flesh & Bones - 0.3 - rewrite!

  
  

*/


var CONTEXT = null;     //data context de l'application/page web
var BINDINGS = [];      //dictionnaire associant clé de binding a liste d'elements a prevenir
var MODELS = {};	//des binding models a ajouter/supprimer des pages

   
   
   
   
   
/*permet de mettre a jour l'ui lorsqque les datas ont chang�es
@param key: le nom de la property qui a chang�e ou null pour mettre a jour toute la page
@args: parametres optinnels ou particulier a un type de binding*/
//TODO: eviter de faire des reflows pour chaque modification
//IE: si une clé de binding a plusieurs binding associé, bash = documentfragment????
//2: Bash complet si key == null
function notifyDatasetChanged(key, extra){

        //contexte a prendre en compte////
        if (key==null || key==''){
                //en général, ce cas n'arrive qu'a l'initialisation de la page
                var name = null, bds = null, b= null;
               
                for(key in BINDINGS){
                    name = key.split(':')[1];//nom de la property
                    bds = [];
                    for (i=0;i<BINDINGS[key].length;i++){
                        b = BINDINGS[key][i];
                        if(b.from == 'COMMANDS' || b.from == name) bds.push(b);//doit reagir
                    }
                    __notifyDatasetChanged(CONTEXT, bds, key);
        }

    }
    else {
        CONTEXT.process_update = true;
        if (key in BINDINGS) {
                        __notifyDatasetChanged(CONTEXT,BINDINGS[key], key, extra);
        }
        CONTEXT.process_update = false;

    }
}
//@ITERNAL: met a jour les bindings
//@param context: le context de données courant
//@param bindings: liste de binding a mettre a jour
//@param key: clé de binding
//@param extra: parametres optionnels
//@private
function __notifyDatasetChanged(context,bindings, key, extra){
       
        var value = 0, binding = null, v_key = null;
        for (var k in bindings) {
                value = null;
                binding = bindings[k];
               
                if(key=='$this' || binding.from == '$this') value = context;//a voir....
                else{
                        
                        v_key = binding.from; 
                        if(context!= null && v_key in context){
                                value = context[v_key];                
                                
                        }
                }
                binding.populate(value, context, extra);

    }
}






// GESTION BINDINGS DE DONNEES -------------------------------------------------------------------------------------------------------
var __verif_regex__ = new RegExp(/[^\{]*(\{binding[^\}]+\})/g);//verifie si correspond a un binding
//var __regex__ = new RegExp(/(?:\s+([\w_\-]+):((?:\$\w[\w_\d]+)|(?:'[^']+')|(?:\[[\$']?[\$'\w\s,\._;%\-]+(?:,[\$']?[\$'\w\s,\._;%\-]+)*\])|(?:[^\s\}]+)))/g);//recupere les infos
/*explications:
        (?:\$\w[\w_\d]+) : une propriété du context ($ma_vvar)
        (?:'[^']+') : une string ('bonjour! Comment ça va?'): verifier les escaped quotes
        (?:[^\s\}]+): une string simple: from:qqchose
        (?:'[^']+')|(?:\[[\$']?[\$'\w\s,\._;%\-]+(?:,[\$']?[\$'\w\s,\._;%\-]+)*\]) : un tableau de valeurs: ['une phrase',truc,2,$machin]

*/
var __regex__ = new RegExp(/(?:\s+([\w_\-]+):((?:https?:\/\/[^ ]+)|(?:(?:ftw2:)?\w[\w_\d]+)|(?:\$\w[\w_\d]+)|(?:'[^']+')|(?:\[[\$']?[\$'\w\s,\._;%\-]+(?:,[\$']?[\$'\w\s,\._;%\-]+)*\])|(?:[^\s\}]+)))/g);//recupere les infos

//TODO: finir la partie du tableau


//recupere les informations de bindings de la page
//@param root: elment dans lequel chercher les bindings
//@param process_event: indique si doit creer les bindings ou juste recuperer les infos
function __get_bindings(root, process_event, search){

    var evaluate = search || ".//*[contains(text(),'{binding ') or @*[contains(.,'{binding ')]]";
    
        //probleme! dois recuperer les bindings sur le root aussi!
        var binders = document.evaluate(evaluate,
            root,
            null,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null);
        
        
        var elem = binders.iterateNext();
        var pg_bindings = [] , bindings = null;

        //recupere les elements de la page demandant un binding de données
        while (elem != null){
                //parse tous les attributs pour trouver ceux bindés
                bindings = __get_binding_from_attributes(elem, root, process_event);
                
                
                if (bindings==null || bindings.length == 0){
                                elem = binders.iterateNext();
                                continue;
                }
                
                __prepare_binding(bindings, process_event, pg_bindings);
                elem = binders.iterateNext();

        }
            
        //test aussi pour le root
        bindings = __get_binding_from_attributes(root, root, process_event);
        if (bindings!=null && bindings.length > 0)__prepare_binding(bindings, process_event, pg_bindings);
                

    //un tableau avec tous les bindings du model
    return pg_bindings;
}

// permet juste d'eviter de l'ecrire 2 fois pour les inner elements et le root
//surement possible en maitrisant mieux le xpath que moi....
function __prepare_binding(bindings, process_event, pg_bindings ){
        
        var j=bindings.length, k=null, keys=null;
        while(j--){
                binding = bindings[j];

                k = binding.from==null ? binding.command : binding.from ;
            

                if (k == null)  continue;
                
                if (process_event){
                //traite aussi les alt
                keys = binding.getBindingKeys();

                        //pour chaque clé de bindings....
                        var kk=keys.length;
                        while(kk--){
                                var key = keys[kk];
                                //si processinput, utilise UUID du contexte globale
                                key = CONTEXT.__uuid__+":"+key;
                                if (key in pg_bindings){
                                        //deja connu, ajoute simplement a la liste
                                        pg_bindings[key].push(binding);
                                }
                                else {
                                        //inconnu, cree une nouvelle entr�e
                                        pg_bindings[key]= [binding] ;
                                }
                        }
                } else {
                        //enregistre simplement

                        if (k in pg_bindings){
                            //deja connu, ajoute simplement a la liste
                            pg_bindings[k].push(binding);
                        }
                        else {
                            //inconnu, cree une nouvelle entr�e
                            pg_bindings[k]= [binding] ;
                        }
                }
        }


                
}

//parse le contenu de la commande binding pour savoir quoi en faire
//TODO finir le parsing des commandes
//INTERNAL
//@param elem: l'element a etudier
//@param root: le root de l'elment
//@param process_event: si doit creer u pas le binding
function __get_binding_from_attributes(elem,root, process_event){
        var bindings = [];    
        var attrs = elem.attributes;
        var ij = attrs.length;
        
        while(ij--){
        
                attr = elem.attributes[ij];
                var bind = __parse_attribute (elem, root, attr.nodeName,attr.value, process_event );

                if(bind != null )bindings.push(bind);

        }

    
        var nodes = elem.childNodes;
        var result = "";
        for(var i = 0; i < nodes.length; i++) {
                if(nodes[i].nodeType == 3) {       // If it is a text node,
                        // MIEUX VAUT MINIFIER LE HTML AUSSI!
                        result += nodes[i].textContent;
                }
        }
        result.trim();
        if(result != ""){            
                var bind = __parse_attribute (elem, root, 'innerHTML', result, process_event );
                if(bind != null )bindings.push(bind);
        }



        return bindings;
}

//parse un attribut d'un element html et renvois les infos de bindings si en trouve
//INTERNAL
//@param elem: l'element etudié
//@param root: le root de l'element
//@param nodeName: le nom de l'attribut a etudier
//@param value: la valeur de l'attribut
//@param process_infos: si doit creer ou non le binding
//@return infos: informations de bindings ou le binding lui meme
function __parse_attribute(elem, root, nodeName, value, process_event){
        var cmds = value;
        if (cmds == null || cmds == '') return null;
        
        //verifie qu'il y a une chance d'avoir un binding dans cet attribut/valeur
        var match = __verif_regex__.exec(cmds);
        
        if (match == null) return null;//pas de correspondance pour le premier        //prends en compte plusieurs matches (par exemple pour les classes,????
        
                cmds = match[1];//unqiuement les infos de bindings
                //cree le binding et populate (par regex)

                var d_b = [];//un tableau vide

                //si process event, recupere l'element, sinon, get path
                
                
                
                d_b["root"] = root;//le root de l'element (si necessaire)
                d_b["path"] = getDomPath(elem, root);//path CSS vers l'element
                //probleme XPATH: ne dois pas modifier le document!
                
                
                var to=nodeName;//le nom de l'attribut
                
                //MODIF: si commence par data-binded-, extrait e nom de la property
                if(to.indexOf("data-binded-") == 0) {
                        to=to.split('-')[2];
                }

                d_b["to"]=to;

                var match_index = __verif_regex__.lastIndex - cmds.length ;

                d_b['_index'] = match_index;//position dans la chaine
                d_b["_length"] = cmds.length;

                //recupere les commandes
                var match2 = __regex__.exec(cmds);
                while (match2 != null){
                        
                        d_b[match2[1]] = match2[2];
                        match2 = __regex__.exec(cmds);
                }
                __regex__.lastIndex = 0;//remet a zero pour leprochain coup

                __verif_regex__.lastIndex = 0;//remet a zero pour le prochain coup

       
                if (d_b["from"] == null && d_b["command"]==null) return null;
                d_b["process_event"] = process_event;

                var bind = d_b;

                //si doit etre utiliser de suite, cree le binding sinon, n'enregistre que les infos
                if (process_event){
                        d_b["_element"]= elem;//le html a binder
                        bind = __create_binding_from_infos(d_b);
                        bind.init(CONTEXT);
                }



        
        return bind;
}


//fabrique pour les bindings
//@paam d_b: binding infos
//@param return: le binding trouvé
function __create_binding_from_infos(d_b){
    //renvoie le 'bon' type de binding
    if(d_b["presenter"] != null){
        d_b.to = "innerHTML";
        //determine si le contexte de données est une liste ou un objet simple....
        if (d_b["from"].startsWith("http://")==true || d_b["from"].startsWith("https://")==true) return new __webservice_model_binding(d_b);
        return new __model_binding(d_b);
    }
    /*if(d_b["item_presenter"] != null){     SUPPRIMER !!!!
        //affichage pour un array!
        d_b.to = "innerHTML";
        d_b.presenter = d_b.item_presenter;
        d_b.item_presenter = null; //Fondre les models et array dans un meme binding???
        return new __array_binding(d_b);
    }*/
    if(d_b["command"] != null){
        return new __command_binding(d_b);
    }
        if (d_b["mode"] == '2way'){// && d_b._element.localName == 'input'){
                
                //pas génial comme façon de faire.................................................................
                if (d_b._element.localName=="input"){
                        //le cas radiobox est particulier; si checked, renvoie value plutot que l'etat du button radio, c'est plus logique...
                        if (d_b._element.getAttribute("type")=="radio" && d_b.to == "checked"){
                                //demande a retourner value plutot que checked
                                d_b.return_value = true;
                                //force l'event sur le click
                                if (d_b.event == undefined) d_b.event = "click";     //sauf si s'en sert...
                                if (d_b.converter == undefined){
                                        d_b.converter="ftw2:check_radio_value";
                                        d_b.converter_params="'"+d_b._element.value+"'";
                                }
                                 
                        } else if (d_b._element.getAttribute("type")=="text" && d_b._element.getAttribute("list")!=null){
                                d_b.event = "input";
                        }
               
                }
                return new __input_binding(d_b);
        }
        if(d_b.to == 'innerHTML') return new __textContent_binding(d_b);
        if(d_b.forceAttr == null && d_b.to in d_b._element) return new __prop_binding(d_b);
        else{

                return new __attr_binding(d_b);
        }

}


// Intialisation des bindings dans la page ----------------------------------------------------------------------------------
//TODO: met en cache les divs des presenters pour recuperation plus rapide apres...
function AppInit(){
        
        ctx = document.body.getAttribute("data-context");
        if (ctx == null) throw "No context defined!" ;//on verra plus tard!

        //si une function, initialise
        ctx = window[ctx];
        if (ctx instanceof Function){
                CONTEXT = new ctx();
        }
        else {
                CONTEXT = ctx;//permet toujours de recuperer un objet, pour un site tout simple amateur, c'est suffisant
                ctx = CONTEXT.constructor;//recupere le type;
        }
        if (CONTEXT == null)throw "No context defined!" ;//on verra plus tard!
        
        defineBindObject(CONTEXT);

        //qqs property necessaires:
        //process_update: true/false: indique si est en train de mettre a jour les données
        
        CONTEXT["__process_update"] = false;
        ctx.defineBindProperty( "process_update",{
                get : function(){
                        return this.__process_update;
                },
                set: function(value){
                    if (this.__process_update != value){
                        this.__process_update = value;
                        key = this.__uuid__+":process_update";

                        if (key in BINDINGS) {

                            __notifyDatasetChanged(this,BINDINGS[key], key);
                        }
                    }


                },
                enumerable: false,
        });

        //end_init: si true, initialisations terminées
        //en theorie, modifié 1 seule fois dans l'appli...
        CONTEXT["__end_init"] = false;
        ctx.defineBindProperty( "end_init",{
                get : function(){
                    return this.__end_init;
                },
                set: function(value){
                    if (this.__end_init != value){
                        this.__end_init = value;
                        key = this.__uuid__+":end_init";

                        if (key in BINDINGS) {
                            __notifyDatasetChanged(this,BINDINGS[key], key);
                        }
                    }


                },
                enumerable: false,
        });
        
        
        //si existent des models dans la page (ie: models globaux), recupere les
        var model_node = document.querySelector("body>div[data-role='presenters']");

        if (model_node != null){
                //n'affiche pas le contenu
                model_node.style.display = "none";

                models = model_node.querySelectorAll("body>div[data-role=presenters]>[data-role=presenter]");
                //pour chque model trouvé....
                for (moi=0;moi<models.length;moi++){
                        var model = models[moi];

                        id = model.getAttribute("id");
                        //probleme EDGE et SVG: pas de children pour le SVG...
                        if (id == null || (model.children==null && model.childNodes == null)) continue; //n'autorise pas de models sans id!
        

                        //SI EDGE ET SVG, DOIT PASSER PAR ChildNodes????
                        children = model.children;
                        if (children==null){
                                children = [];
                                
                                end = model.childNodes.length ;
                                current = 0;
                                cn = model.childNodes;
                                do{
                                        node = cn[current];
                                        if (node.nodeType != 8 && (node.nodeType!=3 || /\S/.test(node.nodeValue))){
                                               
                                                children.push(node);;
                                        }
                                        //ajoute
                                        
                                        current++;
                                }while(current<end);
                        }
                
                        //ici, si plusieurs childs, veut dire plusieurs data-type
                        if (children.length == 1){
                                //cree les bindings pour ce model
                                //bindings: les bindings presents dans le model
                                //template: le template/presenter html pour le model
                                //recycle: des presenters deja crées pour reutilisation
                                //MODELS[id] = __get_bindings(children[0], false);//false: ne met pas en place les events handlers
                                MODELS[id] ={bindings: __get_bindings(children[0], false), template: children[0], recycle:[]};
                        } else {
                                //utilise des data-types, doit creer un binding par data-type
                                for (c_i = 0; c_i < children.length; c_i++){
                                    mdl = children[c_i];
                                    dtype = mdl.getAttribute("data-type");
                                    
                                    if (dtype == null){
                                        //model par defaut
                                        //MODELS[id] = __get_bindings(mdl, false);
                                        MODELS[id] = {bindings: __get_bindings(mdl, false), template: mdl, recycle:[]};
                                    } else {
                                        //un datatype
                                        MODELS[id+"_"+dtype] = {bindings: __get_bindings(mdl, false), template: mdl, recycle:[]};
                                    }
                                }
                        }
                        
                        
                        //comment faire pour eviter a chaque initialisation de binding model de devoir recuperer le html????
                }

        }

        //les bindings de la page web...
        BINDINGS = __get_bindings(document.body, true, "//*[not(ancestor::div[@data-role='presenters']) and (@*[contains(.,'{binding ')] or contains(text(),'{binding ')) ]");
        
       
        notifyDatasetChanged();

        CONTEXT.end_init = true;//notifie la fin du chargement...
        
}


//lance au chargement...
window.addEventListener("load",AppInit);

//Return qqs methodes sympa...   
return {
        generateUUID : generateUUID
}






}));
