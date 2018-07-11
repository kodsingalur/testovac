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
  questionApproach: AdjustableDefinition<QuestionsApproach>= null;
  answerApproach: AdjustableDefinition<AnswerApproach>= null;

  questionPanel: AdjustableDefinition<QuestionPanel>= null;
  answerPanel: AdjustableDefinition<AnswerPanel>= null;
  taskPanel: AdjustableDefinition<TaskPanel>= null;
  rightAnswerAlgorithm: AdjustableDefinition<RightAnswerAlgorithm>= null;
  /**
   * vrati poradi tohoto ukolu
   */
  getOrder() {
    return this.exercise.tasks.indexOf(this);
  }
}
