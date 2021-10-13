import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[NgxImReadyRegister]',
})
export class NgxImReadyRegisterDirective {
  constructor(private elRef: ElementRef<HTMLElement>) {
  }
  public getElement() {
    return this.elRef.nativeElement;
  }
}
