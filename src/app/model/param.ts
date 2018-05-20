import { Type } from '@angular/core';

export class Param {
  constructor(readonly name: string, readonly description: string, readonly type: Type<any>, readonly options: string[]) {}
}
