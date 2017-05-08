import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeCSS'})
export class BypassCSSPipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(coords) {
    let c = coords || {x:0,y:0};
    
    let transform = `transform:translate(${c.x}px,${c.y}px);`;
    return this.sanitizer.bypassSecurityTrustStyle(transform);
  }
}