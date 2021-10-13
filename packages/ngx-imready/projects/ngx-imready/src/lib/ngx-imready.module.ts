import { NgModule } from '@angular/core';
import { NgxImReadyRegisterDirective } from './ngx-imready-register.directive';
import { NgxImReadyDirective } from './ngx-imready.directive';



@NgModule({
  declarations: [
    NgxImReadyDirective,
    NgxImReadyRegisterDirective,
  ],
  imports: [
  ],
  exports: [
    NgxImReadyDirective,
    NgxImReadyRegisterDirective,
  ],
})
export class NgxImreadyModule { }
