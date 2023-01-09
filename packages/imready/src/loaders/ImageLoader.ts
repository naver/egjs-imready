/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import { IS_IE } from "../consts";
import Loader from "./Loader";

export default class ImageLoader extends Loader<HTMLImageElement> {
  public static EVENTS = ["load", "error"];
  public checkElement() {
    const element = this.element;
    const src = element.getAttribute("src");

    if (element.complete) {
      if (src) {
        // complete
        if (!element.naturalWidth) {
          this.onAlreadyError(element);
        }
        return false;
      } else {
        // Using an external lazy loading module
        this.onAlreadyPreReady();
      }
    }
    this.addEvents();
    IS_IE && element.setAttribute("src", src!);
    return true;
  }
}
