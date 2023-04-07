import {
  ContentChildren,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import { useReactive } from '@cfcs/angular';
import { ImReadyOptions, REACTIVE_IMREADY, PROPS } from '@egjs/imready';
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
  private _reacitveImReady = useReactive(this, REACTIVE_IMREADY);

  constructor() {
    super();
  }

  // manual mounted
  ngAfterViewInit() {
    const props: Partial<ImReadyOptions> = {};
    [...PROPS, "selector"].forEach((name) => {
      if (name in this && typeof (this as any)[name] !== 'undefined') {
        (props as any)[name] = (this as any)[name];
      }
    });
    this.setProps(props);
    this.children.map((child) => {
      this.add(child.getElement());
    });
    this._reacitveImReady.mounted();
  }
  // manual destory
  ngOnDestroy() {
    this._reacitveImReady.destroy();
  }
}
