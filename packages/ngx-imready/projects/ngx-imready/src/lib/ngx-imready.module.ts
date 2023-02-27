/* eslint-disable @typescript-eslint/no-empty-function */
import { NgModule } from '@angular/core';
import { NgxImReadyRegisterDirective } from './ngx-imready-register.directive';
import { NgxImReadyDirective } from './ngx-imready.directive';

/**
 * Angular directive to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Angular directive.
 * @alias NgxImReady
 * @example
```html
<div NgxImReady
  selector="img"
  (ready)="onReady($event)"
  (readyElement)="onReadyElement($event)"
  (error)="onError($event)">
  <p>isReady: <span id="isReady">{{isReady ? "I'm Ready" : "Loading..."}}</span></p>
  <p>progress: <span id="readyCount">{{readyCount}}</span> / <span id="totalCount">{{totalCount}}</span></p>
  <p>errors: <span id="readyCount">{{errorCount}}</span></p>
  <div class="images" NgxImReadyRegister>
    <img ... />
    <img ... />
  </div>
</div>
```
 */
@NgModule({
  declarations: [
    NgxImReadyDirective,
    NgxImReadyRegisterDirective,
  ],
  exports: [
    NgxImReadyDirective,
    NgxImReadyRegisterDirective,
  ],
})
export class NgxImreadyModule {
}
