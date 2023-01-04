/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import Loader from "./Loader";

export default class VideoLoader extends Loader<HTMLVideoElement> {
  public static EVENTS = ["loadedmetadata", "error"];
  public checkElement() {
    const element = this.element;
    // HAVE_NOTHING: 0, no information whether or not the audio/video is ready
    // HAVE_METADATA: 1, HAVE_METADATA - metadata for the audio/video is ready
    // HAVE_CURRENT_DATA: 2, data for the current playback position is available, but not enough data to play next frame/millisecond
    // HAVE_FUTURE_DATA: 3, data for the current and at least the next frame is available
    // HAVE_ENOUGH_DATA: 4, enough data available to start playing
    if (element.readyState >= 1) {
      return false;
    }
    if (element.error) {
      this.onAlreadyError(element);
      return false;
    }
    this.addEvents();
    return true;
  }
}
