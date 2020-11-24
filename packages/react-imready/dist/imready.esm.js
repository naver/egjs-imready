/*
Copyright (c) NAVER Corp.
name: @egjs/react-imready
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-imready
version: 0.1.0
*/
import { useState, useEffect } from 'react';
import ImReady from '@egjs/imready';

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
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
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

function useImReady(props) {
  if (props === void 0) {
    props = {};
  }

  var _a = props.usePreReady,
      usePreReady = _a === void 0 ? true : _a,
      _b = props.usePreReadyElement,
      usePreReadyElement = _b === void 0 ? true : _b,
      _c = props.useReady,
      useReady = _c === void 0 ? true : _c,
      _d = props.useReadyElement,
      useReadyElement = _d === void 0 ? true : _d,
      _e = props.useError,
      useError = _e === void 0 ? true : _e,
      _f = props.selector,
      selector = _f === void 0 ? "" : _f,
      options = __rest(props, ["usePreReady", "usePreReadyElement", "useReady", "useReadyElement", "useError", "selector"]);

  var children = [];

  var _g = __read(useState(0), 2),
      preReadyCount = _g[0],
      setPreReadyCount = _g[1];

  var _h = __read(useState(0), 2),
      readyCount = _h[0],
      setReadyCount = _h[1];

  var _j = __read(useState(0), 2),
      errorCount = _j[0],
      setErrorCount = _j[1];

  var _k = __read(useState(0), 2),
      totalErrorCount = _k[0],
      setTotalErrorCount = _k[1];

  var _l = __read(useState(0), 2),
      totalCount = _l[0],
      setTotalCount = _l[1];

  var _m = __read(useState(false), 2),
      isPreReady = _m[0],
      setIsPreReady = _m[1];

  var _o = __read(useState(false), 2),
      isReady = _o[0],
      setIsReady = _o[1];

  var _p = __read(useState(false), 2),
      hasError = _p[0],
      setHasError = _p[1];

  function register(ref) {
    return function (instance) {
      if (instance) {
        children.push(instance);
      }

      if (!ref) {
        return;
      }

      var refType = typeof ref;

      if (refType === "function") {
        ref(instance);
      } else {
        ref.current = instance;
      }
    };
  }

  useEffect(function () {
    var im = new ImReady(options);
    var checkedElements = children;

    if (selector) {
      checkedElements = checkedElements.reduce(function (prev, cur) {
        return __spread(prev, cur.querySelectorAll(selector));
      }, []);
    }

    im.check(checkedElements).on("error", function (e) {
      if (useError) {
        setHasError(true);
        setErrorCount(e.errorCount);
        setTotalErrorCount(e.totalErrorCount);
      }
    }).on("preReadyElement", function (e) {
      if (usePreReadyElement) {
        setPreReadyCount(e.preReadyCount);
      }
    }).on("readyElement", function (e) {
      if (useReadyElement) {
        setReadyCount(e.readyCount);
      }
    }).on("preReady", function () {
      if (usePreReady) {
        setIsPreReady(true);
      }
    }).on("ready", function () {
      if (useReady) {
        setIsReady(true);
      }
    });
    setTotalCount(im.getTotalCount());
    return function () {
      im.destroy();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    preReadyCount: preReadyCount,
    readyCount: readyCount,
    totalCount: totalCount,
    errorCount: errorCount,
    totalErrorCount: totalErrorCount,
    isPreReady: isPreReady,
    isReady: isReady,
    hasError: hasError,
    register: register
  };
}

function usePreReadyElement(props) {
  if (props === void 0) {
    props = {};
  }

  return useImReady(__assign({
    useReady: false,
    useReadyElement: false
  }, props));
}

function useReadyElement(props) {
  if (props === void 0) {
    props = {};
  }

  return useImReady(__assign({
    usePreReadyElement: false,
    usePreReady: false
  }, props));
}

function usePreReady(props) {
  if (props === void 0) {
    props = {};
  }

  return useImReady(__assign({
    usePreReadyElement: false,
    useReadyElement: false,
    useReady: false
  }, props));
}

function useReady(props) {
  if (props === void 0) {
    props = {};
  }

  return useImReady(__assign({
    usePreReadyElement: false,
    usePreReady: false,
    useReadyElement: false
  }, props));
}

export { useImReady, usePreReady, usePreReadyElement, useReady, useReadyElement };
//# sourceMappingURL=imready.esm.js.map
