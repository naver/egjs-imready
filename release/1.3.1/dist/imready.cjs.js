/*
Copyright (c) 2020-present NAVER Corp.
name: @egjs/imready
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-imready
version: 1.3.1
*/
'use strict';

var Component = require('@egjs/component');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
var isWindow = typeof window !== "undefined";
var ua = isWindow ? window.navigator.userAgent : "";
var SUPPORT_COMPUTEDSTYLE = isWindow ? !!("getComputedStyle" in window) : false;
var IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
var SUPPORT_ADDEVENTLISTENER = isWindow ? !!("addEventListener" in document) : false;
var WIDTH = "width";
var HEIGHT = "height";
var PROPS = ["prefix", "loaders"];
var EVENTS = ["preReadyElement", "readyElement", "error", "preReady", "ready"];

function getAttribute(el, name) {
  return el.getAttribute(name) || "";
}
function toArray(arr) {
  return [].slice.call(arr);
}
function hasSizeAttribute(target, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }

  return !!target.getAttribute(prefix + "width");
}
function hasLoadingAttribute(target, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }

  return "loading" in target && target.getAttribute("loading") === "lazy" || !!target.getAttribute(prefix + "lazy");
}
function hasSkipAttribute(target, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }

  return !!target.getAttribute(prefix + "skip");
}
function addEvent(element, type, handler) {
  if (SUPPORT_ADDEVENTLISTENER) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}
function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, handler);
  } else {
    element["on" + type] = null;
  }
}
function innerWidth(el) {
  return getSize(el, "Width");
}
function innerHeight(el) {
  return getSize(el, "Height");
}
function getStyles(el) {
  return (SUPPORT_COMPUTEDSTYLE ? window.getComputedStyle(el) : el.currentStyle) || {};
}

function getSize(el, name) {
  var size = el["client" + name] || el["offset" + name];
  return parseFloat(size || getStyles(el)[name.toLowerCase()]) || 0;
}

function getContentElements(element, tags, prefix) {
  var skipElements = toArray(element.querySelectorAll(__spreadArrays(["[" + prefix + "skip] [" + prefix + "width]"], tags.map(function (tag) {
    return ["[" + prefix + "skip] " + tag, tag + "[" + prefix + "skip]", "[" + prefix + "width] " + tag].join(", ");
  })).join(", ")));
  return toArray(element.querySelectorAll("[" + prefix + "width], " + tags.join(", "))).filter(function (el) {
    return skipElements.indexOf(el) === -1;
  });
}

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
var elements = [];
function addAutoSizer(element, prefix) {
  !elements.length && addEvent(window, "resize", resizeAllAutoSizers);
  element.__PREFIX__ = prefix;
  elements.push(element);
  resize(element);
}
function removeAutoSizer(element, prefix) {
  var index = elements.indexOf(element);

  if (index < 0) {
    return;
  }

  var fixed = getAttribute(element, prefix + "fixed");
  delete element.__PREFIX__;
  element.style[fixed === HEIGHT ? WIDTH : HEIGHT] = "";
  elements.splice(index, 1);
  !elements.length && removeEvent(window, "resize", resizeAllAutoSizers);
}

function resize(element, prefix) {
  if (prefix === void 0) {
    prefix = "data-";
  }

  var elementPrefix = element.__PREFIX__ || prefix;
  var dataWidth = parseInt(getAttribute(element, "" + elementPrefix + WIDTH), 10) || 0;
  var dataHeight = parseInt(getAttribute(element, "" + elementPrefix + HEIGHT), 10) || 0;
  var fixed = getAttribute(element, elementPrefix + "fixed");

  if (fixed === HEIGHT) {
    var size = innerHeight(element) || dataHeight;
    element.style[WIDTH] = dataWidth / dataHeight * size + "px";
  } else {
    var size = innerWidth(element) || dataWidth;
    element.style[HEIGHT] = dataHeight / dataWidth * size + "px";
  }
}

function resizeAllAutoSizers() {
  elements.forEach(function (element) {
    resize(element);
  });
}

