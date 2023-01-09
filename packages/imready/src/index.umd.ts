/*
egjs-imready
Copyright (c) 2020-present NAVER Corp.
MIT license
*/
import ImReady, * as modules from "./index";

for (const name in modules) {
  (ImReady as any)[name] = (modules as any)[name];
}

export default ImReady;
