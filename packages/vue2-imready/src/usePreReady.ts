import { ImReadyProps, ImReadyValue } from "./types";
import { useImReady } from "./useImReady";


/**
 * Vue hook to check if the images or videos are loaded. (only usePreReady and useError are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Vue hook.(usePreReady와 useError만 true)
 * @memberof VueImReady
 * @param - Vue ImReady's props <ko>Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { usePreReady } from "@egjs/vue-imready";
 *
 * setup() {
 *   const im = usePreReady({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *   }
 * }
 * // {{im.isPreReady}}
 * // &lt;div v-bind:ref="im.register()"&gt;&lt;/div&gt;
 * ```
 */
export function usePreReady(props: Partial<ImReadyProps> = {}): ImReadyValue {
    return useImReady({
        usePreReadyElement: false,
        useReadyElement: false,
        useReady: false,
        ...props,
    });
}
