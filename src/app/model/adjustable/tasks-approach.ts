import { Adjustable } from './adjustable';
import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { Exercise } from 'app/model/running/exercise';
import { Question } from 'app/model/running/question';
import { Test } from 'app/model/running/test';
import { TaskDefinition } from 'app/model/definitions/task-definition';
import { ExerciseDefinition } from 'app/model/definitions/exercise-definition';

export abstract class TasksApproach extends Adjustable {
      static typeOfAdjustable = 'TasksApproach';

  abstract getForTest(test: Test, exerciseDefinition: ExerciseDefinition): TaskDefinition;
  abstract getForQuestion(question: Question): TaskDefinition;
  abstract getForExercise(exercise: Exercise): TaskDefinition;
}
