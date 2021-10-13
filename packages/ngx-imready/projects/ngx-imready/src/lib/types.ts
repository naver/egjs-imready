/**
 * egjs-grid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
 import { EventEmitter } from "@angular/core";
 import { ImReadyEvents } from "@egjs/imready";

 export type NgxImReadyEvents = {
   [key in keyof ImReadyEvents]: EventEmitter<ImReadyEvents[key]>
 };
