/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import { IS_IE } from "../consts";
import Loader from "./Loader";

export default class ImageLoader extends Loader<HTMLImageElement> {
  public static EVENTS = ["load", "error"];
  public isPreReady() {
    const element = this.element;
    return element.complete && (!IS_IE || (IS_IE && !!element.naturalWidth));
  }
  public checkElement() {
    const element = this.element;
    if (this.isPreReady()) {
      if (!element.naturalWidth) {
        this.onAlreadyError(this.element);
      }
      return false;
    }
    this.addEvents();
    IS_IE && element.setAttribute("src", element.getAttribute("src") as string);
    return true;
  }
}
