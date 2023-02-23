import { ImReadyReactiveProps } from "@egjs/imready";
import { useImReady, VueImReadyResult } from "./useImReady";

/**
 * Vue hook to check if the images or videos are loaded. (only `useReadyElement`, `useReady` and `useError` are true) Since this is deprecated, use useImReady instead.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 vue hook.(`useReadyElement`, `useReady`와 `useError`만 true) deprecated 되었으므로 useImReady를 이용해주세요.
 * @deprecated
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
  props: Partial<ImReadyReactiveProps> = {}
): VueImReadyResult {
  return useImReady(props);
}
