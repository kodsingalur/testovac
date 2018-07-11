import { Type } from '@angular/core';
import { Param } from './param';
import { ParamValue } from './param-value';

import { Adjustable } from './abstract/adjustable';
import { TestovacModel } from './TestovacModel';

export class AdjustableDefinition<T>  {
  params: ParamValue[] = [];
  constructor(public type: Type<T>) {
  }

  getOrCreateParam(definition: Param) {
    for (let i = 0; i < this.params.length; i++) {
      if (definition.name === this.params[i].definition.name) {
        return this.params[i];
      }
    }

    const param = new ParamValue(definition);
    this.params.push(param);
    return param;
  }
}
