/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import { addEvent, removeEvent, innerWidth, innerHeight, getAttribute } from "./utils";
import { WIDTH, HEIGHT } from "./consts";
import { AutoSizerElement } from "./types";

const elements: AutoSizerElement[] = [];

export function addAutoSizer(element: AutoSizerElement, prefix: string) {
  !elements.length && addEvent(window, "resize", resizeAllAutoSizers);
  element.__PREFIX__ = prefix;
  elements.push(element);
  resize(element);
}
export function removeAutoSizer(element: AutoSizerElement, prefix: string) {
  const index = elements.indexOf(element);

  if (index < 0) {
    return;
  }
  const fixed = getAttribute(element, `${prefix}fixed`);

  delete element.__PREFIX__;
  element.style[fixed === HEIGHT ? WIDTH : HEIGHT] = "";
  elements.splice(index, 1);

  !elements.length && removeEvent(window, "resize", resizeAllAutoSizers);
}
function resize(element: AutoSizerElement, prefix = "data-") {
  const elementPrefix = element.__PREFIX__ || prefix;
  const dataWidth = parseInt(getAttribute(element, `${elementPrefix}${WIDTH}`), 10) || 0;
  const dataHeight = parseInt(getAttribute(element, `${elementPrefix}${HEIGHT}`), 10) || 0;
  const fixed = getAttribute(element, `${elementPrefix}fixed`);

  if (fixed === HEIGHT) {
    const size = innerHeight(element) || dataHeight;

    element.style[WIDTH] = `${dataWidth / dataHeight * size}px`;
  } else {
    const size = innerWidth(element) || dataWidth;

    element.style[HEIGHT] = `${dataHeight / dataWidth * size}px`;
  }
}
export function resizeAllAutoSizers() {
  elements.forEach(element => {
    resize(element);
  });
}
