/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import Component from "@egjs/component";
import { addAutoSizer, removeAutoSizer } from "../AutoSizer";
import { ImReadyLoaderEvents, ImReadyLoaderOptions } from "../types";
import { removeEvent, hasSizeAttribute, hasLoadingAttribute, addEvent } from "../utils";


export default abstract class Loader<T extends HTMLElement = any> extends Component<ImReadyLoaderEvents> {
  public static EVENTS: string[] = [];
  public options!: ImReadyLoaderOptions;
  public isReady = false;
  public isPreReady = false;
  public hasDataSize = false;
  public hasLoading = false;
  public abstract checkElement(): boolean;
  protected element!: T;

  constructor(element: HTMLElement, options: Partial<ImReadyLoaderOptions> = {}) {
    super();
    this.options = {
      prefix: "data-",
      ...options,
    };
    this.element = element as T;
    this.hasDataSize = hasSizeAttribute(this.element, this.options.prefix);
    this.hasLoading = hasLoadingAttribute(this.element);
  }
  public check() {
    if (!this.checkElement()) {
      // I'm Ready
      this.onAlreadyReady(true);
      return false;
    }

    if (this.hasDataSize) {
      addAutoSizer(this.element, this.options.prefix);
    }
    if (this.hasDataSize || this.hasLoading) {
      // I'm Pre Ready
      this.onAlreadyPreReady();
    }
    // Wati Pre Ready, Ready
    return true;
  }
  public addEvents() {
    const element = this.element;
    (this.constructor as typeof Loader).EVENTS.forEach(name => {
      addEvent(element, name, this.onCheck);
    });
  }
  public destroy() {
    const element = this.element;
    (this.constructor as typeof Loader).EVENTS.forEach(name => {
      removeEvent(element, name, this.onCheck);
    });
    this.removeAutoSizer();
  }
  public removeAutoSizer() {
    if (this.hasDataSize) {
      // I'm already ready.
      const { prefix } = this.options;

      removeAutoSizer(this.element, prefix);
    }
  }
  public onCheck = (e?: Event) => {
    this.destroy();


    if (e && e.type === "error") {
      this.onError(this.element);
    }
    // I'm pre-ready and ready!
    const withPreReady = !this.hasDataSize && !this.hasLoading;

    this.onReady(withPreReady);
  };
  public onError(target: HTMLElement) {
    this.trigger("error", {
      element: this.element,
      target: target,
    });
  }
  public onPreReady() {
    if (this.isPreReady) {
      return;
    }
    this.isPreReady = true;
    this.trigger("preReady", {
      element: this.element,
      hasLoading: this.hasLoading,
    });
  }
  public onReady(withPreReady: boolean) {
    if (this.isReady) {
      return;
    }
    if (withPreReady) {
      this.isPreReady = true;
    }
    this.removeAutoSizer();
    this.isReady = true;
    this.trigger("ready", {
      element: this.element,
      withPreReady,
      hasLoading: this.hasLoading,
    });
  }
  public onAlreadyError(target: HTMLElement) {
    setTimeout(() => {
      this.onError(target);
    });
  }
  public onAlreadyPreReady() {
    setTimeout(() => {
      this.onPreReady();
    });
  }
  public onAlreadyReady(withPreReady: boolean) {
    setTimeout(() => {
      this.onReady(withPreReady);
    });
  }
}
