import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Owner } from '../../_interfaces/owner.model';

@Directive({
  selector: '[appAppend]'
})
export class AppendDirective implements OnChanges {
  @Input('appAppend') ownerParam: Owner;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.ownerParam.currentValue){
      const accNum = changes.ownerParam.currentValue.accounts.length;
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(` (${accNum}) accounts`);

      this.renderer.appendChild(span, text);
      this.renderer.appendChild(this.element.nativeElement, span);
    }
  }
}
