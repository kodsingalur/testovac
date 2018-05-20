import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseDefinition } from 'app/model/exercise-definition';
import { ModelService } from 'app/services/model.service';
import { AdjustableService } from 'app/services/adjustable.service';

@Component({
  selector: 'app-exercise-definition-edit',
  templateUrl: './exercise-definition-edit.component.html',
  styleUrls: ['./exercise-definition-edit.component.css']
})
export class ExerciseDefinitionEditComponent implements OnInit {
  exercise: ExerciseDefinition;

  constructor(protected adjustableService: AdjustableService, private route: ActivatedRoute, protected model: ModelService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('exercise_order');
    this.exercise = this.model.test.exercises[id];
  }

}
