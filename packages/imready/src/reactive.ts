import {
  observe,
  reactive,
  ReactiveAdapter,
  ReactiveObject,
} from "@cfcs/core";
import { EVENTS, METHODS } from "./consts";
import ImReady from "./ImReady";
import {
  ArrayFormat,
  ImReadyEvents,
  ImReadyMethods,
  ImReadyReactiveProps,
  ImReadyReactiveState,
} from "./types";
import { toArray } from "./utils";

export interface ImReadyData {
  children: HTMLElement[];
  props: Partial<ImReadyReactiveProps>;
}

export type ReactiveImReady = ReactiveObject<{
  imReady: ImReady;
  preReadyCount: number;
  readyCount: number;
  errorCount: number;
  totalErrorCount: number;
  totalCount: number;
  isPreReady: boolean;
  isReady: boolean;
  hasError: boolean;
  isPreReadyOver: boolean;
  check(elements: ArrayFormat<HTMLElement>);
  getTotalCount();
  clear();
}>;

export const REACTIVE_IMREADY: ReactiveAdapter<
  ReactiveImReady,
  ImReadyReactiveState,
  keyof ImReadyMethods,
  ImReadyData,
  ImReadyEvents
> = {
  methods: METHODS,
  events: EVENTS,
  state: {
    preReadyCount: 0,
    readyCount: 0,
    errorCount: 0,
    totalErrorCount: 0,
    totalCount: 0,
    isPreReady: false,
    isReady: false,
    hasError: false,
    isPreReadyOver: false,
  },
  created(data) {
    const imReady = new ImReady(data.props);
    const preReadyCount = observe(0);
    const readyCount = observe(0);
    const errorCount = observe(0);
    const totalCount = observe(0);
    const totalErrorCount = observe(0);
    const isPreReady = observe(false);
    const isReady = observe(false);
    const hasError = observe(false);
    const isPreReadyOver = observe(false);

    imReady
      .on("error", (e) => {
        hasError.current = true;
        errorCount.current = e.errorCount;
        totalErrorCount.current = e.totalErrorCount;
      })
      .on("preReadyElement", (e) => {
        preReadyCount.current = e.preReadyCount;
      })
      .on("readyElement", (e) => {
        readyCount.current = e.readyCount;
        isPreReadyOver.current = e.isPreReadyOver;
      })
      .on("preReady", () => {
        isPreReady.current = true;
      })
      .on("ready", () => {
        isReady.current = true;
      });
    return reactive({
      imReady: imReady,
      preReadyCount,
      readyCount,
      errorCount,
      totalErrorCount,
      totalCount,
      isPreReady,
      isReady,
      hasError,
      isPreReadyOver,
    });
  },
  init(instance, data) {
    if (instance) {
      const { selector } = data.props;
      if (selector) {
        let checkedElements: HTMLElement[] = [];
        data.children.forEach((element) => {
          checkedElements = [...checkedElements, ...toArray(element.querySelectorAll<HTMLElement>(selector))];
        });
        instance.totalCount = checkedElements.length;
        instance.imReady.check(checkedElements);
      }
      return instance;
    }
  },
  destroy({ imReady }) {
    imReady.destroy();
  },
  on({ imReady }, name, callback) {
    imReady.on(name, callback);
  },
  off({ imReady }, name, callback) {
    imReady.off(name, callback);
  },
};