var Loader =
/*#__PURE__*/
function (_super) {
  __extends(Loader, _super);

  function Loader(element, options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.isReady = false;
    _this.isPreReady = false;
    _this.hasDataSize = false;
    _this.hasLoading = false;
    _this.isSkip = false;

    _this.onCheck = function (e) {
      _this.clear();

      if (e && e.type === "error") {
        _this.onError(_this.element);
      }

      if (_this.hasLoading && _this.checkElement()) {
        // I'm not ready
        return;
      } // I'm pre-ready and ready!


      var withPreReady = !_this.hasDataSize && !_this.hasLoading;

      _this.onReady(withPreReady);
    };

    _this.options = __assign({
      prefix: "data-"
    }, options);
    _this.element = element;
    var prefix = _this.options.prefix;
    _this.hasDataSize = hasSizeAttribute(element, prefix);
    _this.isSkip = hasSkipAttribute(element, prefix);
    _this.hasLoading = hasLoadingAttribute(element, prefix);
    return _this;
  }

  var __proto = Loader.prototype;

  __proto.check = function () {
    if (this.isSkip || !this.checkElement()) {
      // I'm Ready
      this.onAlreadyReady(true);
      return false;
    }

    if (this.hasDataSize) {
      addAutoSizer(this.element, this.options.prefix);
    }

    if (this.hasDataSize || this.hasLoading) {
      // I'm Pre Ready
      this.onAlreadyPreReady();
    } // Wati Pre Ready, Ready


    return true;
  };

  __proto.addEvents = function () {
    var _this = this;

    var element = this.element;
    this.constructor.EVENTS.forEach(function (name) {
      addEvent(element, name, _this.onCheck);
    });
  };

  __proto.clear = function () {
    var _this = this;

    var element = this.element;
    this.constructor.EVENTS.forEach(function (name) {
      removeEvent(element, name, _this.onCheck);
    });
    this.removeAutoSizer();
  };

  __proto.destroy = function () {
    this.clear();
    this.off();
  };

  __proto.removeAutoSizer = function () {
    if (this.hasDataSize) {
      // I'm already ready.
      var prefix = this.options.prefix;
      removeAutoSizer(this.element, prefix);
    }
  };

  __proto.onError = function (target) {
    this.trigger("error", {
      element: this.element,
      target: target
    });
  };

  __proto.onPreReady = function () {
    if (this.isPreReady) {
      return;
    }

    this.isPreReady = true;
    this.trigger("preReady", {
      element: this.element,
      hasLoading: this.hasLoading,
      isSkip: this.isSkip
    });
  };

  __proto.onReady = function (withPreReady) {
    if (this.isReady) {
      return;
    }

    withPreReady = !this.isPreReady && withPreReady;

    if (withPreReady) {
      this.isPreReady = true;
    }

    this.removeAutoSizer();
    this.isReady = true;
    this.trigger("ready", {
      element: this.element,
      withPreReady: withPreReady,
      hasLoading: this.hasLoading,
      isSkip: this.isSkip
    });
  };

  __proto.onAlreadyError = function (target) {
    var _this = this;

    setTimeout(function () {
      _this.onError(target);
    });
  };

  __proto.onAlreadyPreReady = function () {
    var _this = this;

    setTimeout(function () {
      _this.onPreReady();
    });
  };

  __proto.onAlreadyReady = function (withPreReady) {
    var _this = this;

    setTimeout(function () {
      _this.onReady(withPreReady);
    });
  };

  Loader.EVENTS = [];
  return Loader;
}(Component);

var ElementLoader =
/*#__PURE__*/
function (_super) {
  __extends(ElementLoader, _super);

  function ElementLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = ElementLoader.prototype;

  __proto.setHasLoading = function (hasLoading) {
    this.hasLoading = hasLoading;
  };

  __proto.check = function () {
    if (this.isSkip) {
      // I'm Ready
      this.onAlreadyReady(true);
      return false;
    }

    if (this.hasDataSize) {
      addAutoSizer(this.element, this.options.prefix);
      this.onAlreadyPreReady();
    } else {
      // has not data size
      this.trigger("requestChildren");
    }

    return true;
  };

  __proto.checkElement = function () {
    return true;
  };

  __proto.destroy = function () {
    this.clear();
    this.trigger("requestDestroy");
    this.off();
  };

  __proto.onAlreadyPreReady = function () {
    // has data size
    _super.prototype.onAlreadyPreReady.call(this);

    this.trigger("reqeustReadyChildren");
  };

  ElementLoader.EVENTS = [];
  return ElementLoader;
}(Loader);

/**
 * @alias eg.ImReady
 * @extends eg.Component
 */

