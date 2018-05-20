import { Adjustable } from './adjustable';
import { Test } from '../../model/runing/test';

export abstract class ExercisesApproach extends Adjustable {
  test: Test;
  abstract nextExercise();
// metody run, check
}
