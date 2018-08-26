import { ExercisesApproach } from 'app/model/adjustable/exercises-approach';

export class RightOne extends ExercisesApproach {
  static nameDef = 'Right one';
  static description: string;
  constructor() {
    super();
  }
  nextExercise() {
    return this.test.definition.exercises[0];
  }
}
