/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import Component, { ComponentEvent } from "@egjs/component";
import { ElementLoader } from "./loaders/ElementLoader";
import { ArrayFormat, ElementInfo, ImReadyEvents, ImReadyLoaderOptions, ImReadyOptions } from "./types";
import { toArray, getContentElements, hasLoadingAttribute } from "./utils";
/**
 * @alias eg.ImReady
 * @extends eg.Component
 */
class ImReadyManager extends Component<ImReadyEvents> {
  public options!: ImReadyOptions;
  private readyCount = 0;
  private preReadyCount = 0;
  private totalCount = 0;
  private totalErrorCount = 0;
  private isPreReadyOver = true;
  private elementInfos: ElementInfo[] = [];
  /**
   * @param - ImReady's options
   */
  constructor(options: Partial<ImReadyOptions> = {}) {
    super();
    this.options = {
      loaders: {},
      prefix: "data-",
      ...options,
    };
  }
  /**
   * Checks whether elements are in the ready state.
   * @ko 엘리먼트가 준비 상태인지 체크한다.
   * @elements - Elements to check ready status. <ko> 준비 상태를 체크할 엘리먼트들.</ko>
   * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReadyElement: e => {
     *     // 1, 3
     *     // 2, 3
     *     // 3, 3
     *     console.log(e.preReadyCount, e.totalCount),
     *   },
     * });
     * ```
   */
  public check(elements: ArrayFormat<HTMLElement>): this {
    const { prefix } = this.options;

    this.clear();
    this.elementInfos = toArray(elements).map((element, index) => {
      const loader = this.getLoader(element, { prefix });

      loader.check();
      loader.on("error", e => {
        this.onError(index, e.target);
      }).on("preReady", e => {
        const info = this.elementInfos[index];

        info.hasLoading = e.hasLoading;
        info.isSkip = e.isSkip;
        const isPreReady = this.checkPreReady(index);

        this.onPreReadyElement(index);

        isPreReady && this.onPreReady();
      }).on("ready", ({ withPreReady, hasLoading, isSkip }) => {
        const info = this.elementInfos[index];

        info.hasLoading = hasLoading;
        info.isSkip = isSkip;

        const isPreReady = withPreReady && this.checkPreReady(index);
        const isReady = this.checkReady(index);

        // Pre-ready and ready occur simultaneously
        withPreReady && this.onPreReadyElement(index);
        this.onReadyElement(index);

        isPreReady && this.onPreReady();
        isReady && this.onReady();
      });

      return {
        loader,
        element,
        hasLoading: false,
        hasError: false,
        isPreReady: false,
        isReady: false,
        isSkip: false,
      };
    });

    const length = this.elementInfos.length;

    this.totalCount = length;
    if (!length) {
      setTimeout(() => {
        this.onPreReady();
        this.onReady();
      });
    }
    return this;
  }
  /**
   * Gets the total count of elements to be checked.
   * @ko 체크하는 element의 총 개수를 가져온다.
   */
  public getTotalCount() {
    return this.totalCount;
  }
  /**
   * Whether the elements are all pre-ready. (all sizes are known)
   * @ko 엘리먼트들이 모두 사전 준비가 됐는지 (사이즈를 전부 알 수 있는지) 여부.
   */
  public isPreReady() {
    return this.elementInfos.every(info => info.isPreReady);
  }
  /**
   * Whether the elements are all ready.
   * @ko 엘리먼트들이 모두 준비가 됐는지 여부.
   */
  public isReady() {
    return this.elementInfos.every(info => info.isReady);
  }
  /**
   * Whether an error has occurred in the elements in the current state.
   * @ko 현재 상태에서 엘리먼트들이 에러가 발생했는지 여부.
   */
  public hasError() {
    return this.totalErrorCount > 0;
  }
  /**
   * Clears events of elements being checked.
   * @ko 체크 중인 엘리먼트들의 이벤트를 해제 한다.
   */
  public clear() {
    this.isPreReadyOver = false;
    this.totalCount = 0;
    this.preReadyCount = 0;
    this.readyCount = 0;
    this.totalErrorCount = 0;
    this.elementInfos.forEach(info => {
      if (info.loader) {
        info.loader.destroy();
      }
    });
    this.elementInfos = [];
  }
  /**
   * Destory all events.
   * @ko 모든 이벤트를 해제 한다.
   */
  public destroy() {
    this.clear();
    this.off();
  }
  private getLoader(element: HTMLElement, options: ImReadyLoaderOptions) {
    const tagName = element.tagName.toLowerCase();
    const loaders = this.options.loaders;
    const prefix = options.prefix;
    const tags = Object.keys(loaders);

    if (loaders[tagName]) {
      return new loaders[tagName](element, options);
    }
    const loader = new ElementLoader(element, options);
    const children = toArray(element.querySelectorAll<HTMLElement>(tags.join(", ")));

    loader.setHasLoading(children.some(el => hasLoadingAttribute(el, prefix)));
    let withPreReady = false;

    const childrenImReady = this.clone().on("error", e => {
      loader.onError(e.target);
    }).on("ready", () => {
      loader.onReady(withPreReady);
    });

    loader.on("requestChildren", () => {
      // has not data size
      const contentElements = getContentElements(element, tags, this.options.prefix);

      childrenImReady.check(contentElements).on("preReady", e => {
        withPreReady = e.isReady;
        if (!withPreReady) {
          loader.onPreReady();
        }
      });
    }).on("reqeustReadyChildren", () => {
      // has data size
      // loader call preReady
      // check only video, image elements
      childrenImReady.check(children);
    }).on("requestDestroy", () => {
      childrenImReady.destroy();
    });

    return loader;
  }
  private clone() {
    return new ImReadyManager({ ...this.options });
  }
  private checkPreReady(index: number) {
    this.elementInfos[index].isPreReady = true;
    ++this.preReadyCount;


    if (this.preReadyCount < this.totalCount) {
      return false;
    }
    return true;
  }
  private checkReady(index: number) {
    this.elementInfos[index].isReady = true;
    ++this.readyCount;

    if (this.readyCount < this.totalCount) {
      return false;
    }
    return true;
  }


