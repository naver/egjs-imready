import { ImReadyReactiveProps } from "@egjs/imready";
import { ReactImReadyResult, useImReady } from "./useImReady";

/**
 * React hook to check if the images or videos are loaded. (only `useReadyElement`, `useReady` and `useError` are true) Since this is deprecated, use useImReady instead.
 * @ko 이미지와 비디오들이 로드가 됐는지 체크하는 react hook.(`useReadyElement`, `useReady`와 `useError`만 true) deprecated 되었으므로 useImReady를 이용해주세요.
 * @deprecated
 * @memberof ReactImReady
 * @param - React ImReady's props </ko>React ImReady의 props.</ko>
 * @example
 * ```js
 * import { useReadyElement } from "@egjs/react-imready";
 *
 * function App() {
 *   const {
 *         register,
 *         readyCount,
 *         isReady,
 *         hasError,
 *     } = useReadyElement({
 *         selector: "img",
 *     });
 *     // &lt;div ref={register()}&gt;&lt;/div&gt;
 * }
 * ```
 */
export function useReadyElement(
  props: Partial<ImReadyReactiveProps> = {}
): ReactImReadyResult {
  return useImReady(props);
}
