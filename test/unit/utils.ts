import Component from "@egjs/component";
import ImReady from "../../src/ImReady";
import { innerWidth, innerHeight } from "../../src/utils";

export function sandbox(obj: object | string, prop?: object): HTMLElement {
  const tmp = document.createElement("div");
  tmp.className = "_tempSandbox_";
  if (typeof obj === "string") {
    tmp.id = obj;
  } else {
    tmp.id = "sandbox";
  }

  if (typeof obj === "object" || typeof prop === "object") {
    const attrs = typeof prop === "object" ? prop : obj;
    for (const p in attrs as object) {
      if (/class|className/.test(p)) {
        tmp.setAttribute(p, attrs[p] + " _tempSandbox_");
      } else {
        tmp.setAttribute(p, attrs[p]);
      }
    }
  }
  return document.body.appendChild(tmp);
}

export function getSize(el: HTMLElement) {
  return [innerWidth(el), innerHeight(el)];
}
export function cleanup() {
  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
}
export function waitFor(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
export function waitEvent(component: Component, eventName: string) {
  return new Promise(resolve => {
    component.once(eventName, e => {
      resolve(e);
    });
  });
}

export type EventType = {
  eventType: string;
  [key: string]: any;
};
export function checkEventOrders(im: ImReady) {
  const orders: EventType[] = [];

  im.on("preReadyElement", e => {
    orders.push(e);
  });
  im.on("preReady", e => {
    orders.push(e);
  });
  im.on("ready", e => {
    orders.push(e);
  });
  im.on("readyElement", e => {
    orders.push(e);
  });

  return orders;
}
export function expectOrders(events: EventType[], values: string[]) {
  // Then
  const eventNames = events.map(e => e.eventType);

  expect(eventNames).to.be.deep.equals(values);
}
