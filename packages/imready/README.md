<p align="middle" ><img src="https://github.com/naver/egjs-imready/raw/main/demo/images/logo.png"/></p>
<h2 align="middle">I'm Ready</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/@egjs/imready" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/imready.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://travis-ci.org/naver/egjs-imready" target="_blank"><img alt="Travis (.org)" src="https://img.shields.io/travis/naver/egjs-imready.svg?style=flat-square&label=build" /></a>
<a href="https://coveralls.io/github/naver/egjs-imready?branch=main&style=flat-square" target="_blank"><img alt="Coveralls github" src="https://img.shields.io/coveralls/github/naver/egjs-imready.svg?style=flat-square&label=%E2%9C%85%20coverage"></a>
<a href="https://github.com/naver/egjs-imready/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/static/v1?style=flat-square&label=license&message=MIT&color=08CE5D"/></a>
<a href="https://github.com/naver/egjs-imready/tree/main/packages/react-imready" target="_blank"><img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&color=61daeb"></a>
<a href="https://github.com/naver/egjs-imready/tree/main/packages/vue-imready" target="_blank"><img alt="Vue" src="https://img.shields.io/static/v1.svg?label=&message=Vue&style=flat-square&color=42b883"></a>
<a href="https://github.com/naver/egjs-imready/tree/main/packages/vue2-imready" target="_blank"><img alt="Vue 2" src="https://img.shields.io/static/v1.svg?label=&message=Vue2&style=flat-square&color=42b883"></a>
<a href="https://github.com/naver/egjs-imready/tree/main/packages/ngx-imready" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&color=dd0031"></a>
<a href="https://github.com/naver/egjs-imready/tree/main/packages/svelte-imready" target="_blank"><img alt="Svelte" src="https://img.shields.io/static/v1.svg?label=&message=Svelte&style=flat-square&color=FF3E00"></a>
</p>
<p align="middle">I'm Ready to check if the images or videos are loaded!</p>
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
$ npm install @egjs/imready
```

```html
<script src="//naver.github.io/egjs-imready/release/latest/dist/imready.min.js"></script>
```

## How to use
```js
import ImReady from "@egjs/imready";

const im = new ImReady().on("preReady", () => {
   // I'm pre-ready
}).on("ready", () => {
   // I'm ready
});

// check element
im.check([element]);
```

* When the `loading="lazy"` or `data-lazy="true"`(external lazy loading) attribute is used, the `preReadyElement`(hasLoading=true) event occurs and the size is 0. When loading is complete, the `readyElement`(hasLoading=true) event occurs and you can get the size.
```html
<img src="..." />
<img src="..." />
<img src="..." loading="lazy" />
<img data-lazy="true" />
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



## Supported Browsers
The following are the supported browsers.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|9+(polyfill 8+)|Latest|Latest|Latest|7+|4+(polyfill 2.2+)|

### **Use polyfill if you want to use it in a lower version browser.**
* Array.prototype.forEach
* Array.prototype.map
* Array.prototype.some
* Array.prototype.filter


## How to start developing egjs-imready?

For anyone interested to develop egjs-imready, follow the instructions below.

### Development Environment

#### 1. Clone the repository

Clone the egjs-imready repository and install the dependency modules.

```bash
# Clone the repository.
$ git clone https://github.com/naver/egjs-imready.git
```

#### 2. Install dependencies

```
# Install the dependency modules.
$ npm install
```

#### 3. Build

Use npm script to build eg.ImReady

```bash
# Run webpack-dev-server for development
$ npm start

# Build
$ npm run build

# Generate jsdoc
$ npm run jsdoc
```

Two folders will be created after complete build is completed.

- **dist** folder: Includes the **imready.js** and **imready.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To keep the same code style, we adopted [ESLint](http://eslint.org/) to maintain our code quality. The [rules](https://github.com/naver/eslint-config-naver/tree/main/rules) are modified version based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
Setup your editor for check or run below command for linting.

```bash
$ npm run lint
```

### Test

Once you created a branch and done with development, you must perform a test running with `npm test` command before your push the code to a remote repository.

```bash
$ npm run test
```
Running `npm test` command will start [Mocha](https://mochajs.org/) tests via [Karma-runner](https://karma-runner.github.io/).


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
[badge-version]: https://img.shields.io/npm/v/@egjs/imready.svg?style=flat
[badge-build-status]: https://travis-ci.org/naver/egjs-imready.svg?branch=main
[badge-coverage]: https://coveralls.io/repos/github/naver/egjs-imready/badge.svg?branch=main
[badge-gk]: https://badges.greenkeeper.io/naver/egjs-imready.svg

<!-- links -->
[link-version]: https://www.npmjs.com/package/@egjs/imready
[link-build-status]: https://travis-ci.org/naver/egjs-imready
[link-coverage]: https://coveralls.io/github/naver/egjs-imready?branch=main
[link-gk]: https://greenkeeper.io/
