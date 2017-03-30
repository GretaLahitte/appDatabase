var offX;
var offY;
var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
function Table(head){
	
	this.head=head;
	this.div =function(){
		div = document.createElement("div");
		div.id=this.head	
		//div = document.getElementById(_id);
		div.style.position = "absolute";
		div.style.left = "0px";
		div.style.top = "0px";
		div.style.width = "100px";
		div.style.height = "100px";
		div.style.background = "red";
		div.style.color = "blue";
		div.style.textContent=this.head;
		document.body.appendChild(div);
		this.take(head)
	};
	this.take=function(_id){
		console.log('take: ', _id);
		divId=document.getElementById(_id);
		divId.addEventListener('mousedown',this.drag,true);
	};
	this.drag=function(e){
		isDown = true;
		offset = [
			this.offsetLeft - e.clientX,
			this.offsetTop - e.clientY
		];
		console.log('drag');
		divId.addEventListener('mousemove',function(event){
			divId.addEventListener('mouseup', function() {
							event.preventDefault();

				isDown = false;
				console.log('mouseup');
				this.style.zIndex=0;
			}, true);
			//console.log(this);
			event.preventDefault();
			if (isDown) {
				mousePosition = {
			
					x : event.clientX,
					y : event.clientY
		
				};
				this.style.left = (mousePosition.x + offset[0]) + 'px';
				this.style.top  = (mousePosition.y + offset[1]) + 'px';
				this.style.zIndex=1000;
			}
		}),true	
	};
}
function launch(name){
	console.log('id:',name)
	var table =new Table(name);
	table.div();
}
