import { ExerciseDefinition } from './exercise-definition';
import { QuestionPanel } from './abstract/question-panel';
import { AnswerPanel } from './abstract/answer-panel';
import { TaskPanel } from './abstract/task-panel';
import { RightAnswerAlgorithm } from './abstract/right-answer-algorithm';
import { QuestionsApproach } from './abstract/questions-approach';
import { Type } from '@angular/core';
import { AdjustableDefinition } from 'app/model/adjustable-definition';
import { AnswerApproach } from './abstract/answer-approach';

export class TaskDefinition {
  exercise: ExerciseDefinition;
  questionApproach: AdjustableDefinition<QuestionsApproach>;
  answerApproach: AdjustableDefinition<AnswerApproach>;

  questionPanel: AdjustableDefinition<QuestionPanel>;
  answerPanel: AdjustableDefinition<AnswerPanel>;
  taskPanel: AdjustableDefinition<TaskPanel>;
  rightAnswerAlgorithm: AdjustableDefinition<RightAnswerAlgorithm>;
  /**
   * vrati poradi tohoto ukolu
   */
  getOrder() {
    return this.exercise.tasks.indexOf(this);
  }
}
