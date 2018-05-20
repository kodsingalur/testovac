import { Injectable } from '@angular/core';
import { RightOne } from '../component/adjustable/exercises-approach/right-one';
import { PointsPanelComponent } from '../component/adjustable/evaluation/points-panel/points-panel.component';
import { GamePanelComponent } from '../component/adjustable/evaluation/game-panel/game-panel.component';
import { OneByOne } from '../component/adjustable/questions-approach/one-by-one';
import { OneByOne as OneByOneTask } from '../component/adjustable/tasks-approach/one-by-one';
import { StatisticPanelComponent } from '../component/adjustable/finish/statistic-panel/statistic-panel.component';
import { WriteAnswerComponent } from '../component/adjustable/answer-panel/write-answer/write-answer.component';
import { ShowQuestionComponent } from '../component/adjustable/question-panel/show-question/show-question.component';
import { ShowTaskComponent } from '../component/adjustable/task-panel/show-task/show-task.component';
import { ExactlySame} from '../component/adjustable/right-answer-algorithm/exactly-same';
import { AdjustableDefinition} from '../model/adjustable-definition';
import { SameAsInDefinition } from '../component/adjustable/answer-approach/same-as-in-definition';


@Injectable()
export class AdjustableService {
  constructor() { }
  getExercisesApproaches () {
    return [new AdjustableDefinition(RightOne)];
  }

  getQuestionsApproaches () {
    return [new AdjustableDefinition(OneByOne)];
  }
  getTasksApproaches () {
    return [new AdjustableDefinition(OneByOneTask)];
  }

  getEvaluationPanels () {
    return [new AdjustableDefinition(PointsPanelComponent), new AdjustableDefinition(GamePanelComponent)];
  }

  getFinishPanels () {
    return [new AdjustableDefinition(StatisticPanelComponent)];
  }

  getAnswerPanels () {
    return [new AdjustableDefinition(WriteAnswerComponent)];
  }
  getQuestionPanels () {
    return [new AdjustableDefinition(ShowQuestionComponent)];
  }

  getTaskPanels () {
    return [new AdjustableDefinition(ShowTaskComponent)];
  }
  getRightAnswerAlgorithms () {
    return [new AdjustableDefinition(ExactlySame)];
  }
  getAnswerApproach () {
    return [new AdjustableDefinition(SameAsInDefinition)];
  }
}
