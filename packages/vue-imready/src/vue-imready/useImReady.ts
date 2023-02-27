import { useLegacyReactive, ReactiveLegacyAdapterResult } from "@cfcs/vue3";
import { ImReadyReactiveProps, REACTIVE_IMREADY } from "@egjs/imready";
import { Ref } from 'vue';

export interface VueImReadyResult extends ReactiveLegacyAdapterResult<typeof REACTIVE_IMREADY> {
  register<T extends HTMLElement>(ref?: Ref<T | null> | ((el: T | null) => any)): (el: T | null) => any;
}

/**
 * Vue hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Vue hook.
 * @memberof VueImReady
 * @param - Vue ImReady's props <ko> Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/vue-imready";
 *
 * setup() {
 *   const im = useImReady({
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
export function useImReady(props: Partial<ImReadyReactiveProps> = {}): VueImReadyResult {
  const result = useLegacyReactive(REACTIVE_IMREADY, () => props);

  return Object.assign(result, {
    register<T extends HTMLElement>(
      ref?: Ref<T | null> | ((el: T | null) => any)
    ): (el: any) => any {
      return (instance: T | null) => {
        if (instance) {
          result.add(instance);
        }
        if (!ref) {
          return;
        }
        if (typeof ref === "function") {
          ref(instance);
        } else {
          ref.value = instance;
        }
      };
    },
  });
}
