//Definition des variables globales
var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
var modal = document.getElementById('myModalTable');
var span = document.getElementsByClassName("close")[0];
var modalField = document.getElementById('myModalTableField');
var span1 = document.getElementsByClassName("close")[1];
var promptField;
var liste=[];
var flagEvent=false;


//affichage du formaluraire de nouveau champ
function formField(){
    modal.style.display = "block";
	span.onclick = function() { 
    modal.style.display = "none";
}
	}
/*Création de la classe Table (avec le nom de la table en argument):
 * elle contient les méthodes pour gérer le comportement des tables
 */ 
function Table(head){
	//nom d'entête de la table
	this.head=head;		
	//METHODE:création, affichage et écoute d'évenement de la div:
	this.div =function(){
		globalThis=this;
		div = document.createElement("div");
		div.id=this.head;
		
		div.style.position = "absolute";
		div.style.top = "100px";
		div.style.left = "200px";
		div.style.width = "20%";
		div.style.height = "auto";
		div.className='table';
		
		header=document.createElement('div');
		header.className="header";
		header.textContent=div.id.toUpperCase();
		
		addField=document.createElement('div');
		addField.className="addField";
		addField.textContent="+";
		
		div.appendChild(header);
		div.appendChild(addField);
		document.body.appendChild(div);
		
		document.getElementById(div.id).addEventListener('mousedown',this.drag,true);
		console.log('La table \''+div.id+'\' a été crée.');
		addField.addEventListener('click',this.addfield,true);
	};
	//METHODE: déplacement de la div et gestion des écoutes
	this.drag=function(e){
		if (e.target.className==header.className){
			elem=document.getElementById(event.target.offsetParent.id);
			isDown = true;
			offset = [
				elem.offsetLeft - e.clientX,
				elem.offsetTop - e.clientY
			];
			elem.style.boxShadow = "6px 6px 10px #125";
			console.log('La table \''+elem.id+'\' a été cliquée.');
			
			function mV(event){
				event.preventDefault();
				if (isDown) {
					if(event.target.className!='task'&&event.target.offsetParent.id==elem.id){
					mousePosition = {
						x : event.clientX,
						y : event.clientY
					};
					elem.style.left = (mousePosition.x + offset[0]) + 'px';
					elem.style.top  = (mousePosition.y + offset[1]) + 'px';
					elem.style.zIndex=1000;
					//console.log('linkArray: ',linkArray);
					if(linkArray.length==2){
						redraw(linkArray[0],linkArray[1]);
					}
				}else {
					var eL=document.getElementById(div.id);
					mousePosition = {
						x : event.clientX,
						y : event.clientY
					};
					elem.style.left = (mousePosition.x + offset[0]) + 'px';
					elem.style.top  = (mousePosition.y + offset[1]) + 'px';
					elem.style.zIndex=1000;
					}
				}
			}
			window.addEventListener('mousemove',mV,true);
			
			function mU(e){
			var el=document.getElementById(e.target.offsetParent.id);
			event.preventDefault();
			elem.style.boxShadow = null;
			isDown = false;
			elem.style.zIndex=0;
			window.removeEventListener('mousedown',globalThis.drag, true);
			window.removeEventListener('mousemove',mV, true);
			window.removeEventListener('mouseup',mU,true);
			console.log('La table \''+elem.id+'\' a été déplacée.')
			}
			window.addEventListener('mouseup',mU , true);
		}
	};
	//METHODE: ajout d'une entrée à la div
	this.addfield=function(e){
		
		conteneur =document.getElementById(e.target.offsetParent.id);
		console.log('addFiel: ',conteneur);
		modalField.style.display="block";
		span1.onclick = function() { 
			modalField.style.display = "none";
		};
		var fieldForm =document.getElementById('formField');
		fieldForm.onsubmit=function(e){
			var selectElem=document.getElementsByTagName('select')[0];
			var selectIndex= selectElem.options.selectedIndex;
			var selectedType = selectElem.options[selectIndex].value;
			var val=document.getElementById('nameField').value;
			newField=document.createElement('div');
			newField.className='field';
			newField.textContent=val+' '+selectedType;
			conteneur.insertBefore(newField,addField);
			modalField.style.display = "none";
			window.removeEventListener('mousedown',globalThis.drag, true);
		}
	}
}
//Initialisation de la table
function launch(name){
	
	console.log(liste.indexOf(name));
	if(liste.indexOf(name)==-1){
	liste.push(name);
	console.log(liste);
	var table =new Table(name);
	table.div();
    modal.style.display = "none";
}else{alert('Cette table existe déjà')};
		console.log(liste);

}
