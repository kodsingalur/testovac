import { Adjustable } from './adjustable';
import { QuestionDefinition } from '../question-definition';
import { Exercise } from '../runing/exercise';
import { Question } from '../runing/question';
import { TaskDefinition } from '../task-definition';

export abstract class TasksApproach extends Adjustable {
      static typeOfAdjustable = 'TasksApproach';

  abstract getForQuestion(question: Question): TaskDefinition;
  abstract getForExercise(exercise: Exercise): TaskDefinition;
}
