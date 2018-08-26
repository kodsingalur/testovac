import { TestDefinition } from './test-definition';
import { TasksApproach } from 'app/model/adjustable/tasks-approach';
import { QuestionDefinition } from './question-definition';
import { TaskDefinition } from './task-definition';
import { Content } from './content';
import { Type } from '@angular/core';
import { AdjustableDefinition } from 'app/model/definitions/adjustable-definition';

export class ExerciseDefinition extends Content {
  name: string;
  test: TestDefinition;
  tasksApproach: AdjustableDefinition<TasksApproach>= null;
  questions: QuestionDefinition[] = [];
  tasks: TaskDefinition[] = [];
  /**
   * vrátí poradi tohoto cviceni
   */
  getOrder() {
    return this.test.exercises.indexOf(this);
  }
  /*
   * vytvori definici ukolu a spoji ji s cvicenim
   */
  createTask() {
    const task = new TaskDefinition();
    task.exercise = this;
    this.tasks.push(task);
    return task;
  }
  /**
   * vymaze ukol
   */
  deleteTask(task: TaskDefinition) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  /**
   * vytvori otezku a spoji ji s cvicenim
   */
  createQuestion() {
    const question = new QuestionDefinition();
    question.exercise = this;
    this.questions.push(question);
    return question;
  }
  /**
   * vymaze otazku
   */
  deleteQuestion(question: QuestionDefinition) {
    this.tasks.splice(this.questions.indexOf(question), 1);
  }


}
