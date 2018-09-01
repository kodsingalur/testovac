import { Adjustable } from './adjustable';
import { Test } from '../../model/running/test';

export abstract class FinishPanel extends Adjustable {
      static typeOfAdjustable = 'FinishPanel';

  test: Test;
}
