<p align="middle" ><img src="https://github.com/naver/egjs-imready/raw/main/demo/images/logo.png"/></p>
<h2 align="middle">I'm Angular Ready</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/@egjs/ngx-imready" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/ngx-imready.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://travis-ci.org/naver/egjs-imready" target="_blank"><img alt="Travis (.org)" src="https://img.shields.io/travis/naver/egjs-imready.svg?style=flat-square&label=build" /></a>
<a href="https://github.com/naver/egjs-imready/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/static/v1?style=flat-square&label=license&message=MIT&color=08CE5D"/></a> <a href="https://github.com/naver/egjs-imready/tree/main/packages/ngx-imready" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&color=61daeb"></a>
</p>
<p align="middle">I'm Angular Ready to check if the images or videos are loaded!</p>
<p align="middle">
    <a href="https://naver.github.io/egjs-imready" target="_blank"><strong>Demo</strong></a> /
    <a href="https://naver.github.io/egjs-imready/release/latest/doc/" target="_blank"><strong>API</strong></a>
</p>



## Features
* Check that all images and videos in the container are loaded.
* If you know the size of the image or video in advance, you can skip loading and adjust the width and height automatically until the actual loading is completed.
* Support Native Lazy Loading.

## Documents
- [Get Started and Demos](https://naver.github.io/egjs-imready/)
- [API documentation](https://naver.github.io/egjs-imready/release/latest/doc/)

## Download and Installation

Download dist files from repo directly or install it via npm.

```bash
$ npm install @egjs/ngx-imready
```

## How to use
### Module definition
```diff
+import { NgxImReadyModule } from '@egjs/ngx-imready';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
+   NgxImReadyModule /* Add in imports */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } /* Your app */
```

### Use directives
* **NgxImReady**: Defines the target to use ImReady's events and props.
* **NgxImReadyRegister**: Register the element to be checked.

```diff
+<div NgxImReady
  selector="img"
  (ready)="onReady($event)"
  (readyElement)="onReadyElement($event)"
  (error)="onError($event)">
  <p>isReady: <span id="isReady">{{isReady ? "I'm Ready" : "Loading..."}}</span></p>
  <p>progress: <span id="readyCount">{{readyCount}}</span> / <span id="totalCount">{{totalCount}}</span></p>
  <p>errors: <span id="readyCount">{{errorCount}}</span></p>
+  <div class="images" NgxImReadyRegister>
    <img ... />
    <img ... />
  </div>
</div>
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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

```

* When the `loading="lazy"` attribute is used, the `preReadyElement`(hasLoading=true) event occurs and the size is 0. When loading is complete, the `readyElement`(hasLoading=true) event occurs and you can get the size.
```html
<img src="..." />
<img src="..." />
<img src="..." loading="lazy" />
```

* If you use `data-width` and `data-height` attributes, the size of self, child image, and video elements is automatically adjusted until loading is complete.
```html
<div data-width="100" data-height="100">
   <img src="..." />
   <img src="..." />
   <img src="..." />
</div>
```

* If you use `data-skip="true"` attribute, you can omit it even if there are images in itself and child image, and video elements.
```html
<div data-skip="true">
   <img src="..." />
   <img src="..." />
   <img src="..." />
</div>
```

### Events
* **preReadyElement**: An event occurs when the element is pre-ready (when the size is known)
* **preReady**: An event occurs when all element are pre-ready (when the size is known)
* **readyElement**: An event occurs when all element are ready
* **ready**: An event occurs when all element are ready


### Sequence of events
* If there is no data size attribute or loading attribute

(preReadyElement => readyElement) x N => **preReady** => **ready**
* If there is a data size attribute or a loading attribute

preReadyElement * N => (preReadyElement => readyElement) x M => **preReady** =>
readyElement(isPreReadyOver: true) x N => **ready**


## How to start developing egjs-imready?

For anyone interested to develop egjs-imready, follow the instructions below.

### Development Environment

#### 1. Clone the repository

Clone the egjs-imready repository and install the dependency modules.

```bash
# Clone the repository.
$ git clone https://github.com/naver/egjs-imready.git
$ cd egjs-imready/packages/ngx-imready
```

#### 2. Install dependencies

```
# Install the dependency modules.
$ npm install
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



## Bug Report

If you find a bug, please report to us opening a new [Issues](https://github.com/naver/egjs-imready/issues) on GitHub.


## License
egjs-imready is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2020-present NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<!-- badges -->
[badge-version]: https://img.shields.io/npm/v/@egjs/ngx-imready.svg?style=flat
[badge-build-status]: https://travis-ci.org/naver/egjs-imready.svg?branch=main
[badge-coverage]: https://coveralls.io/repos/github/naver/egjs-imready/badge.svg?branch=main
[badge-gk]: https://badges.greenkeeper.io/naver/egjs-imready.svg

<!-- links -->
[link-version]: https://www.npmjs.com/package/@egjs/ngx-imready
[link-build-status]: https://travis-ci.org/naver/egjs-imready
[link-coverage]: https://coveralls.io/github/naver/egjs-imready?branch=main
[link-gk]: https://greenkeeper.io/
