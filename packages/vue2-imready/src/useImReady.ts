import { useReactive, VueReactiveAdapterResult } from "@cfcs/vue2";
import { ImReadyHooksProps, REACTIVE_IMREADY } from "@egjs/imready";

export interface VueImReadyResult extends VueReactiveAdapterResult<typeof REACTIVE_IMREADY> {}

/**
 * Vue hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Vue hook.
 * @memberof Vue2ImReady
 * @param - Vue ImReady's props <ko> Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/vue2-imready";
 *
 * setup() {
 *   const im = useImReady({
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
export function useImReady(props: Partial<ImReadyHooksProps> = {}): VueImReadyResult {
  return useReactive({
    data() {
      return {
        props,
      };
    },
    ...REACTIVE_IMREADY,
  });
}
