import { AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import ImReady, { EVENTS, ImReadyOptions, PROPS } from '@egjs/imready';
import { NgxImReadyRegisterDirective } from './ngx-imready-register.directive';
import { NgxImReadyEvents } from './types';


@Directive({
  selector: '[NgxImReady]',
})

/**
 * Angular
 */
export class NgxImReadyDirective implements ImReadyOptions, NgxImReadyEvents, AfterViewInit, OnDestroy {
  @Input() prefix: ImReadyOptions['prefix'];
  @Input() loaders: ImReadyOptions['loaders'];
  @Input() selector: string;
  @Output() preReadyElement: NgxImReadyEvents['preReadyElement'];
  @Output() readyElement: NgxImReadyEvents['readyElement'];
  @Output() error: NgxImReadyEvents['error'];
  @Output() preReady: NgxImReadyEvents['preReady'];
  @Output() ready: NgxImReadyEvents['ready'];
  @ContentChildren(NgxImReadyRegisterDirective) children!: QueryList<NgxImReadyRegisterDirective>;

  private im: ImReady;


  constructor(private elRef: ElementRef<HTMLElement>) {
    EVENTS.forEach((name) => {
      (this as any)[name] = new EventEmitter();
    });
  }
  ngAfterViewInit(): void {
    const options: Partial<ImReadyOptions> = {};

    PROPS.forEach((name) => {
      if (name in this && typeof (this as any)[name] !== 'undefined') {
        (options as any)[name] = (this as any)[name];
      }
    });
    const im = new ImReady(options);

    this.im = im;



    let checkedElements = this.children.map(child => child.getElement());

    if (!checkedElements.length) {
      checkedElements = [].slice.call(this.elRef.nativeElement.children);
    }
    const selector = this.selector;
    if (selector) {
      checkedElements = checkedElements.reduce((prev, cur) => {
        return [...prev, ...[].slice.call(cur.querySelectorAll<HTMLElement>(selector))];
      }, [] as HTMLElement[]);
    }

    EVENTS.forEach((name) => {
      im.on(name, e => {
        this[name].emit(e as any);
      });
    });

    im.check(checkedElements);
  }
  ngOnDestroy() {
    this.im?.destroy();
  }
}