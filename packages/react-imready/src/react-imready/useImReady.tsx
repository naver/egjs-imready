import { MutableRefObject, Ref, RefCallback } from "react";
import { ImReadyReactiveProps, REACTIVE_IMREADY } from "@egjs/imready";
import { useReactive, ReactiveAdapterResult } from "@cfcs/react";

export interface ReactImReadyResult extends ReactiveAdapterResult<typeof REACTIVE_IMREADY> {
  register<T extends HTMLElement>(ref?: Ref<T>): RefCallback<T>;
}

/**
 * React hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 react hook.
 * @memberof ReactImReady
 * @param - React ImReady's props </ko>React ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/react-imready";
 *
 * function App() {
 *   const {
 *         register,
 *         isReady,
 *         isPreReady,
 *         preReadyCount,
 *         readyCount,
 *         totalCount,
 *     } = useImReady({
 *         selector: "img",
 *     });
 *     // &lt;div ref={register()}&gt;&lt;/div&gt;
 * }
 * ```
 */
export function useImReady(
  props: Partial<ImReadyReactiveProps>
): ReactImReadyResult {
  const children: HTMLElement[] = [];

  return {
    ...useReactive({
      data() {
        return {
          children,
          props: {
            usePreReady: true,
            usePreReadyElement: true,
            useReady: true,
            useReadyElement: true,
            useError: true,
            selector: "",
            ...props,
          },
        };
      },
      ...REACTIVE_IMREADY,
    }),
    register<T extends HTMLElement>(ref?: Ref<T>) {
      return (instance: T | null) => {
          if (instance) {
              children.push(instance);
          }
          if (!ref) {
              return;
          }
          const refType = typeof ref;

          if (refType === "function") {
              (ref as RefCallback<T>)(instance);
          } else {
              (ref as MutableRefObject<T | null>).current = instance;
          }
      };
    },
  };
}
