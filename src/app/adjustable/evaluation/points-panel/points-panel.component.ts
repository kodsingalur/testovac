import { EvaluationPanel } from '../../../model/adjustable/evaluation-panel';
import { Component, OnInit } from '@angular/core';
import { Answer } from 'app/model/running/answer';
import { Exercise } from 'app/model/running/exercise';
import { Param } from 'app/model/definitions/param';

@Component({
  selector: 'app-points-panel',
  templateUrl: './points-panel.component.html',
  styleUrls: ['./points-panel.component.css']
})
export class PointsPanelComponent extends EvaluationPanel implements OnInit {

  static nameDef= 'Points panel';
  static description: string;
  static params: Param[] = [new Param('ShowCountOfQuestion', 'Show count of question', Boolean, null)];
  spravne = 0;
  chybne = 0;

  refresh(exercise: Exercise) {
    for (let i = 0; i < exercise.questions.length; i++) {
      const question = exercise.questions[i];
      if (question.right) {
        this.spravne++;
      } else {
        this.chybne++;
      }
    }
  }

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
