import { Adjustable } from './adjustable';
import { Test } from '../../model/runing/test';

export abstract class FinishPanel extends Adjustable {
      static typeOfAdjustable = 'FinishPanel';

  test: Test;
}
