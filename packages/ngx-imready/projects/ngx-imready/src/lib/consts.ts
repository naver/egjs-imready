import { EVENTS } from "@egjs/imready";
import { AngularEventsOutputs } from "@cfcs/angular";

// auto
// eslint-disable-next-line max-len
export const ANGULAR_IMREADY_EVENTS = ["ngxPreReadyElement: preReadyElement", "ngxReadyElement: readyElement", "ngxError: error", "ngxPreReady: preReady", "ngxReady: ready"] as AngularEventsOutputs<typeof EVENTS, "ngx", "">;
