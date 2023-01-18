import { VueReactiveAdapterResult } from "@cfcs/vue3";
import { ImReadyHooksProps, REACTIVE_IMREADY } from "@egjs/imready";
import { useImReady } from "./useImReady";

/**
 * Vue hook to check if the images or videos are loaded. (only `useReadyElement`, `useReady` and `useError` are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 vue hook.(`useReadyElement`, `useReady`와 `useError`만 true)
 * @memberof VueImReady
 * @param - Vue ImReady's props <ko>Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { useReadyElement } from "@egjs/vue-imready";
 *
 * setup() {
 *   const im = useReadyElement({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *   }
 * }
 * // {{im.readyCount}}
 * // &lt;div v-bind:ref="im.register()"&gt;&lt;/div&gt;
 * ```
 */
export function useReadyElement(
  props: Partial<ImReadyHooksProps> = {}
): VueReactiveAdapterResult<typeof REACTIVE_IMREADY> {
  return useImReady({
    usePreReadyElement: false,
    usePreReady: false,
    ...props,
  });
}
