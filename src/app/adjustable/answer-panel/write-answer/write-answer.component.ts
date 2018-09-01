import { AnswerPanel } from '../../../model/adjustable/answer-panel';
import { Component, OnInit } from '@angular/core';
import { QuestionPanel } from 'app/model/adjustable/question-panel';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-write-answer',
  templateUrl: './write-answer.component.html',
  styleUrls: ['./write-answer.component.css']
})
export class WriteAnswerComponent extends AnswerPanel implements OnInit {
  static nameDef = 'Write answer';
  static description: string;

  constructor(private renderer: Renderer2
) {
    super();
   }

  ngOnInit() {
    this.renderer.selectRootElement('input').focus();
  }
  answered() {
    this.answer.question.answered = true;
  }
}
