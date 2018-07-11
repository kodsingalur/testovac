import { Component, OnInit } from '@angular/core';
import { QuestionPanel } from '../../../../model/abstract/question-panel';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent extends QuestionPanel implements OnInit {
      static typeOfAdjustable = 'ShowQuestionComponent';

  static nameDef= 'Show question';
  static description: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
