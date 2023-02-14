import { useLegacyReactive, ReactiveLegacyResult } from "@cfcs/vue2";
import { ImReadyReactiveProps, REACTIVE_IMREADY } from "@egjs/imready";

export interface VueImReadyResult extends ReactiveLegacyResult<typeof REACTIVE_IMREADY> {}

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
export function useImReady(props: Partial<ImReadyReactiveProps> = {}): VueImReadyResult {
  return useLegacyReactive({
    data() {
      return {
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
  });
}
