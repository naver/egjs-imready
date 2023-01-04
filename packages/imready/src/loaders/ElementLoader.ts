/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import { addAutoSizer } from "../AutoSizer";
import { ImReadyLoaderOptions } from "../types";
import Loader from "./Loader";


export class ElementLoader<T extends HTMLElement> extends Loader<T> {
  public static EVENTS: string[] = [];
  public options!: ImReadyLoaderOptions;

  public setHasLoading(hasLoading: boolean) {
    this.hasLoading = hasLoading;
  }
  public check() {
    if (this.isSkip) {
      // I'm Ready
      this.onAlreadyReady(true);
      return false;
    }

    if (this.hasDataSize) {
      addAutoSizer(this.element, this.options.prefix);
      this.onAlreadyPreReady();
    } else {
      // has not data size
      this.trigger("requestChildren");
    }
    return true;
  }
  public checkElement() {
    return true;
  }
  public destroy() {
    this.clear();
    this.trigger("requestDestroy");
    this.off();
  }
  public onAlreadyPreReady() {
    // has data size
    super.onAlreadyPreReady();
    this.trigger("reqeustReadyChildren");
  }
}
