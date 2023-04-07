import { REACTIVE_IMREADY } from '@egjs/imready';
import { AngularReactiveAdapterResult } from '@cfcs/angular';


export class NgxImReadyInterface { }

// automatic reactive state, methods types
export interface NgxImReadyInterface
  extends AngularReactiveAdapterResult<typeof REACTIVE_IMREADY> { }
