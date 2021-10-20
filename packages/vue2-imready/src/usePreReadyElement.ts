import { ImReadyProps } from "./types";
import { useImReady } from "./useImReady";


/**
 * Vue hook to check if the images or videos are loaded. (only `usePreReadyElement`, `usePreReady` and `useError` are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 Vue hook.(`usePreReadyElement`, `usePreReady`와 `useError`만 true)
 * @memberof Vue2ImReady
 * @param - Vue ImReady's props <ko>Vue ImReady의 props.</ko>
 * @example
 * ```js
 * import { usePreReadyElement } from "@egjs/vue2-imready";
 *
 * setup() {
 *   const im = usePreReadyElement({
 *         selector: "img",
 *     });
 *
 *   return {
 *      im,
 *      container: im.register(),
 *   }
 * }
 * // {{im.preReadyCount}}
 * // &lt;div v-bind:ref="container"&gt;&lt;/div&gt;
 * ```
 */
export function usePreReadyElement(props: Partial<ImReadyProps> = {}) {
    return useImReady({
        useReady: false,
        useReadyElement: false,
        ...props,
    });
}
