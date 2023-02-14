import { Observer, observe, reactive, ReactiveAdapter, ReactiveObject, Ref } from "@cfcs/core";
import { EVENTS } from "./consts";
import ImReady from "./ImReady";
import {
  ImReadyEvents,
  ImReadyReactiveProps,
  ImReadyReactiveState,
} from "./types";
import { toArray } from "./utils";

export interface ImReadyData {
  props: Partial<ImReadyReactiveProps>;
}

export type ReactiveImReady = ReactiveObject<{
  imReady: ImReady;
  children: HTMLElement[];
  preReadyCount: number;
  readyCount: number;
  errorCount: number;
  totalErrorCount: number;
  totalCount: number;
  isPreReady: boolean;
  isReady: boolean;
  hasError: boolean;
  isPreReadyOver: boolean;
  register(ref?: HTMLElement | Ref<HTMLElement>);
}>;


export const REACTIVE_IMREADY: ReactiveAdapter<
  ReactiveImReady,
  ImReadyReactiveState,
  "register",
  ImReadyData,
  ImReadyEvents
> = {
  methods: ["register"],
  events: EVENTS,
  state: {
    children: [],
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
    const {
      useError,
      usePreReadyElement,
      useReadyElement,
      usePreReady,
      useReady,
    } = data.props;
    const children: Observer<HTMLElement[]> = observe([]);
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
      imReady: imReady,
      children,
      preReadyCount,
      readyCount,
      errorCount,
      totalErrorCount,
      totalCount,
      isPreReady,
      isReady,
      hasError,
      isPreReadyOver,
      register: (ref?: HTMLElement | Ref<HTMLElement>) => {
        if (ref) {
          let el!: HTMLElement;
          if (ref instanceof Element) {
            el = ref;
          } else if ("value" in ref || "current" in ref) {
            el = ref.value! || ref.current!;
          }
          children.current.push(el);
        }
        return (instance) => {
          if (instance) {
            children.current.push(instance);
          }
        };
      },
    });
  },
  init(instance, data) {
    if (instance) {
      const { selector } = data.props;
      let checkedElements = instance.children;
      if (selector) {
        checkedElements = checkedElements.reduce((prev, cur) => {
          return [
            ...prev,
            ...toArray(
              cur.querySelectorAll<HTMLElement>(selector)
            ),
          ];
        }, [] as HTMLElement[]);
      }
      instance.totalCount = checkedElements.length;
      instance.imReady.check(checkedElements);
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
