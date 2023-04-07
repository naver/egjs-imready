import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngx-imready';
  public isReady = false;
  public totalCount = 0;
  public readyCount = 0;
  public errorCount = 0;
  onReadyElement(e) {
    this.readyCount = e.readyCount;
    this.totalCount = e.totalCount;
  }
  onError(e) {
    this.errorCount = e.errorCount;
  }
  onReady(e) {
    this.isReady = e.isReady;
  }
}
