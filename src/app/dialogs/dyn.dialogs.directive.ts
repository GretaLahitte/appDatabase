import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dyn-dialog]',
})
export class DynDialogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

