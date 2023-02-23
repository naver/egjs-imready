import { ImReadyReactiveProps } from "@egjs/imready";
import { useImReady, VueImReadyResult } from "./useImReady";

/**
 * Vue hook to check if the images or videos are loaded. (only usePreReady and useError are true) Since this is deprecated, use useImReady instead.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Vue hook. (usePreReady와 useError만 true) deprecated 되었으므로 useImReady를 이용해주세요.
 * @deprecated
 * @memberof Vue2ImReady
 * @param - Vue ImReady's props <ko>Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { usePreReady } from "@egjs/vue2-imready";
 *
 * setup() {
 *   const im = usePreReady({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *      container: im.register(),
 *   }
 * }
 * // {{im.isPreReady}}
 * // &lt;div v-bind:ref="container"&gt;&lt;/div&gt;
 * ```
 */
export function usePreReady(props: Partial<ImReadyReactiveProps> = {}): VueImReadyResult {
  return useImReady(props);
}
