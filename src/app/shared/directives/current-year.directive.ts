import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCurrentYear]'
})
export class CurrentYearDirective {

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.textContent = new Date().getFullYear().toString();
  }

}
