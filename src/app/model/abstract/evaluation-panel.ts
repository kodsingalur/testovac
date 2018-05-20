import { Adjustable } from './adjustable';
import { Test } from '../../model/runing/test';
import { Answer } from '../../model/runing/answer';
import { Exercise } from '../runing/exercise';

export abstract class EvaluationPanel extends Adjustable {
  test: Test;
  abstract refresh(exercise: Exercise);
}
