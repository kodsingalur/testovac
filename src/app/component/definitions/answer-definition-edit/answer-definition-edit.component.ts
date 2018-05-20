import { Component, OnInit } from '@angular/core';
import { QuestionAnswerDefinition } from '../../../model/question-answer-definition';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../../../services/model.service';
import { AdjustableService } from '../../../services/adjustable.service';

@Component({
  selector: 'app-answer-definition-edit',
  templateUrl: './answer-definition-edit.component.html',
  styleUrls: ['./answer-definition-edit.component.css']
})
export class AnswerDefinitionEditComponent implements OnInit {
  answer: QuestionAnswerDefinition;

  constructor(protected adjustableService: AdjustableService, private route: ActivatedRoute, protected model: ModelService) { }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('exercise_order');
    const exercise = this.model.test.exercises[id];
    const idQuestion = +this.route.snapshot.paramMap.get('question_order');
    const question = exercise.questions[idQuestion];
    const idAnswer = +this.route.snapshot.paramMap.get('answer_order');
    this.answer = question.answers[idAnswer];
    if (!this.answer.answer) {
      this.answer.createAnswer();
    }
  }

}
