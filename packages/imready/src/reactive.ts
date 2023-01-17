import { observe, reactive, ReactiveAdapter, ReactiveObject } from "@cfcs/core";
import { EVENTS } from "./consts";
import ImReady from "./ImReady";
import {
  ImReadyEvents,
  ImReadyHooksProps,
  ImReadyReactiveState,
} from "./types";

export interface ImReadyData {
  props: Partial<ImReadyHooksProps>;
}

export type ReactiveImReady = ReactiveObject<{
  instance: ImReady;
  register<T extends HTMLElement>(ref?: any): any;
}>;

const children: HTMLElement[] = [];

export const REACTIVE_IMREADY: ReactiveAdapter<
  ReactiveImReady,
  ImReadyReactiveState,
  never,
  ImReadyData,
  ImReadyEvents
> = {
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
  mounted(data) {
    const imReady = new ImReady(data.props);
    const {
      useError,
      usePreReadyElement,
      useReadyElement,
      usePreReady,
      useReady,
    } = data.props;
    const preReadyCount = observe(0);
    const readyCount = observe(0);
    const errorCount = observe(0);
    const totalErrorCount = observe(0);
    const totalCount = observe(imReady.getTotalCount());
    const isPreReady = observe(false);
    const isReady = observe(false);
    const hasError = observe(false);
    const isPreReadyOver = observe(false);

    imReady
      .check(children)
      .on("error", (e) => {
        if (useError) {
          hasError.current = true;
          errorCount.current = e.errorCount;
          totalErrorCount.current = e.totalErrorCount;
        }
      })
      .on("preReadyElement", (e) => {
        if (usePreReadyElement) {
          preReadyCount.current = e.preReadyCount;
        }
      })
      .on("readyElement", (e) => {
        if (useReadyElement) {
          readyCount.current = e.readyCount;
          isPreReadyOver.current = e.isPreReadyOver;
        }
      })
      .on("preReady", () => {
        if (usePreReady) {
          isPreReady.current = true;
        }
      })
      .on("ready", () => {
        if (useReady) {
          isReady.current = true;
        }
      });
    return reactive({
      instance: imReady,
      preReadyCount,
      readyCount,
      errorCount,
      totalErrorCount,
      totalCount,
      isPreReady,
      isReady,
      hasError,
      isPreReadyOver,
      register: () => {
        // register elements to children
        return;
      },
    });
  },
  destroy({ instance }) {
    instance.destroy();
  },
  on({ instance }, name, callback) {
    instance.on(name, callback);
  },
  off({ instance }, name, callback) {
    instance.off(name, callback);
  },
};
