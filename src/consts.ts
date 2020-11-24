/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
const isWindow = typeof window !== "undefined";
const ua = isWindow ? window.navigator.userAgent : "";
export const SUPPORT_COMPUTEDSTYLE = isWindow ? !!("getComputedStyle" in window) : false;
export const IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
export const SUPPORT_ADDEVENTLISTENER = isWindow ? !!("addEventListener" in document) : false;
export const WIDTH = "width";
export const HEIGHT = "height";
