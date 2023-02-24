/*
Copyright (c) NAVER Corp.
name: @egjs/imready
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-imready
version: 1.4.0
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, (global.eg = global.eg || {}, global.eg.ImReady = factory()));
}(this, (function () { 'use strict';

    /******************************************************************************
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
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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

    /** @deprecated */
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
      return r;
    }

    /*
    Copyright (c) NAVER Corp.
    name: @egjs/component
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-component
    version: 3.0.4
    */
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
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
        r,
        ar = [],
        e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
      return ar;
    }

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    var isUndefined = function (value) {
      return typeof value === "undefined";
    };

    // This class name is not matched to file name intentionally
    /**
     * Event class to provide additional properties
     * @ko Component에서 추가적인 프로퍼티를 제공하는 이벤트 클래스
     */
    var ComponentEvent = /*#__PURE__*/function () {
      /**
       * Create a new instance of ComponentEvent.
       * @ko ComponentEvent의 새로운 인스턴스를 생성한다.
       * @param eventType The name of the event.<ko>이벤트 이름.</ko>
       * @param props An object that contains additional event properties.<ko>추가적인 이벤트 프로퍼티 오브젝트.</ko>
       */
      function ComponentEvent(eventType, props) {
        var e_1, _a;
        this._canceled = false;
        if (props) {
          try {
            for (var _b = __values(Object.keys(props)), _c = _b.next(); !_c.done; _c = _b.next()) {
              var key = _c.value;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              this[key] = props[key];
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
        this.eventType = eventType;
      }
      /**
       * Stop the event. {@link ComponentEvent#isCanceled} will return `true` after.
       * @ko 이벤트를 중단한다. 이후 {@link ComponentEvent#isCanceled}가 `true`를 반환한다.
       */
      var __proto = ComponentEvent.prototype;
      __proto.stop = function () {
        this._canceled = true;
      };
      /**
       * Returns a boolean value that indicates whether {@link ComponentEvent#stop} is called before.
       * @ko {@link ComponentEvent#stop}이 호출되었는지 여부를 반환한다.
       * @return {boolean} A boolean value that indicates whether {@link ComponentEvent#stop} is called before.<ko>이전에 {@link ComponentEvent#stop}이 불려졌는지 여부를 반환한다.</ko>
       */
      __proto.isCanceled = function () {
        return this._canceled;
      };
      return ComponentEvent;
    }();

    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     */
    var Component = /*#__PURE__*/function () {
      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        this._eventHandler = {};
      }
      /**
       * Trigger a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {string | ComponentEvent} event The name of the custom event to be triggered or an instance of the ComponentEvent<ko>발생할 커스텀 이벤트의 이름 또는 ComponentEvent의 인스턴스</ko>
       * @param {any[]} params Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @return An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   beforeHi: ComponentEvent<{ foo: number; bar: string }>;
       *   hi: { foo: { a: number; b: boolean } };
       *   someEvent: (foo: number, bar: string) => void;
       *   someOtherEvent: void; // When there's no event argument
       * }> {
       *   some(){
       *     if(this.trigger("beforeHi")){ // When event call to stop return false.
       *       this.trigger("hi");// fire hi event.
       *     }
       *   }
       * }
       *
       * const some = new Some();
       * some.on("beforeHi", e => {
       *   if(condition){
       *     e.stop(); // When event call to stop, `hi` event not call.
       *   }
       *   // `currentTarget` is component instance.
       *   console.log(some === e.currentTarget); // true
       *
       *   typeof e.foo; // number
       *   typeof e.bar; // string
       * });
       * some.on("hi", e => {
       *   typeof e.foo.b; // boolean
       * });
       * // If you want to more know event design. You can see article.
       * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       * ```
       */
      var __proto = Component.prototype;
      __proto.trigger = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          params[_i - 1] = arguments[_i];
        }
        var eventName = event instanceof ComponentEvent ? event.eventType : event;
        var handlers = __spread(this._eventHandler[eventName] || []);
        if (handlers.length <= 0) {
          return this;
        }
        if (event instanceof ComponentEvent) {
          event.currentTarget = this;
          handlers.forEach(function (handler) {
            handler(event);
          });
        } else {
          handlers.forEach(function (handler) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            handler.apply(void 0, __spread(params));
          });
        }
        return this;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of the component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: ComponentEvent;
       * }> {
       *   hi() {
       *     alert("hi");
       *   }
       *   thing() {
       *     this.once("hi", this.hi);
       *   }
       * }
       *
       * var some = new Some();
       * some.thing();
       * some.trigger(new ComponentEvent("hi"));
       * // fire alert("hi");
       * some.trigger(new ComponentEvent("hi"));
       * // Nothing happens
       * ```
       */
      __proto.once = function (eventName, handlerToAttach) {
        var _this = this;
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;
          for (var key in eventHash) {
            this.once(key, eventHash[key]);
          }
          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var listener_1 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            handlerToAttach.apply(void 0, __spread(args));
            _this.off(eventName, listener_1);
          };
          this.on(eventName, listener_1);
        }
        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
       * ```ts
       * import Component from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: void;
       * }> {
       *   some() {
       *     this.hasOn("hi");// check hi event.
       *   }
       * }
       * ```
       */
      __proto.hasOn = function (eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>등록할 이벤트의 이름 또는 이벤트 이름-핸들러 오브젝트</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: void;
       * }> {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.on("hi",this.hi); //attach event
       *   }
       * }
       * ```
       */
      __proto.on = function (eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;
          for (var name in eventHash) {
            this.on(name, eventHash[name]);
          }
          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var handlerList = this._eventHandler[eventName];
          if (isUndefined(handlerList)) {
            this._eventHandler[eventName] = [];
            handlerList = this._eventHandler[eventName];
          }
          handlerList.push(handlerToAttach);
        }
        return this;
      };
      /**
       * Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.
       * @ko 컴포넌트에 등록된 이벤트를 해제한다.<br/>`eventName`이 주어지지 않았을 경우 모든 이벤트 핸들러를 제거한다.<br/>`handlerToAttach`가 주어지지 않았을 경우 `eventName`에 해당하는 모든 이벤트 핸들러를 제거한다.
       * @param {string?} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {function?} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```ts
       * import Component, { ComponentEvent } from "@egjs/component";
       *
       * class Some extends Component<{
       *   hi: void;
       * }> {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.off("hi",this.hi); //detach event
       *   }
       * }
       * ```
       */
      __proto.off = function (eventName, handlerToDetach) {
        var e_1, _a;
        // Detach all event handlers.
        if (isUndefined(eventName)) {
          this._eventHandler = {};
          return this;
        }
        // Detach all handlers for eventname or detach event handlers by object.
        if (isUndefined(handlerToDetach)) {
          if (typeof eventName === "string") {
            delete this._eventHandler[eventName];
            return this;
          } else {
            var eventHash = eventName;
            for (var name in eventHash) {
              this.off(name, eventHash[name]);
            }
            return this;
          }
        }
        // Detach single event handler
        var handlerList = this._eventHandler[eventName];
        if (handlerList) {
          var idx = 0;
          try {
            for (var handlerList_1 = __values(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
              var handlerFunction = handlerList_1_1.value;
              if (handlerFunction === handlerToDetach) {
                handlerList.splice(idx, 1);
                if (handlerList.length <= 0) {
                  delete this._eventHandler[eventName];
                }
                break;
              }
              idx++;
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
        return this;
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @example
       * Component.VERSION;  // ex) 3.0.0
       * @memberof Component
       */
      Component.VERSION = "3.0.4";
      return Component;
    }();

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
    var ComponentEvent$1 = ComponentEvent;

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

    var Loader = /*#__PURE__*/function (_super) {
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
          }
          // I'm pre-ready and ready!
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
        }
        // Wati Pre Ready, Ready
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

    var ElementLoader = /*#__PURE__*/function (_super) {
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
    var ImReadyManager = /*#__PURE__*/function (_super) {
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
            var isReady = _this.checkReady(index);
            // Pre-ready and ready occur simultaneously
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
        this.trigger(new ComponentEvent$1("error", {
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
        this.trigger(new ComponentEvent$1("preReadyElement", {
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
        this.trigger(new ComponentEvent$1("preReady", {
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
        this.trigger(new ComponentEvent$1("readyElement", {
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
        this.trigger(new ComponentEvent$1("ready", {
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

    var ImageLoader = /*#__PURE__*/function (_super) {
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

    var VideoLoader = /*#__PURE__*/function (_super) {
      __extends(VideoLoader, _super);
      function VideoLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      var __proto = VideoLoader.prototype;
      __proto.checkElement = function () {
        var element = this.element;
        // HAVE_NOTHING: 0, no information whether or not the audio/video is ready
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

    var ImReady = /*#__PURE__*/function (_super) {
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
    Copyright (c) NAVER Crop.
    name: @cfcs/core
    license: MIT
    author: NAVER Crop.
    repository: https://github.com/naver/cfcs
    version: 0.0.24
    */

    /**
     * cfcs
     * Copyright (c) 2022-present NAVER Corp.
     * MIT license
     */

    /**
     * @hidden
     */
    function keys(obj) {
      return Object.keys(obj);
    }
    /**
     * @hidden
     */

    function isString(val) {
      return typeof val === "string";
    }
    /**
     * @hidden
     */

    function isObject(val) {
      return typeof val === "object";
    }
    /**
     * @hidden
     */

    function isFunction(val) {
      return typeof val === "function";
    }

    var OBSERVERS_PATH = "__observers__";
    var COMPUTED_PATH = "__computed__";
    var CFCS_DETECTED_DEPENDENCIES_VERSION = 1;
    var CFCS_DETECTED_DEPENDENCIES = "__CFCS_DETECTED_DEPENDENCIES__";

    function getDetectedStack() {
      // Version issues do not occur when you access the native object in the global.
      Object[CFCS_DETECTED_DEPENDENCIES] = Object[CFCS_DETECTED_DEPENDENCIES] || {};
      var versionList = Object[CFCS_DETECTED_DEPENDENCIES];
      versionList[CFCS_DETECTED_DEPENDENCIES_VERSION] = versionList[CFCS_DETECTED_DEPENDENCIES_VERSION] || [];
      return versionList[CFCS_DETECTED_DEPENDENCIES_VERSION];
    }
    function getCurrentDetected() {
      var stack = getDetectedStack();
      return stack[stack.length - 1];
    }

    /**
     * Creates a mutable ref object. You can access the `.current` value and detect the value change through `.subscribe`.
     * @category Reactive
     * @see observe
     */

    var Observer =
    /*#__PURE__*/
    function () {
      /**
       *
       */
      function Observer(value) {
        this._emitter = new Component();
        this._current = value;
      }

      var __proto = Observer.prototype;
      Object.defineProperty(__proto, "current", {
        /**
         * return the current value.
         */
        get: function () {
          var currentDetected = getCurrentDetected();
          currentDetected === null || currentDetected === void 0 ? void 0 : currentDetected.push(this);
          return this._current;
        },
        set: function (value) {
          this._setCurrent(value);
        },
        enumerable: false,
        configurable: true
      });
      /**
       * When the current value changes, the callback function is called.
       */

      __proto.subscribe = function (callback) {
        this.current;

        this._emitter.on("update", callback);

        return this;
      };
      /**
       * Cancel the registered subscription through callback.
       */


      __proto.unsubscribe = function (callback) {
        this._emitter.off("update", callback);

        return this;
      };

      __proto._setCurrent = function (value) {
        var prevValue = this._current;
        var isUpdate = value !== prevValue;
        this._current = value;

        if (isUpdate) {
          this._emitter.trigger("update", value, prevValue);
        }
      };
      /**
       * @hidden
       */


      __proto.toString = function () {
        return "".concat(this.current);
      };
      /**
       * @hidden
       */


      __proto.valueOf = function () {
        return this.current;
      };

      return Observer;
    }();

    function injectObserve(prototype, memberName, publicName) {
      if (publicName === void 0) {
        publicName = memberName;
      }

      var nextAttributes = {
        configurable: true,
        get: function () {
          return getObserver(this, publicName).current;
        },
        set: function (value) {
          getObserver(this, publicName, value).current = value;
        }
      };
      Object.defineProperty(prototype, memberName, nextAttributes);

      if (publicName !== memberName) {
        Object.defineProperty(prototype, publicName, {
          configurable: true,
          get: function () {
            return getObserver(this, publicName).current;
          }
        });
      }
    }
    /**
     * @description `Observe` is a property decorator and converts the property into a `reactive state`. You can detect its status through `.subscribe`.
     * @category Reactive-Decorator
     * @see ReactiveSubscribe
     * @example
    * ```ts
    import { ReactiveSubscribe, Observe } from "@cfcs/core";

    @ReactiveSubscribe
    class Component {
      // The public name and state name are the same.
      @Observe value1 = 1;
      // If you want to set public name and private properties separately
      @Observe("value2") _value2 = 1;

      constructor() {
        requestAnimationFrame(() => {
          this.value1 = 2;
        });
      }
    }
    interface C
    ```
     */


    function Observe() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      if (args.length > 1) {
        return injectObserve(args[0], args[1]);
      }

      return function (prototype, memberName) {
        return injectObserve(prototype, memberName, args[0]);
      };
    }

    /**
     * @hidden
     */

    function injectReactiveSubscribe(object) {
      object["subscribe"] = function (name, callback) {
        this[name];
        getObserver(this, name).subscribe(callback);
      };

      object["unsubscribe"] = function (name, callback) {
        var _this = this;

        if (!name) {
          keys(getObservers(this)).forEach(function (observerName) {
            _this.unsubscribe(observerName);
          });
          return;
        }

        if (!(name in this)) {
          return;
        }

        getObserver(this, name).unsubscribe(callback);
      };
    }

    function makeReactiveObject(setup, all) {
      var result = isFunction(setup) ? setup() : setup;
      var reactiveObject = {};
      defineObservers(reactiveObject);
      keys(result).forEach(function (name) {
        var value = result[name];

        if (isObserver(value)) {
          setObserver(reactiveObject, name, value);
        } else {
          setObserver(reactiveObject, name, observe(value));
        }

        Observe(name)(reactiveObject, name);
      });
      injectReactiveSubscribe(reactiveObject);
      return reactiveObject;
    }
    /**
     * @description Make the return value of the corresponding object or function a reactive object.
     * @category Reactive
     * @param setup - The target object or function to which reactive is applied
     * @returns Makes all values into reactive objects.
     * @example
     * ```ts
     * import { reactive } from "@cfcs/core";
     *
     * const obj = reactive({
     *  value1: 1,
     *  value2: 2,
     * });
     *
     * obj.subscribe("value1", value1 => {
     *   console.log(value1);
     * });
     * obj.value1 = 2;
     * ```
     */


    function reactive(setup) {
      return makeReactiveObject(setup);
    }
    /**
     * @description Creates a mutable ref object. You can access the `.current` value and detect the value change through `.subscribe`.
     * @category Reactive
     * @example
     * ```ts
     * import { observe } from "@cfcs/core";
     *
     * const ob1 = observe(1);
     *
     * ob1.subscribe(nextValue => {
     *   console.log(nextValue);
     * });
     *
     * ob1.current = 2;
     * ```
     */

    function observe(defaultValue) {
      return new Observer(defaultValue);
    }
    /**
     * @hidden
     */

    function defineObservers(instance) {
      var observers = {};
      Object.defineProperty(instance, OBSERVERS_PATH, {
        get: function () {
          return observers;
        }
      });
      return observers;
    }
    /**
     * @hidden
     */

    function getObservers(instance) {
      var _a, _b;

      if (!instance[OBSERVERS_PATH]) {
        defineObservers(instance);
      }

      var observers = instance[OBSERVERS_PATH];
      var computedList = (_b = (_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.prototype) === null || _b === void 0 ? void 0 : _b[COMPUTED_PATH];

      if (computedList) {
        computedList.forEach(function (name) {
          if (!(name in observers) && name in instance) {
            instance[name];
          }
        });
      }

      return observers;
    }
    /**
     * @hidden
     */

    function getObserver(instance, name, defaultValue) {
      var observers = getObservers(instance);

      if (!observers[name]) {
        observers[name] = observe(defaultValue);
      }

      return observers[name];
    }
    /**
     * @hidden
     */

    function setObserver(instance, name, observer) {
      var observers = getObservers(instance);
      observers[name] = observer;
    }
    /**
     * @description Whether that object is an observer instance
     * @category Reactive
     */

    function isObserver(val) {
      return val && isObject(val) && "current" in val && "subscribe" in val && "unsubscribe" in val;
    }

    var REACTIVE_IMREADY = function (_a) {
      var setEvents = _a.setEvents,
        setMethods = _a.setMethods,
        on = _a.on,
        onInit = _a.onInit,
        onDestroy = _a.onDestroy,
        getProps = _a.getProps;
      setEvents(EVENTS);
      setMethods(["add"]);
      var children = [];
      var reactiveImReady = reactive({
        preReadyCount: 0,
        readyCount: 0,
        errorCount: 0,
        totalErrorCount: 0,
        totalCount: 0,
        isPreReady: false,
        isReady: false,
        hasError: false,
        isPreReadyOver: false,
        add: function (element) {
          children.push(element);
        }
      });
      var props = getProps() || {};
      var imReady = new ImReady(props);
      imReady.on("error", function (e) {
        reactiveImReady.hasError = true;
        reactiveImReady.errorCount = e.errorCount;
        reactiveImReady.totalErrorCount = e.totalErrorCount;
      }).on("preReadyElement", function (e) {
        reactiveImReady.preReadyCount = e.preReadyCount;
      }).on("readyElement", function (e) {
        reactiveImReady.readyCount = e.readyCount;
        reactiveImReady.isPreReadyOver = e.isPreReadyOver;
      }).on("preReady", function () {
        reactiveImReady.isPreReady = true;
      }).on("ready", function () {
        reactiveImReady.isReady = true;
      });
      on(function (_, name, callback) {
        imReady.on(name, callback);
        return function () {
          imReady.off(name, callback);
        };
      });
      onInit(function () {
        var selector = props === null || props === void 0 ? void 0 : props.selector;
        var checkedElements = [];
        children.forEach(function (child) {
          if (!child) {
            return;
          }
          if (isString(child)) {
            checkedElements = __spreadArrays(checkedElements, toArray(document.querySelectorAll(child)));
          } else if (child instanceof Element) {
            checkedElements.push(child);
          } else if ("value" in child || "current" in child) {
            var element = child.value || child.current;
            if (element) {
              checkedElements.push(element);
            }
          }
        });
        if (selector) {
          checkedElements = checkedElements.reduce(function (prev, cur) {
            return __spreadArrays(prev, [].slice.call(cur.querySelectorAll(selector)));
          }, []);
        }
        reactiveImReady.totalCount = checkedElements.length;
        imReady.check(checkedElements);
      });
      onDestroy(function () {
        imReady.destroy();
      });
      return reactiveImReady;
    };

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
        PROPS: PROPS,
        REACTIVE_IMREADY: REACTIVE_IMREADY
    };

    /*
    egjs-imready
    Copyright (c) 2020-present NAVER Corp.
    MIT license
    */
    for (var name in modules) {
      ImReady[name] = modules[name];
    }

    return ImReady;

})));
//# sourceMappingURL=imready.js.map
