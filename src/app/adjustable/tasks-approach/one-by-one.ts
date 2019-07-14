import { TasksApproach } from 'app/model/adjustable/tasks-approach';
import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { ExerciseDefinition } from 'app/model/definitions/exercise-definition';
import { Question} from 'app/model/running/question';
import { Exercise} from 'app/model/running/exercise';
import { Test } from 'app/model/running/test';

import { TaskDefinition } from 'app/model/definitions/task-definition';

export class OneByOne extends TasksApproach {
  static nameDef = 'One by one';
  static description: string;
  constructor() {
    super();
  }
  getForQuestion(question: Question): TaskDefinition {
    return this.getForExercise(question.exercise);
  }

  getForTest(test: Test, exerciseDefinition: ExerciseDefinition): TaskDefinition {
    const count = test.countExercises(exerciseDefinition);
    const tasks = exerciseDefinition.tasks;
    if (count < tasks.length) {
      return tasks[count];
    } else {
      test.finish = true;
    }
  }

  getForExercise(exercise: Exercise): TaskDefinition {
    return this.getForTest(exercise.test, exercise.definition);
  }

}
