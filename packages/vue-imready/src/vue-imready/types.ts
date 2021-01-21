import { ImReadyOptions } from '@egjs/imready';
import { Ref } from 'vue';

/**
 * @typedef
 * @memberof VueImReady
 * @property - Ref function that can register the element to be checked <ko>체크할 엘리먼트를 등록할 수 있는 ref 함수</ko>
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
  register<T extends HTMLElement>(ref?: Ref<T | null> | ((el: T | null) => any)): (el: T | null) => any;
  hasError: boolean;
  errorCount: number;
  totalErrorCount: number;
  preReadyCount: number;
  readyCount: number;
  totalCount: number;
  isPreReady: boolean;
  isReady: boolean;
  isPreReadyOver: boolean;
}
/**
 * @typedef
 * @memberof VueImReady
 * @extends eg.ImReady.ImReadyOptions
 * @property - Find the children of the element registered with the `register` function through the selector. (default: "") <ko>selector를 통해 `register` 함수로 등록한 엘리먼트의 children을를 찾는다. (default: "")</ko>
 * @property - Whether to use the `readyElement` event. You can use the `readyCount`, `isPreReadyOver` value. (default: true) <ko>`readyElement` 이벤트를 사용할지 여부. `readyCount`, `isPreReadyOver` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `preReadyElement` event. You can use the `preReadyCount` value. (default: true) <ko>`preReadyElement` 이벤트를 사용할지 여부. `preReadyCount` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `ready` event. You can use the `isReady` value. (default: true) <ko>`ready` 이벤트를 사용할지 여부. `isReady` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `preReady` event. You can use the `isPreReady` value. (default: true) <ko>`preReady` 이벤트를 사용할지 여부. `isPreReady` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `error` event. You can use the `hasError`, `errorCount`, `totalErrorCount` value. (default: true) <ko>`error` 이벤트를 사용할지 여부. `hasError`, `errorCount`, `totalErrorCount` 값을 사용할 수 있다. (default: true)</ko>
 */
export interface ImReadyProps extends ImReadyOptions {
  selector: string;
  useReadyElement: boolean;
  useReady: boolean;
  usePreReadyElement: boolean;
  usePreReady: boolean;
  useError: boolean;
}
