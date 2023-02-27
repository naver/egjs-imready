import { useLegacyReactive, ReactiveLegacyAdapterResult } from "@cfcs/vue2";
import { ImReadyReactiveProps, REACTIVE_IMREADY } from "@egjs/imready";
import { ref, Ref } from "@vue/composition-api";

export interface VueImReadyResult extends ReactiveLegacyAdapterResult<typeof REACTIVE_IMREADY> {
  register<T extends HTMLElement>(ref?: Ref<T | null | undefined>): Ref<T | null | undefined>;
}

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
  const result = useLegacyReactive(REACTIVE_IMREADY, () => props);

  return Object.assign(result, {
    register<T extends HTMLElement>(refOption: Ref<T | null | undefined> = ref()): Ref<T | null | undefined> {
      result.add(refOption as any);

      return refOption;
    },
  });
}
