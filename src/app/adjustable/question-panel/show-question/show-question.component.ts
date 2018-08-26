import { QuestionPanel } from '../../../model/adjustable/question-panel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent extends QuestionPanel implements OnInit {

  static nameDef= 'Show question';
  static description: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
