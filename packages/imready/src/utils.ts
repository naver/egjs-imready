/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import { ArrayFormat } from "./types";

import { SUPPORT_ADDEVENTLISTENER, SUPPORT_COMPUTEDSTYLE } from "./consts";

export function getAttribute(el: HTMLElement, name: string): string {
  return el.getAttribute(name) || "";
}

export function toArray<T>(arr: ArrayFormat<T>): T[] {
  return [].slice.call(arr);
}
export function hasSizeAttribute(target: HTMLElement, prefix = "data-"): boolean {
  return !!target.getAttribute(`${prefix}width`);
}
export function hasLoadingAttribute(target: HTMLElement, prefix = "data-"): target is HTMLImageElement {
  return (("loading" in target) && (target as HTMLImageElement).getAttribute("loading") === "lazy")
    || !!target.getAttribute(`${prefix}lazy`);
}
export function hasSkipAttribute(target: HTMLElement, prefix = "data-"): boolean {
  return !!target.getAttribute(`${prefix}skip`);
}
export function addEvent(
  element: EventTarget,
  type: string,
  handler: (...args: any[]) => void,
) {
  if (SUPPORT_ADDEVENTLISTENER) {
    element.addEventListener(type, handler, false);
  } else if ((element as any).attachEvent) {
    (element as any).attachEvent(`on${type}`, handler);
  } else {
    (element as any)[`on${type}`] = handler;
  }
}
export function removeEvent(
  element: EventTarget,
  type: string,
  handler: (...args: any[]) => void,
) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if ((element as any).detachEvent) {
    (element as any).detachEvent(`on${type}`, handler);
  } else {
    (element as any)[`on${type}`] = null;
  }
}

export function innerWidth(el: HTMLElement) {
  return getSize(el, "Width");
}
export function innerHeight(el: HTMLElement) {
  return getSize(el, "Height");
}
export function getStyles(el: Element) {
  return (SUPPORT_COMPUTEDSTYLE ?
    window.getComputedStyle(el) : (el as any).currentStyle) || {};
}
function getSize(el: HTMLElement, name: "Width" | "Height") {
  const size = (el as any)[`client${name}`] || (el as any)[`offset${name}`];

  return parseFloat(size || getStyles(el)[name.toLowerCase()]) || 0;
}

export function getContentElements(element: HTMLElement, tags: string[], prefix: string) {
  const skipElements = toArray(element.querySelectorAll([
    `[${prefix}skip] [${prefix}width]`,
    ...tags.map(tag => ([
      `[${prefix}skip] ${tag}`,
      `${tag}[${prefix}skip]`,
      `[${prefix}width] ${tag}`,
    ]).join(", ")),
  ].join(", ")));

  return toArray<HTMLElement>(
    element.querySelectorAll(`[${prefix}width], ${tags.join(", ")}`),
  ).filter(el => {
    return skipElements.indexOf(el) === -1;
  });
}
