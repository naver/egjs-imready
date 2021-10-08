import { writable } from "svelte/store";
import ImReady from "@egjs/imready";
import type { ImReadyProps, ImReadyValue } from "./types";
import { onDestroy, onMount } from "svelte/internal";

/**
 * Svelte hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 svelte hook.
 * @memberof SvelteImReady
 * @param - Svelte ImReady's props </ko>Svelte ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/svelte-imready";
 *
 * const {
 *     register,
 *     isReady,
 *     isPreReady,
 *     preReadyCount,
 *     readyCount,
 *     totalCount,
 * } = useImReady({
 *     selector: "img",
 * });
 * // &lt;div use:register &gt;&lt;/div&gt;
 * ```
 */
export function useImReady(props: Partial<ImReadyProps> = {}): ImReadyValue {
  const {
    usePreReady = true,
    usePreReadyElement = true,
    useReady = true,
    useReadyElement = true,
    useError = true,
    selector = "",
    ...options
  } = props;


  const children: Array<HTMLElement> = [];
  const preReadyCount = writable(0);
  const readyCount = writable(0);
  const errorCount = writable(0);
  const totalErrorCount = writable(0);
  const totalCount = writable(0);
  const isPreReady = writable(false);
  const isReady = writable(false);
  const hasError = writable(false);
  const isPreReadyOver = writable(false);
  let im: ImReady;

  function register(element: HTMLElement) {
    children.push(element);

    return {
      destroy() {
        return;
      },
    };
  }

  onMount(() => {
    im = new ImReady(options);

    let checkedElements = children;

    if (selector) {
      checkedElements = children.reduce((prev, cur) => {
        const nextElements = [].slice.call(cur.querySelectorAll<HTMLElement>(selector));
        return [...prev, ...nextElements];
      }, [] as HTMLElement[]);
    }
    im.check(checkedElements).on("error", e => {
      if (useError) {
        hasError.set(true);
        errorCount.set(e.errorCount);
        totalErrorCount.set(e.totalErrorCount);
      }
    }).on("preReadyElement", e => {
      if (usePreReadyElement) {
        preReadyCount.set(e.preReadyCount);
      }
    }).on("readyElement", e => {
      if (useReadyElement) {
        readyCount.set(e.readyCount);
        isPreReady.set(e.isPreReadyOver);
      }
    }).on("preReady", () => {
      if (usePreReady) {
        isPreReady.set(true);
      }
    }).on("ready", () => {
      if (useReady) {
        isReady.set(true);
      }
    });

    totalCount.set(im.getTotalCount());
  });

  onDestroy(() => {
    im && im.destroy();
  });

  return {
    preReadyCount,
    readyCount,
    totalCount,
    errorCount,
    totalErrorCount,
    isPreReady,
    isReady,
    hasError,
    isPreReadyOver,
    register,
  };
}
