import { Adjustable } from './adjustable';
import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { Exercise } from 'app/model/runing/exercise';
import { Question } from 'app/model/runing/question';
import { TaskDefinition } from 'app/model/definitions/task-definition';

export abstract class TasksApproach extends Adjustable {
      static typeOfAdjustable = 'TasksApproach';

  abstract getForQuestion(question: Question): TaskDefinition;
  abstract getForExercise(exercise: Exercise): TaskDefinition;
}
