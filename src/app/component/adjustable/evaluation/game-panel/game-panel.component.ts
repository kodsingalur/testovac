import { Component, OnInit } from '@angular/core';
import { EvaluationPanel } from '../../../../model/abstract/evaluation-panel';
import { Answer } from '../../../../model/runing/answer';
import { Exercise } from '../../../../model/runing/exercise';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent extends EvaluationPanel implements OnInit {
  static typeOfAdjustable = 'EvaluationPanel';

  static nameDef = 'Game panel';
  static description: string;

  refresh(exercuse: Exercise) {
    throw new Error('Method not implemented yet.');
  }
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
