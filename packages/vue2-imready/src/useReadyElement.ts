import { ImReadyHooksProps } from "@egjs/imready";
import { useImReady, VueImReadyResult } from "./useImReady";

/**
 * Vue hook to check if the images or videos are loaded. (only `useReadyElement`, `useReady` and `useError` are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 vue hook.(`useReadyElement`, `useReady`와 `useError`만 true)
 * @memberof Vue2ImReady
 * @param - Vue ImReady's props <ko>Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { useReadyElement } from "@egjs/vue2-imready";
 *
 * setup() {
 *   const im = useReadyElement({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *      container: im.register(),
 *   }
 * }
 * // {{im.readyCount}}
 * // &lt;div v-bind:ref="container"&gt;&lt;/div&gt;
 * ```
 */
export function useReadyElement(props: Partial<ImReadyHooksProps> = {}): VueImReadyResult {
  return useImReady({
    usePreReadyElement: false,
    usePreReady: false,
    ...props,
  });
}
