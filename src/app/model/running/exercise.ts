import { Changeable } from '../changeable/changeable';
import { ExerciseDefinition } from 'app/model/definitions/exercise-definition';
import { TaskDefinition } from 'app/model/definitions/task-definition';
import { Question } from './question';
import { Test } from './test';

export class Exercise extends Changeable {
  test: Test;
  task: TaskDefinition;
  definition: ExerciseDefinition;
  questions: Question[] = [];

  private _answered: boolean;

  get answered(): boolean{
    return this._answered;
  }
  set answered(answered: boolean){
    this.onChange('right', this._answered, answered);
    this._answered = answered;
  }
}
