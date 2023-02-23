import {
  reactive,
  ReactiveSetupAdapter,
  ReactiveObject,
  Ref,
  isString,
} from "@cfcs/core";
import { EVENTS } from "./consts";
import ImReady from "./ImReady";
import {
  ImReadyEvents,
  ImReadyReactiveProps,
  ImReadyReactiveState,
} from "./types";
import { toArray } from "./utils";


export type ReactiveImReady = ReactiveObject<{
  preReadyCount: number;
  readyCount: number;
  errorCount: number;
  totalErrorCount: number;
  totalCount: number;
  isPreReady: boolean;
  isReady: boolean;
  hasError: boolean;
  isPreReadyOver: boolean;
  add(element: HTMLElement): void;
}>;

export const REACTIVE_IMREADY: ReactiveSetupAdapter<
  ReactiveImReady,
  ImReadyReactiveState,
  "add",
  Partial<ImReadyReactiveProps>,
  ImReadyEvents
> = ({ setEvents, setMethods, on, onInit, onDestroy, getProps }) => {
  setEvents(EVENTS);
  setMethods(["add"]);
  const children: Array<HTMLElement | Ref<HTMLElement> | string> = [];
  const reactiveImReady = reactive({
    preReadyCount: 0,
    readyCount: 0,
    errorCount: 0,
    totalErrorCount: 0,
    totalCount: 0,
    isPreReady: false,
    isReady: false,
    hasError: false,
    isPreReadyOver: false,
    add(element: HTMLElement | Ref<HTMLElement> | string) {
      children.push(element);
    },
  });
  const props = getProps() || {};
  const imReady = new ImReady(props);

  imReady
    .on("error", (e) => {
      reactiveImReady.hasError = true;
      reactiveImReady.errorCount = e.errorCount;
      reactiveImReady.totalErrorCount = e.totalErrorCount;
    })
    .on("preReadyElement", (e) => {
      reactiveImReady.preReadyCount = e.preReadyCount;
    })
    .on("readyElement", (e) => {
      reactiveImReady.readyCount = e.readyCount;
      reactiveImReady.isPreReadyOver = e.isPreReadyOver;
    })
    .on("preReady", () => {
      reactiveImReady.isPreReady = true;
    })
    .on("ready", () => {
      reactiveImReady.isReady = true;
    });

  on((_, name, callback) => {
    imReady.on(name, callback);

    return () => {
      imReady.off(name, callback);
    };
  });
  onInit(() => {
    const selector = props?.selector;
    let checkedElements: HTMLElement[] = [];

    children.forEach((child) => {
      if (!child) {
        return;
      }
      if (isString(child)) {
        checkedElements = [
          ...checkedElements,
          ...toArray(document.querySelectorAll<HTMLElement>(child)),
        ];
      } else if (child instanceof Element) {
        checkedElements.push(child);
      } else if ("value" in child || "current" in child) {
        const element = child.value || child.current;

        if (element) {
          checkedElements.push(element);
        }
      }
    });

    if (selector) {
      checkedElements = checkedElements.reduce((prev, cur) => {
        return [
          ...prev,
          ...[].slice.call(cur.querySelectorAll<HTMLElement>(selector)),
        ];
      }, [] as HTMLElement[]);
    }

    reactiveImReady.totalCount = checkedElements.length;
    imReady.check(checkedElements);
  });
  onDestroy(() => {
    imReady.destroy();
  });

  return reactiveImReady;
};
