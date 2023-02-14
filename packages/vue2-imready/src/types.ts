import { ImReadyReactiveProps, ImReadyHooksValue } from '@egjs/imready';
import { Ref } from '@vue/composition-api';

/**
 * @typedef
 * @memberof Vue2ImReady
 * @extends eg.ImReady.ImReadyHooksValue
 * @property - Ref function that can register the element to be checked <ko>체크할 엘리먼트를 등록할 수 있는 ref 함수</ko>
 */
export interface ImReadyValue extends ImReadyHooksValue {
  register<T extends HTMLElement>(ref?: Ref<T | null | undefined>): Ref<T | null | undefined>;
}
/**
 * @typedef
 * @memberof Vue2ImReady
 * @extends eg.ImReady.ImReadyReactiveProps
 */
export interface ImReadyProps extends ImReadyReactiveProps {
}
