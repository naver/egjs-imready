import { ImReadyProps, ImReadyValue } from "./types";
import { useImReady } from "./useImReady";


/**
 * Svelte hook to check if the images or videos are loaded. (only usePreReady and useError are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 svelte hook.(usePreReady와 useError만 true)
 * @memberof SvelteImReady
 * @param - Svelte ImReady's props </ko>Svelte ImReady의 props.</ko>
 * @example
 * ```js
 * import { usePreReady } from "@egjs/svelte-imready";
 *
 * const {
 *     register,
 *     isPreReady,
 *     hasError,
 * } = usePreReady({
 *     selector: "img",
 * });
 * // &lt;div use:register&gt;&lt;/div&gt;
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
