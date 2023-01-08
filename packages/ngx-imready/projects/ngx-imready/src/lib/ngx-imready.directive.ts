import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  PLATFORM_ID,
  QueryList,
} from '@angular/core';
import ImReady, { EVENTS, ImReadyOptions, PROPS } from '@egjs/imready';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgxImReadyRegisterDirective } from './ngx-imready-register.directive';
import { NgxImReadyEvents } from './types';

@Directive({
  selector: '[NgxImReady]',
})
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

  private _imReady: ImReady | null = null;
  private _destroy$ = new Subject<void>();

  constructor(
    private _ngZone: NgZone,
    @Inject(PLATFORM_ID) private _platformId: string,
    private _host: ElementRef<HTMLElement>
  ) {
    EVENTS.forEach((name) => {
      (this as any)[name] = new EventEmitter();
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    const options: Partial<ImReadyOptions> = {};

    PROPS.forEach((name) => {
      if (name in this && typeof (this as any)[name] !== 'undefined') {
        (options as any)[name] = (this as any)[name];
      }
    });
  
    this._ngZone.runOutsideAngular(() => {
      this._imReady = new ImReady(options);
    });

    let checkedElements = this.children.map(child => child.getElement());

    if (!checkedElements.length) {
      checkedElements = [].slice.call(this._host.nativeElement.children);
    }
    const selector = this.selector;
    if (selector) {
      checkedElements = checkedElements.reduce((prev, cur) => {
        return [...prev, ...[].slice.call(cur.querySelectorAll<HTMLElement>(selector))];
      }, [] as HTMLElement[]);
    }

    EVENTS.forEach((name) => {
      fromEvent(this._imReady, name)
        .pipe(takeUntil(this._destroy$))
        .subscribe((event: any) => {
          const emitter = this[name];

          if (emitter && hasObservers(emitter)) {
            this._ngZone.run(() => emitter.emit(event));
          }
        });
    });

    this._ngZone.runOutsideAngular(() => this._imReady.check(checkedElements));
  }

  ngOnDestroy() {
    this._imReady?.destroy();
    this._imReady = null;
    this._destroy$.next();
  }
}

function hasObservers(emitter: EventEmitter<unknown>): boolean {
  // Note: The `observed` property is available only in RxJS@7.2.0, which means it's
  // not available for users running the lower version.
  return emitter['observed'] ?? emitter['observers'].length > 0;
}
