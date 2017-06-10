import { Pipe, PipeTransform } from '@angular/core';
import {Relation} from "../../sql/beans/relation";
import Table from "../../sql/beans/table";

@Pipe({name: 'relation2points', pure:false})//ca craint un peu ca...
export class Relation2PointsPipe implements PipeTransform {
  transform(relation: Relation): any {

      
        if(!relation) return "";
        
        //calcule les coords des points du link 
        let r = relation;
        //recup les infos de position
        let fromElem = r.from.field;
        let toElem = r.to.field;

        //fait un link entre les tables
        

        if(!fromElem.__elem){ 
            
            return; //pas encore rendu
        
        }
        
        let e1 = fromElem.__elem.nativeElement.getBoundingClientRect();
        let e2 = toElem.__elem.nativeElement.getBoundingClientRect();
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;

        //calcule le centre des elements
        let t1 = {
            x: e1.width/2 + e1.left + scrollX,
            y: e1.height/2 + e1.top + scrollY
        };
        let t2 = {
            x: e2.width/2 + e2.left + scrollX,
            y: e2.height/2 + e2.top + scrollY
        }
        let cfx = (t2.x -t1.x)/2 +t1.x;
        let cfy = (t2.y - t1.y)/2 + t1.y;
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


        return  t1.x+","+t1.y+" "+cfx+","+t1.y+" "+cfx+","+t2.y+" "+t2.x+","+t2.y;
        // return this.sanitizer.bypassSecurityTrustStyle(`<svg:polyline stroke-linejoin="round" 
        //     fill="none" 
        //     stroke="#3E3E3E" 
        //     stroke-width:"1" 
        //     stroke-dasharray="5px 5px"  points="${c}"/>`);
        
  }
}