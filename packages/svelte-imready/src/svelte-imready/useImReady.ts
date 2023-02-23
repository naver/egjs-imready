import { useReactive, ReactiveAdapterResult } from "@cfcs/svelte";
import { ImReadyReactiveProps, REACTIVE_IMREADY } from "@egjs/imready";

export interface SvelteImReadyResult extends ReactiveAdapterResult<typeof REACTIVE_IMREADY> {
  register(element: HTMLElement): any;
}

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
export function useImReady(props: Partial<ImReadyReactiveProps> = {}): SvelteImReadyResult {
  const result = useReactive(REACTIVE_IMREADY, () => props);

  return Object.assign(result, {
    register(element: HTMLElement) {
      result.add(element);

      return {
        destroy() {
          return;
        },
      };
    },
  });
}
