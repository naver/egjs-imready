import {
  ContentChildren,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import { useReactive } from '@cfcs/angular';
import { ImReadyOptions, REACTIVE_IMREADY } from '@egjs/imready';
import { ANGULAR_IMREADY_EVENTS } from './consts';
import { NgxImReadyRegisterDirective } from './ngx-imready-register.directive';
import { NgxImReadyInterface } from './ngx-imready.interface';

@Directive({
  selector: '[NgxImReady]',
  outputs: ANGULAR_IMREADY_EVENTS,
})
export class NgxImReadyDirective extends NgxImReadyInterface {
  @Input() prefix: ImReadyOptions['prefix'];
  @Input() loaders: ImReadyOptions['loaders'];
  @Input() selector: string;
  @ContentChildren(NgxImReadyRegisterDirective) children!: QueryList<NgxImReadyRegisterDirective>;
  private _reacitveImReady = useReactive(this, REACTIVE_IMREADY, () => {
    return {
      prefix: this.prefix,
      loaders: this.loaders,
      selector: this.selector,
    }
  });

  constructor() {
    super();
  }

  // manual mounted
  ngAfterViewInit() {
    // this.children.map(child => this._reacitveImReady.add(child.getElement()));
    this._reacitveImReady.mounted();
  }
  // manual destory
  ngOnDestroy() {
    this._reacitveImReady.destroy();
  }
}
