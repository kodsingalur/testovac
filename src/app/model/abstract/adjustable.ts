import { Param } from '../param';
import { ParamValue } from '../param-value';

export abstract class Adjustable {
  static nameDef: string;
  static description: string;
  static params: Param[];
  static typeOfAdjustable;

  paramValues: ParamValue[];
  getName() {
    return Adjustable.nameDef;
  }

  getParamValue(name: string) {
    for (let i = 0; i < this.paramValues.length; i++) {
      if (name === this.paramValues[i].definition.name) {
        return this.paramValues[i].value;
      }
    }
  }
}
