import { ImReadyHooksProps, REACTIVE_IMREADY } from "@egjs/imready";
import { useReactive, ReactReactiveAdapterResult } from "@cfcs/react";

export interface ReactImReadyResult
  extends ReactReactiveAdapterResult<typeof REACTIVE_IMREADY> {}

/**
 * React hook to check if the images or videos are loaded.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 react hook.
 * @memberof ReactImReady
 * @param - React ImReady's props </ko>React ImReady의 props.</ko>
 * @example
 * ```js
 * import { useImReady } from "@egjs/react-imready";
 *
 * function App() {
 *   const {
 *         register,
 *         isReady,
 *         isPreReady,
 *         preReadyCount,
 *         readyCount,
 *         totalCount,
 *     } = useImReady({
 *         selector: "img",
 *     });
 *     // &lt;div ref={register()}&gt;&lt;/div&gt;
 * }
 * ```
 */
export function useImReady(
  props: Partial<ImReadyHooksProps>
): ReactImReadyResult {
  return useReactive({
    data() {
      return {
        props,
      };
    },
    ...REACTIVE_IMREADY,
  });
}
