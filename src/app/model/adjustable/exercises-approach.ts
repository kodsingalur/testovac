import { Adjustable } from './adjustable';
import { Test } from '../../model/runing/test';

export abstract class ExercisesApproach extends Adjustable {
    static typeOfAdjustable = 'ExercisesApproach';

  test: Test;
  abstract nextExercise();
// metody run, check
}
