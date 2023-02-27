import { ImReadyReactiveProps, ImReadyHooksValue, ImReadyOptions } from '@egjs/imready';
import { Ref } from 'vue';

/**
 * @typedef
 * @memberof VueImReady
 * @extends eg.ImReadyHooksValue
 * @property - Ref function that can register the element to be checked <ko>체크할 엘리먼트를 등록할 수 있는 ref 함수</ko>
 */
export interface ImReadyValue extends ImReadyHooksValue {
  register<T extends HTMLElement>(ref?: Ref<T | null> | ((el: T | null) => any)): (el: T | null) => any;
}

/**
 * @typedef
 * @memberof VueImReady
 * @extends eg.ImReady.ImReadyReactiveProps
 */
export interface ImReadyProps extends ImReadyReactiveProps {
}
