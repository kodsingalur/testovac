import { Component, OnInit } from '@angular/core';
import { TestDefinition } from '../../../model/test-definition';
import { ExercisesApproach } from '../../../model/abstract/exercises-approach';
import { AdjustableService } from '../../../services/adjustable.service';
import { ModelService } from '../../../services/model.service';

import { RightOne } from '../../../component/adjustable/exercises-approach/right-one';

import { PointsPanelComponent } from '../../../component/adjustable/evaluation/points-panel/points-panel.component';
import { ExerciseDefinition } from '../../../model/exercise-definition';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-test-definition-edit',
  templateUrl: './test-definition-edit.component.html',
  styleUrls: ['./test-definition-edit.component.css']
})
export class TestDefinitionEditComponent implements OnInit {
  test: TestDefinition = this.model.test;

  constructor(protected adjustableService: AdjustableService, protected model: ModelService, protected file:FileService)  { 
    
  }

  ngOnInit() {

  }
signIn(){
  this.file.signIn();
}
  pokus() {
    console.log(this.test.evaluationPanel.params);
  }
}
