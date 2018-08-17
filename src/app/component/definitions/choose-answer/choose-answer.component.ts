import { ModelService } from '../../../services/model.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-answer',
  templateUrl: './choose-answer.component.html',
  styleUrls: ['./choose-answer.component.css']
})
export class ChooseAnswerComponent implements OnInit {

  constructor(private model: ModelService) { }

  answers;

  ngOnInit() {
    this.answers = this.model.test.answers();
  }

}
