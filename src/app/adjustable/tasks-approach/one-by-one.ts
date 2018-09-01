import { TasksApproach } from 'app/model/adjustable/tasks-approach';
import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { Question} from 'app/model/running/question';
import { Exercise} from 'app/model/running/exercise';

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

  getForExercise(exercise: Exercise): TaskDefinition {
    const count = exercise.test.countExercises(exercise.definition);
    const tasks = exercise.definition.tasks;
    if (count < tasks.length) {
      return tasks[count];
    } else {
      exercise.test.finish = true;
    }
  }

}
