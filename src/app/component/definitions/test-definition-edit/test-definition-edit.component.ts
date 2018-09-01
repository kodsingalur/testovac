import { Component, OnInit } from '@angular/core';
import { TestDefinition } from 'app/model/definitions/test-definition';
import { ExercisesApproach } from 'app/model/adjustable/exercises-approach';
import { ModelService } from 'app/services/model.service';

import { RightOne } from 'app/adjustable/exercises-approach/right-one';

import { PointsPanelComponent } from 'app/adjustable/evaluation/points-panel/points-panel.component';
import { ExerciseDefinition } from 'app/model/definitions/exercise-definition';
import { FileService } from 'app/services/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-definition-edit',
  templateUrl: './test-definition-edit.component.html',
  styleUrls: ['./test-definition-edit.component.css']
})
export class TestDefinitionEditComponent implements OnInit {
  test: TestDefinition;

  constructor(protected model: ModelService, protected file: FileService, private route: ActivatedRoute)  {
  }

  ngOnInit() {
    this.model.loadTest(this.route.snapshot.paramMap.get('testid')).then((test) =>  {this.test = test; });
  }

  save() {
    this.file.signInAndSave(this.model.id, this.model.testDefinitionToXml(this.test));
  }

  pokus() {
   //     console.log(this.test);
   // console.log(this.model.testDefinitionToXml(this.test));
    // this.file.save(this.model.testDefinitionToXml(this.test));
    // this.file.open('1LAgksHdsjZ9qEKiiFsjgPcVsj6ytZbNM');
    // this.file.saveToFile("19wGTy527rtaFVLlYk0piKGyjDwLo3sxa", this.model.testDefinitionToXml(this.model.test));
   //     this.test = this.model.loadTest(this.route.snapshot.paramMap.get('testid'))();

  }
}