  private onError(index: number, target: HTMLElement) {
    const info = this.elementInfos[index];

    info.hasError = true;
    /**
     * An event occurs if the image, video fails to load.
     * @ko 이미지, 비디오가 로딩에 실패하면 이벤트가 발생한다.
     * @event eg.ImReady#error
     * @param {eg.ImReady.OnError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg"/>
     *    <img src="ERR"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check([document.querySelector("div")]).on({
     *   error: e => {
     *     // <div>...</div>, 0, <img src="ERR"/>
     *     console.log(e.element, e.index, e.target),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent("error", {
      element: info.element,
      index,
      target,
      errorCount: this.getErrorCount(),
      totalErrorCount: ++this.totalErrorCount,
    }));
  }
  private onPreReadyElement(index: number) {
    const info = this.elementInfos[index];
    /**
     * An event occurs when the element is pre-ready (when the loading attribute is applied or the size is known)
     * @ko 해당 엘리먼트가 사전 준비되었을 때(loading 속성이 적용되었거나 사이즈를 알 수 있을 때) 이벤트가 발생한다.
     * @event eg.ImReady#preReadyElement
     * @param {eg.ImReady.OnPreReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReadyElement: e => {
     *     // 1, 3
     *     // 2, 3
     *     // 3, 3
     *     console.log(e.preReadyCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent("preReadyElement", {
      element: info.element,
      index,

      preReadyCount: this.preReadyCount,
      readyCount: this.readyCount,
      totalCount: this.totalCount,

      isPreReady: this.isPreReady(),
      isReady: this.isReady(),
      hasLoading: info.hasLoading,
      isSkip: info.isSkip,
    }));
  }
  private onPreReady() {
    this.isPreReadyOver = true;
    /**
     * An event occurs when all element are pre-ready (When all elements have the loading attribute applied or the size is known)
     * @ko 모든 엘리먼트들이 사전 준비된 경우 (모든 엘리먼트들이 loading 속성이 적용되었거나 사이즈를 알 수 있는 경우) 이벤트가 발생한다.
     * @event eg.ImReady#preReady
     * @param {eg.ImReady.OnPreReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReady: e => {
     *     // 0, 3
     *     console.log(e.readyCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent("preReady", {
      readyCount: this.readyCount,
      totalCount: this.totalCount,
      isReady: this.isReady(),
      hasLoading: this.hasLoading(),
    }));
  }
  private onReadyElement(index: number) {
    const info = this.elementInfos[index];
    /**
     * An event occurs when the element is ready
     * @ko 해당 엘리먼트가 준비가 되었을 때 이벤트가 발생한다.
     * @event eg.ImReady#readyElement
     * @param {eg.ImReady.OnReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   readyElement: e => {
     *     // 1, 0, false, 3
     *     // 2, 1, false, 3
     *     // 3, 2, true, 3
     *     console.log(e.readyCount, e.index, e.hasError, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent("readyElement", {
      index,
      element: info.element,

      hasError: info.hasError,
      errorCount: this.getErrorCount(),
      totalErrorCount: this.totalErrorCount,

      preReadyCount: this.preReadyCount,
      readyCount: this.readyCount,
      totalCount: this.totalCount,

      isPreReady: this.isPreReady(),
      isReady: this.isReady(),

      hasLoading: info.hasLoading,
      isPreReadyOver: this.isPreReadyOver,
      isSkip: info.isSkip,
    }));
  }
  private onReady() {
    /**
     * An event occurs when all element are ready
     * @ko 모든 엘리먼트들이 준비된 경우 이벤트가 발생한다.
     * @event eg.ImReady#ready
     * @param {eg.ImReady.OnReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
     * @example
     * ```html
     * <div>
     *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
     *    <img src="./2.jpg" data-width="1280" data-height="853"/>
     *    <img src="ERR" data-width="1280" data-height="853"/>
     * </div>
     * ```
     * ## Javascript
     * ```js
     * import ImReady from "@egjs/imready";
     *
     * const im = new ImReady(); // umd: eg.ImReady
     * im.check(document.querySelectorAll("img")).on({
     *   preReady: e => {
     *     // 0, 3
     *     console.log(e.readyCount, e.totalCount),
     *   },
     *   ready: e => {
     *     // 1, 3
     *     console.log(e.errorCount, e.totalCount),
     *   },
     * });
     * ```
     */
    this.trigger(new ComponentEvent("ready", {
      errorCount: this.getErrorCount(),
      totalErrorCount: this.totalErrorCount,
      totalCount: this.totalCount,
    }));
  }
  private getErrorCount() {
    return this.elementInfos.filter(info => info.hasError).length;
  }
  private hasLoading() {
    return this.elementInfos.some(info => info.hasLoading);
  }
}

export default ImReadyManager;
