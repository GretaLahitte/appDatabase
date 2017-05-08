import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({name: 'widthHeight', pure:false})
export class WidthHeightPipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(tables) {
    //calcule la taille minimale de la zone de dessin
    let maxX = 0, maxY = 0;
    for (let table of tables){
        let c = table.__elem.nativeElement.getBoundingClientRect();
        let mx = c.right + window.scrollX;
        let my = c.bottom + window.scrollY;
       
        maxX = mx > maxX ? mx : maxX;
        maxY = my > maxY ? my : maxY;

        
    }
    maxX = maxX < window.innerWidth ? window.innerWidth : maxX;
        maxY = maxY < window.innerHeight ? window.innerHeight : maxY;
    return this.sanitizer.bypassSecurityTrustStyle(`width:${maxX}px; height:${maxY}px;`);
  }
}