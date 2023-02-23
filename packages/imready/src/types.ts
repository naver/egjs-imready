/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import Component, { ComponentEvent } from "@egjs/component";
import Loader from "./loaders/Loader";

/**
 * @memberof eg.ImReady
 * @typedef
 * @property - Prefix for data size attribute. <ko> 데이터 사이즈 속성의 접두사.</ko>
 * @property - The loader class map that determines how to ready for the element. <ko>element에 대해 어떻게 준비할지 결정하는 loader 클래스 맵.</ko>
 */
export interface ImReadyOptions {
  prefix: string;
  loaders: Record<string, new (target: HTMLElement, options: ImReadyLoaderOptions) => Loader>;
}

export interface ImReadyLoaderInterface extends Component<{ [key: string]: any }> {
  check(): boolean;
}
/**
 * @memberof eg.ImReady
 * @typedef
 * @property - Prefix for data size attribute. <ko> 데이터 사이즈 속성의 접두사.</ko>
 */
export interface ImReadyLoaderOptions {
  prefix: string;
}

export interface ElementInfo {
  element: HTMLElement;
  loader: Loader | null;
  hasError: boolean;
  isPreReady: boolean;
  hasLoading: boolean;
  isReady: boolean;
  isSkip: boolean;
}

export interface AutoSizerElement extends HTMLElement {
  __PREFIX__?: string;
}

export interface ArrayFormat<T> {
  [index: number]: T;
  length: number;
}

/**
 * @typedef
 * @memberof eg.ImReady
 * @extends eg.ImReady.ImReadyOptions
 * @deprecated
 * @property - Find the children of the element registered with the `register` function through the selector. (default: "") <ko>selector를 통해 `register` 함수로 등록한 엘리먼트의 children을를 찾는다. (default: "")</ko>
 * @property - Whether to use the `readyElement` event. You can use the `readyCount`, `isPreReadyOver` value. (default: true) <ko>`readyElement` 이벤트를 사용할지 여부. `readyCount`, `isPreReadyOver` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `preReadyElement` event. You can use the `preReadyCount` value. (default: true) <ko>`preReadyElement` 이벤트를 사용할지 여부. `preReadyCount` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `ready` event. You can use the `isReady` value. (default: true) <ko>`ready` 이벤트를 사용할지 여부. `isReady` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `preReady` event. You can use the `isPreReady` value. (default: true) <ko>`preReady` 이벤트를 사용할지 여부. `isPreReady` 값을 사용할 수 있다. (default: true)</ko>
 * @property - Whether to use the `error` event. You can use the `hasError`, `errorCount`, `totalErrorCount` value. (default: true) <ko>`error` 이벤트를 사용할지 여부. `hasError`, `errorCount`, `totalErrorCount` 값을 사용할 수 있다. (default: true)</ko>
 */
 export interface ImReadyHooksProps extends ImReadyOptions {
  selector: string;
  useReadyElement: boolean;
  useReady: boolean;
  usePreReadyElement: boolean;
  usePreReady: boolean;
  useError: boolean;
}

/**
 * @typedef
 * @memberof eg.ImReady
 * @extends eg.ImReady.ImReadyOptions
 */
 export interface ImReadyReactiveProps extends ImReadyOptions {
  /**
   * Find the children of the element registered with the `register` function through the selector.
   * @ko selector를 통해 `register` 함수로 등록한 엘리먼트의 children을 찾는다.</ko>
   * @default ""
   */
  selector: string;
  /**
   * @deprecated
   */
  useReadyElement: boolean;
  /**
   * @deprecated
   */
  useReady: boolean;
  /**
   * @deprecated
   */
  usePreReadyElement: boolean;
  /**
   * @deprecated
   */
  usePreReady: boolean;
  /**
   * @deprecated
   */
  useError: boolean;
}

/**
 * @typedef
 * @memberof eg.ImReady
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
 export interface ImReadyHooksValue {
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
 * @memberof eg.ImReady
 * @typedef
 * @property - The element with error images. <ko>오류난 이미지가 있는 엘리먼트.</ko>
 * @property - The item's index with error images. <ko>오류난 이미지가 있는 엘리먼트의 인덱스.</ko>
 * @property - Error image target in element. <ko>엘리먼트의 오류난 이미지 타겟.</ko>
 * @property - The number of elements with errors. <ko>에러가 있는 엘리먼트들의 개수.</ko>
 * @property - The total number of targets with errors. <ko>에러가 있는 타겟들의 총 개수.</ko>
 */
export interface OnError extends ComponentEvent {
  element: HTMLElement;
  index: number;
  target: HTMLElement;
  errorCount: number;
  totalErrorCount: number;
}

