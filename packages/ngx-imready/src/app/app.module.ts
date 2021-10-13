import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxImreadyModule } from '../../projects/ngx-imready/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxImreadyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
