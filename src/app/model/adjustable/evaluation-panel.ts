import { Adjustable } from './adjustable';
import { Test } from '../../model/running/test';
import { Answer } from '../../model/running/answer';
import { Exercise } from '../running/exercise';

export abstract class EvaluationPanel extends Adjustable {
    static typeOfAdjustable = 'EvaluationPanel';

  test: Test;
  abstract refresh(exercise: Exercise);
}
