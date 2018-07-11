import { ExercisesApproach } from '../../../model/abstract/exercises-approach';

export class RightOne extends ExercisesApproach {
  static typeOfAdjustable = 'ExercisesApproach';
  static nameDef = 'Right one';
  static description: string;
  constructor() {
    super();
  }
  nextExercise() {
    return this.test.definition.exercises[0];
  }
}