var ImReadyManager =
/*#__PURE__*/
function (_super) {
  __extends(ImReadyManager, _super);
  /**
   * @param - ImReady's options
   */


  function ImReadyManager(options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.readyCount = 0;
    _this.preReadyCount = 0;
    _this.totalCount = 0;
    _this.totalErrorCount = 0;
    _this.isPreReadyOver = true;
    _this.elementInfos = [];
    _this.options = __assign({
      loaders: {},
      prefix: "data-"
    }, options);
    return _this;
  }
  /**
   * Checks whether elements are in the ready state.
   * @ko 엘리먼트가 준비 상태인지 체크한다.
   * @elements - Elements to check ready status. <ko> 준비 상태를 체크할 엘리먼트들.</ko>
   * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReadyElement: e => {
     *     // 1, 3
     *     // 2, 3
     *     // 3, 3
     *     console.log(e.preReadyCount, e.totalCount),
     *   },
     * });
     * ```
   */


  var __proto = ImReadyManager.prototype;

  __proto.check = function (elements) {
    var _this = this;

    var prefix = this.options.prefix;
    this.clear();
    this.elementInfos = toArray(elements).map(function (element, index) {
      var loader = _this.getLoader(element, {
        prefix: prefix
      });

      loader.check();
      loader.on("error", function (e) {
        _this.onError(index, e.target);
      }).on("preReady", function (e) {
        var info = _this.elementInfos[index];
        info.hasLoading = e.hasLoading;
        info.isSkip = e.isSkip;

        var isPreReady = _this.checkPreReady(index);

        _this.onPreReadyElement(index);

        isPreReady && _this.onPreReady();
      }).on("ready", function (_a) {
        var withPreReady = _a.withPreReady,
            hasLoading = _a.hasLoading,
            isSkip = _a.isSkip;
        var info = _this.elementInfos[index];
        info.hasLoading = hasLoading;
        info.isSkip = isSkip;

        var isPreReady = withPreReady && _this.checkPreReady(index);

        var isReady = _this.checkReady(index); // Pre-ready and ready occur simultaneously


        withPreReady && _this.onPreReadyElement(index);

        _this.onReadyElement(index);

        isPreReady && _this.onPreReady();
        isReady && _this.onReady();
      });
      return {
        loader: loader,
        element: element,
        hasLoading: false,
        hasError: false,
        isPreReady: false,
        isReady: false,
        isSkip: false
      };
    });
    var length = this.elementInfos.length;
    this.totalCount = length;

    if (!length) {
      setTimeout(function () {
        _this.onPreReady();

        _this.onReady();
      });
    }

    return this;
  };
  /**
   * Gets the total count of elements to be checked.
   * @ko 체크하는 element의 총 개수를 가져온다.
   */


  __proto.getTotalCount = function () {
    return this.totalCount;
  };
  /**
   * Whether the elements are all pre-ready. (all sizes are known)
   * @ko 엘리먼트들이 모두 사전 준비가 됐는지 (사이즈를 전부 알 수 있는지) 여부.
   */


  __proto.isPreReady = function () {
    return this.elementInfos.every(function (info) {
      return info.isPreReady;
    });
  };
  /**
   * Whether the elements are all ready.
   * @ko 엘리먼트들이 모두 준비가 됐는지 여부.
   */


  __proto.isReady = function () {
    return this.elementInfos.every(function (info) {
      return info.isReady;
    });
  };
  /**
   * Whether an error has occurred in the elements in the current state.
   * @ko 현재 상태에서 엘리먼트들이 에러가 발생했는지 여부.
   */


  __proto.hasError = function () {
    return this.totalErrorCount > 0;
  };
  /**
   * Clears events of elements being checked.
   * @ko 체크 중인 엘리먼트들의 이벤트를 해제 한다.
   */


  __proto.clear = function () {
    this.isPreReadyOver = false;
    this.totalCount = 0;
    this.preReadyCount = 0;
    this.readyCount = 0;
    this.totalErrorCount = 0;
    this.elementInfos.forEach(function (info) {
      if (info.loader) {
        info.loader.destroy();
      }
    });
    this.elementInfos = [];
  };
  /**
   * Destory all events.
   * @ko 모든 이벤트를 해제 한다.
   */


  __proto.destroy = function () {
    this.clear();
    this.off();
  };

  __proto.getLoader = function (element, options) {
    var _this = this;

    var tagName = element.tagName.toLowerCase();
    var loaders = this.options.loaders;
    var prefix = options.prefix;
    var tags = Object.keys(loaders);

    if (loaders[tagName]) {
      return new loaders[tagName](element, options);
    }

    var loader = new ElementLoader(element, options);
    var children = toArray(element.querySelectorAll(tags.join(", ")));
    loader.setHasLoading(children.some(function (el) {
      return hasLoadingAttribute(el, prefix);
    }));
    var withPreReady = false;
    var childrenImReady = this.clone().on("error", function (e) {
      loader.onError(e.target);
    }).on("ready", function () {
      loader.onReady(withPreReady);
    });
    loader.on("requestChildren", function () {
      // has not data size
      var contentElements = getContentElements(element, tags, _this.options.prefix);
      childrenImReady.check(contentElements).on("preReady", function (e) {
        withPreReady = e.isReady;

        if (!withPreReady) {
          loader.onPreReady();
        }
      });
    }).on("reqeustReadyChildren", function () {
      // has data size
      // loader call preReady
      // check only video, image elements
      childrenImReady.check(children);
    }).on("requestDestroy", function () {
      childrenImReady.destroy();
    });
    return loader;
  };

  __proto.clone = function () {
    return new ImReadyManager(__assign({}, this.options));
  };

  __proto.checkPreReady = function (index) {
    this.elementInfos[index].isPreReady = true;
    ++this.preReadyCount;

    if (this.preReadyCount < this.totalCount) {
      return false;
    }

    return true;
  };

  __proto.checkReady = function (index) {
    this.elementInfos[index].isReady = true;
    ++this.readyCount;

    if (this.readyCount < this.totalCount) {
      return false;
    }

    return true;
  };

  __proto.onError = function (index, target) {
    var info = this.elementInfos[index];
    info.hasError = true;
    /**
     * An event occurs if the image, video fails to load.
     * @ko 이미지, 비디오가 로딩에 실패하면 이벤트가 발생한다.
     * @event eg.ImReady#error
     * @param {eg.ImReady.OnError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg"/>
     *    <img src="ERR"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check([document.querySelector("div")]).on({
     *   error: e => {
     *     // <div>...</div>, 0, <img src="ERR"/>
     *     console.log(e.element, e.index, e.target),
     *   },
     * });
     * ```
     */

    this.trigger(new Component.ComponentEvent("error", {
      element: info.element,
      index: index,
      target: target,
      errorCount: this.getErrorCount(),
      totalErrorCount: ++this.totalErrorCount
    }));
  };

  __proto.onPreReadyElement = function (index) {
    var info = this.elementInfos[index];
    /**
     * An event occurs when the element is pre-ready (when the loading attribute is applied or the size is known)
     * @ko 해당 엘리먼트가 사전 준비되었을 때(loading 속성이 적용되었거나 사이즈를 알 수 있을 때) 이벤트가 발생한다.
     * @event eg.ImReady#preReadyElement
     * @param {eg.ImReady.OnPreReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReadyElement: e => {
     *     // 1, 3
     *     // 2, 3
     *     // 3, 3
     *     console.log(e.preReadyCount, e.totalCount),
     *   },
     * });
     * ```
     */

    this.trigger(new Component.ComponentEvent("preReadyElement", {
      element: info.element,
      index: index,
      preReadyCount: this.preReadyCount,
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isPreReady: this.isPreReady(),
      isReady: this.isReady(),
      hasLoading: info.hasLoading,
      isSkip: info.isSkip
    }));
  };

  __proto.onPreReady = function () {
    this.isPreReadyOver = true;
    /**
     * An event occurs when all element are pre-ready (When all elements have the loading attribute applied or the size is known)
     * @ko 모든 엘리먼트들이 사전 준비된 경우 (모든 엘리먼트들이 loading 속성이 적용되었거나 사이즈를 알 수 있는 경우) 이벤트가 발생한다.
     * @event eg.ImReady#preReady
     * @param {eg.ImReady.OnPreReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReady: e => {
     *     // 0, 3
     *     console.log(e.readyCount, e.totalCount),
     *   },
     * });
     * ```
     */

    this.trigger(new Component.ComponentEvent("preReady", {
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isReady: this.isReady(),
      hasLoading: this.hasLoading()
    }));
  };

  __proto.onReadyElement = function (index) {
    var info = this.elementInfos[index];
    /**
     * An event occurs when the element is ready
     * @ko 해당 엘리먼트가 준비가 되었을 때 이벤트가 발생한다.
     * @event eg.ImReady#readyElement
     * @param {eg.ImReady.OnReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   readyElement: e => {
     *     // 1, 0, false, 3
     *     // 2, 1, false, 3
     *     // 3, 2, true, 3
     *     console.log(e.readyCount, e.index, e.hasError, e.totalCount),
     *   },
     * });
     * ```
     */

    this.trigger(new Component.ComponentEvent("readyElement", {
      index: index,
      element: info.element,
      hasError: info.hasError,
      errorCount: this.getErrorCount(),
      totalErrorCount: this.totalErrorCount,
      preReadyCount: this.preReadyCount,
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isPreReady: this.isPreReady(),
      isReady: this.isReady(),
      hasLoading: info.hasLoading,
      isPreReadyOver: this.isPreReadyOver,
      isSkip: info.isSkip
    }));
  };

  __proto.onReady = function () {
    /**
     * An event occurs when all element are ready
     * @ko 모든 엘리먼트들이 준비된 경우 이벤트가 발생한다.
     * @event eg.ImReady#ready
     * @param {eg.ImReady.OnReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReady: e => {
     *     // 0, 3
     *     console.log(e.readyCount, e.totalCount),
     *   },
     *   ready: e => {
     *     // 1, 3
     *     console.log(e.errorCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new Component.ComponentEvent("ready", {
      errorCount: this.getErrorCount(),
      totalErrorCount: this.totalErrorCount,
      totalCount: this.totalCount
    }));
  };

  __proto.getErrorCount = function () {
    return this.elementInfos.filter(function (info) {
      return info.hasError;
    }).length;
  };

  __proto.hasLoading = function () {
    return this.elementInfos.some(function (info) {
      return info.hasLoading;
    });
  };

  return ImReadyManager;
}(Component);

var ImageLoader =
/*#__PURE__*/
function (_super) {
  __extends(ImageLoader, _super);

  function ImageLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = ImageLoader.prototype;

  __proto.checkElement = function () {
    var element = this.element;
    var src = element.getAttribute("src");

    if (element.complete) {
      if (src) {
        // complete
        if (!element.naturalWidth) {
          this.onAlreadyError(element);
        }

        return false;
      } else {
        // Using an external lazy loading module
        this.onAlreadyPreReady();
      }
    }

    this.addEvents();
    IS_IE && element.setAttribute("src", src);
    return true;
  };

  ImageLoader.EVENTS = ["load", "error"];
  return ImageLoader;
}(Loader);

var VideoLoader =
/*#__PURE__*/
function (_super) {
  __extends(VideoLoader, _super);

  function VideoLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = VideoLoader.prototype;

  __proto.checkElement = function () {
    var element = this.element; // HAVE_NOTHING: 0, no information whether or not the audio/video is ready
    // HAVE_METADATA: 1, HAVE_METADATA - metadata for the audio/video is ready
    // HAVE_CURRENT_DATA: 2, data for the current playback position is available, but not enough data to play next frame/millisecond
    // HAVE_FUTURE_DATA: 3, data for the current and at least the next frame is available
    // HAVE_ENOUGH_DATA: 4, enough data available to start playing

    if (element.readyState >= 1) {
      return false;
    }

    if (element.error) {
      this.onAlreadyError(element);
      return false;
    }

    this.addEvents();
    return true;
  };

  VideoLoader.EVENTS = ["loadedmetadata", "error"];
  return VideoLoader;
}(Loader);

var ImReady =
/*#__PURE__*/
function (_super) {
  __extends(ImReady, _super);

  function ImReady(options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, __assign({
      loaders: {
        img: ImageLoader,
        video: VideoLoader
      }
    }, options)) || this;
  }

  return ImReady;
}(ImReadyManager);

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/

var modules = {
    __proto__: null,
    'default': ImReady,
    Manager: ImReadyManager,
    VideoLoader: VideoLoader,
    ImageLoader: ImageLoader,
    Loader: Loader,
    EVENTS: EVENTS,
    PROPS: PROPS
};

/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/

for (var name in modules) {
  ImReady[name] = modules[name];
}

module.exports = ImReady;
//# sourceMappingURL=imready.cjs.js.map
