import { Component, OnInit } from '@angular/core';
import { QuestionDefinition } from '../../../model/question-definition';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../../../services/model.service';
import { AdjustableService } from '../../../services/adjustable.service';

@Component({
  selector: 'app-question-definition-edit',
  templateUrl: './question-definition-edit.component.html',
  styleUrls: ['./question-definition-edit.component.css']
})
export class QuestionDefinitionEditComponent implements OnInit {
  question: QuestionDefinition;
  constructor(protected adjustableService: AdjustableService, private route: ActivatedRoute, protected model: ModelService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('exercise_order');
    const exercise = this.model.test.exercises[id];
    const idQuestion = +this.route.snapshot.paramMap.get('question_order');
    this.question = exercise.questions[idQuestion];
  }

}
