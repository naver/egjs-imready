import { ImReadyProps } from "./types";
import { useImReady } from "./useImReady";


/**
 * Vue hook to check if the images or videos are loaded. (only `useReady` and `useError` are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 vue hook.(`useReady`와 `useError`만 true)
 * @memberof Vue2ImReady
 * @param - Vue ImReady's props <ko>Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { useReady } from "@egjs/vue2-imready";
 *
 * setup() {
 *   const im = useReady({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *      container: im.register(),
 *   }
 * }
 * // {{im.isReady}}
 * // &lt;div v-bind:ref="container"&gt;&lt;/div&gt;
 * ```
 */
export function useReady(props: Partial<ImReadyProps> = {}) {
    return useImReady({
        usePreReadyElement: false,
        usePreReady: false,
        useReadyElement: false,
        ...props,
    });
}
