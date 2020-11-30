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
    if (element.complete && (!IS_IE || !!element.naturalWidth)) {
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
