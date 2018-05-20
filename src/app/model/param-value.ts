import { Param } from './param';

export class ParamValue {
  value: any;
  constructor(readonly definition: Param) {
  }
}
