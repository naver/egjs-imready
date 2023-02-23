import { ImReadyReactiveProps } from "@egjs/imready";
import { ReactImReadyResult, useImReady } from "./useImReady";

/**
 * React hook to check if the images or videos are loaded. (only `usePreReadyElement`, `usePreReady` and `useError` are true)
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 react hook.(`usePreReadyElement`, `usePreReady`와 `useError`만 true)
 * @memberof ReactImReady
 * @param - React ImReady's props </ko>React ImReady의 props.</ko>
 * @example
 * ```js
 * import { usePreReadyElement } from "@egjs/react-imready";
 *
 * function App() {
 *   const {
 *         register,
 *         preReadyCount,
 *         isPreReady,
 *         hasError,
 *     } = usePreReadyElement({
 *         selector: "img",
 *     });
 *     // &lt;div ref={register()}&gt;&lt;/div&gt;
 * }
 * ```
 */
export function usePreReadyElement(
  props: Partial<ImReadyReactiveProps> = {}
): ReactImReadyResult {
  return useImReady(props);
}