/**
 * @memberof eg.ImReady
 * @typedef
 * @property - The pre-ready element. <ko>사전 준비된 엘리먼트.</ko>
 * @property - The index of the pre-ready element. <ko>사전 준비된 엘리먼트의 인덱스.</ko>
 * @property - Number of elements pre-ready. <ko>사전 준비된 엘리먼트들의 개수.</ko>
 * @property - Number of elements ready. <ko>준비된 엘리먼트들의 개수.</ko>
 * @property - Total number of elements. <ko>엘리먼트들의 총 개수.</ko>
 * @property - Whether all elements are pre-ready. <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부.</ko>
 * @property - Whether all elements are ready. <ko>모든 엘리먼트가 준비가 끝났는지 여부.</ko>
 * @property - Whether the loading attribute has been applied. <ko>loading 속성이 적용되었는지 여부.</ko>
 * @property - Whether the check is omitted due to skip attribute. <ko>skip 속성으로 인하여 체크가 생략됐는지 여부.</ko>
 */
export interface OnPreReadyElement extends ComponentEvent {
  element: HTMLElement;
  index: number;

  preReadyCount: number;
  readyCount: number;
  totalCount: number;

  hasLoading: boolean;
  isPreReady: boolean;
  isReady: boolean;

  isSkip: boolean;
}

/**
 * @memberof eg.ImReady
 * @typedef
 * @property - The ready element.<ko>준비된 엘리먼트</ko>
 * @property - The index of the ready element. <ko>준비된 엘리먼트의 인덱스</ko>
 * @property - Whether there is an error in the element <ko>해당 엘리먼트에 에러가 있는지 여부</ko>
 * @property - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
 * @property - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
 * @property - Number of elements pre-ready <ko>사전 준비된 엘리먼트들의 개수</ko>
 * @property - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
 * @property - Total number of elements <ko>엘리먼트들의 총 개수</ko>
 * @property - Whether all elements are pre-ready <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부</ko>
 * @property - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
 * @property - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
 * @property - Whether pre-ready is over <ko>사전 준비가 끝났는지 여부</ko>
 * @property - Whether the check is omitted due to skip attribute <ko>skip 속성으로 인하여 체크가 생략됐는지 여부</ko>
 */
export interface OnReadyElement extends ComponentEvent {
  element: HTMLElement;
  index: number;

  preReadyCount: number;
  readyCount: number;
  errorCount: number;
  totalErrorCount: number;
  totalCount: number;

  hasLoading: boolean;
  isPreReady: boolean;
  isReady: boolean;

  hasError: boolean;
  isPreReadyOver: boolean;
  isSkip: boolean;
}

/**
 * @memberof eg.ImReady
 * @typedef
 * @property - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
 * @property - Total number of elements <ko>엘리먼트들의 총 개수</ko>
 * @property - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
 * @property - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
 */
export interface OnPreReady extends ComponentEvent {
  readyCount: number;
  totalCount: number;
  isReady: boolean;
  hasLoading: boolean;
}

/**
 * @memberof eg.ImReady
 * @typedef
 * @property - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
 * @property - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
 * @property - Total number of elements <ko>엘리먼트들의 총 개수</ko>
 */
export interface OnReady extends ComponentEvent {
  errorCount: number;
  totalErrorCount: number;
  totalCount: number;
}

/**
 * @memberof eg.ImReady
 * @typedef
 */
export interface ImReadyEvents {
  preReadyElement: OnPreReadyElement;
  readyElement: OnReadyElement;
  error: OnError;
  preReady: OnPreReady;
  ready: OnReady;
}

export interface ImReadyReactiveState {
  readonly preReadyCount: number;
  readonly readyCount: number;
  readonly errorCount: number;
  readonly totalErrorCount: number;
  readonly totalCount: number;
  readonly isPreReady: boolean;
  readonly isReady: boolean;
  readonly hasError: boolean;
  readonly isPreReadyOver: boolean;
}

/**
 * @memberof eg.ImReady
 * @typedef
 */
export interface OnLoaderError {
  element: HTMLElement;
  target: HTMLElement;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export interface OnLoaderPreReady {
  element: HTMLElement;
  hasLoading: boolean;
  isSkip: boolean;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export interface OnLoaderReady {
  element: HTMLElement;
  withPreReady: boolean;
  hasLoading: boolean;
  isSkip: boolean;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export interface ImReadyLoaderEvents {
  error: OnLoaderError;
  ready: OnLoaderReady;
  preReady: OnLoaderPreReady;
  [key: string]: any;
}
