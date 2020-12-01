/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import Component from "@egjs/component";
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

export interface ImReadyLoaderInterface extends Component {
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
 * @memberof eg.ImReady
 * @typedef
 */
export type OnError = {
  element: HTMLElement;
  index: number;
  target: HTMLElement;
  errorCount: number;
  totalErrorCount: number;
};
export type ReadyElement = {
  preReadyCount: number;
  readyCount: number;
  totalCount: number;
  isPreReady: boolean;
  isReady: boolean;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnPreReadyElement = {
  element: HTMLElement;
  index: number;

  preReadyCount: number;
  readyCount: number;
  totalCount: number;

  hasLoading: boolean;
  isPreReady: boolean;
  isReady: boolean;

  isSkip: boolean;
};

/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnReadyElement = {
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
};

/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnPreReady = {
  readyCount: number;
  totalCount: number;
  isReady: boolean;
  hasLoading: boolean;
};

/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnReady = {
  errorCount: number;
  totalErrorCount: number;
  totalCount: number;
};

/**
 * @memberof eg.ImReady
 * @typedef
 */
export type ImReadyEvents = {
  preReadyElement: OnPreReadyElement;
  readyElement: OnReadyElement;
  error: OnError;
  preReady: OnPreReady;
  ready: OnReady;
}

/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnLoaderError = {
  element: HTMLElement;
  target: HTMLElement;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnLoaderPreReady = {
  element: HTMLElement;
  hasLoading: boolean;
  isSkip: boolean;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export type OnLoaderReady = {
  element: HTMLElement;
  withPreReady: boolean;
  hasLoading: boolean;
  isSkip: boolean;
}
/**
 * @memberof eg.ImReady
 * @typedef
 */
export type ImReadyLoaderEvents = {
  error: OnLoaderError;
  ready: OnLoaderReady;
  preReady: OnLoaderPreReady;
  [key: string]: any;
}
