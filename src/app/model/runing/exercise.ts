import { ExerciseDefinition } from '../exercise-definition';
import { TaskDefinition } from '../task-definition';
import { Question } from './question';
import { Test } from './test';

export class Exercise {
  test: Test;
  task: TaskDefinition;
  definition: ExerciseDefinition;
  questions: Question[] = [];
  onAnswered;

  private _answered: boolean;

  get answered(): boolean{
    return this._answered;
  }
  set answered(value: boolean){
    this._answered = value;
    if (this.onAnswered) {
      this.test.evalPanel.refresh(this);
      this.onAnswered();
    }

  }
}
