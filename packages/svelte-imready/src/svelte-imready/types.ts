import type { ImReadyHooksProps } from "@egjs/imready";
import type { Writable } from "svelte/store";

/**
 * @typedef
 * @memberof SvelteImReady
 * @property - Ref function that can register the element to be checked <ko>체크할 엘리먼트를 등록할 수 있는 svelte directive</ko>
 * @property - Whether there is an error in the element <ko>해당 엘리먼트에 에러가 있는지 여부</ko>
 * @property - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
 * @property - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
 * @property - Number of elements pre-ready <ko>사전 준비된 엘리먼트들의 개수</ko>
 * @property - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
 * @property - Total number of elements <ko>엘리먼트들의 총 개수</ko>
 * @property - Whether all elements are pre-ready <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부</ko>
 * @property - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
 * @property - Whether pre-ready is over <ko>사전 준비가 끝났는지 여부</ko>
 */
export interface ImReadyValue {
  register(element: HTMLElement): any;
  hasError: Writable<boolean>;
  errorCount: Writable<number>;
  totalErrorCount: Writable<number>;
  preReadyCount: Writable<number>;
  readyCount: Writable<number>;
  totalCount: Writable<number>;
  isPreReady: Writable<boolean>;
  isReady: Writable<boolean>;
  isPreReadyOver: Writable<boolean>;
}
/**
 * @typedef
 * @memberof SvelteImReady
 * @extends eg.ImReady.ImReadyHooksProps
 */
export interface ImReadyProps extends ImReadyHooksProps {
}
