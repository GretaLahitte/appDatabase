import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


//probleme: supprimer le pure=false: OK
@Pipe({name: 'widthHeight'})
export class WidthHeightPipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(ws) {
    console.log("transform wh")
    //calcule la taille minimale de la zone de dessin
    if(!ws) return this.sanitizer.bypassSecurityTrustStyle("width: 100%; height:100%;");
    return this.sanitizer.bypassSecurityTrustStyle(`width:${ws.width}px; height:${ws.height}px;`);
  }
}