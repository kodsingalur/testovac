import { Injectable } from '@angular/core';
import { TestDefinition } from '../model/test-definition';
import { AnswerDefinition } from '../model/answer-definition';
import { StatisticPanelComponent } from '../component/adjustable/finish/statistic-panel/statistic-panel.component';

import { PointsPanelComponent } from '../component/adjustable/evaluation/points-panel/points-panel.component';
import { OneByOne } from 'app/component/adjustable/questions-approach/one-by-one';
import { ShowTaskComponent } from 'app/component/adjustable/task-panel/show-task/show-task.component';

import { OneByOne as OneByOneTask } from '../component/adjustable/tasks-approach/one-by-one';
import { AdjustableDefinition } from 'app/model/adjustable-definition';
import { ShowQuestionComponent } from '../component/adjustable/question-panel/show-question/show-question.component';
import { SameAsInDefinition } from '../component/adjustable/answer-approach/same-as-in-definition';
import { WriteAnswerComponent } from '../component/adjustable/answer-panel/write-answer/write-answer.component';
import { ExactlySame} from '../component/adjustable/right-answer-algorithm/exactly-same';

@Injectable()
export class ModelService {
  test: TestDefinition = new TestDefinition();

  constructor() {
      this.test.name = 'Mock test';
      this.test.evaluationPanel = new AdjustableDefinition(PointsPanelComponent);
      this.test.questionApproach = new AdjustableDefinition(OneByOne);
      this.test.finishPanel = new AdjustableDefinition(StatisticPanelComponent);
      this.test.exercisesApproach = null;

      const exercise = this.test.createExercise();
      exercise.name = 'MockExercise';
      exercise.text = 'Contetn text';
      exercise.tasksApproach = new AdjustableDefinition(OneByOneTask);

      const task = exercise.createTask();
      task.taskPanel = new AdjustableDefinition(ShowTaskComponent);
      task.questionPanel = new AdjustableDefinition(ShowQuestionComponent);
      task.answerApproach =  new AdjustableDefinition(SameAsInDefinition);
      task.answerPanel = new AdjustableDefinition(WriteAnswerComponent);
      task.rightAnswerAlgorithm = new AdjustableDefinition(ExactlySame);

      let question = exercise.createQuestion();
      question.text = 'Pokusna otazka';
      let answer = question.createAnswer();
      let answerC = answer.createAnswer();
      answerC.text = 'Odpoved';

      question = exercise.createQuestion();
      question.text = 'Pokusna otazka 2';
      answer = question.createAnswer();
      answerC = answer.createAnswer();
      answerC.text = 'Odpoved';
   }

}
