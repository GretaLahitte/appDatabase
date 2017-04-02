var linkArray=[];

//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    console.log('startX ',startX);
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                    " V" + endY );
}

function connectElements(svg, path, startElem, endElem) {
	console.log('startElem: ',startElem)
    var svgContainer= document.getElementById("svgContainer");

  // if first element is lower than the second, swap!
    if(startElem.offsetTop > endElem.offsetTop){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }
    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offsetTop;
    var svgLeft = svgContainer.offsetLeft;

    // get (top, left) coordinates for the two elements
	var startCoord = {top:startElem.offsetTop,left:startElem.offsetLeft};
    var endCoord   = {top:endElem.offsetTop,left:endElem.offsetLeft};

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.clientWidth - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.clientHeight - svgTop;        // y = top offset + height - svg's top offset
    // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.clientWidth - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}


function redraw(first,second){
	iniT();
	console.log('redraw');
	var fromT =document.getElementById(first);
	var toT =document.getElementById(second);
	connectElements($("#svg1"), $("#path1"), fromT,toT);

	}
	
function connectAll(e) {
    // connect all the paths you want!
   console.log('connectAll: ',e);
   if(e.target.offsetParent.className=='table'){
	   var first= e.target.offsetParent.id;
	   linkArray.push(first);
	   console.log('array link; ',linkArray)
	   if (linkArray.length==2){
		   var fromTable=document.getElementById(linkArray[0]);
		   var toTable=document.getElementById(linkArray[1]);
		   
		   connectElements($("#svg1"), $("#path1"), fromTable,toTable);
		  	document.removeEventListener('click',connectAll,false)
 }
	   }
   // connectElements($("#svg1"), $("#path1"), $("#toto"),   $("#lolo"));
    

}
function retrieveLink(){
	var allTable =document.getElementsByClassName('table');
	console.log('click: ',allTable);
	document.addEventListener('click',connectAll,false)
	}
function iniT(){
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
   // connectAll();
};

