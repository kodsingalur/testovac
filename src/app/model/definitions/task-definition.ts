import { ExerciseDefinition } from './exercise-definition';
import { QuestionPanel } from 'app/model/adjustable/question-panel';
import { AnswerPanel } from 'app/model/adjustable/answer-panel';
import { TaskPanel } from 'app/model/adjustable/task-panel';
import { RightAnswerAlgorithm } from 'app/model/adjustable/right-answer-algorithm';
import { QuestionsApproach } from 'app/model/adjustable/questions-approach';
import { Type } from '@angular/core';
import { AdjustableDefinition } from 'app/model/definitions/adjustable-definition';
import { AnswerApproach } from 'app/model/adjustable/answer-approach';

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
