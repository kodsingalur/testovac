import { TasksApproach } from '../../../model/abstract/tasks-approach';
import { QuestionDefinition } from '../../../model/question-definition';
import { Question} from '../../../model/runing/question';
import { Exercise} from '../../../model/runing/exercise';

import { TaskDefinition } from '../../../model/task-definition';

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
