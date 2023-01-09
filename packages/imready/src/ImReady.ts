/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import ImReadyManager from "./ImReadyManager";
import ImageLoader from "./loaders/ImageLoader";
import VideoLoader from "./loaders/VideoLoader";
import { ImReadyOptions } from "./types";

class ImReady extends ImReadyManager {
  constructor(options: Partial<ImReadyOptions> = {}) {
    super({
      loaders: {
        img: ImageLoader,
        video: VideoLoader,
      },
      ...options,
    });
  }
}

export default ImReady;
