import { Component, OnInit } from '@angular/core';
import { EvaluationPanel } from 'app/model/adjustable/evaluation-panel';
import { Answer } from 'app/model/running/answer';
import { Exercise } from 'app/model/running/exercise';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent extends EvaluationPanel implements OnInit {

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
