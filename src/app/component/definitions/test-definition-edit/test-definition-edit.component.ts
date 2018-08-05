import { Component, OnInit } from '@angular/core';
import { TestDefinition } from '../../../model/test-definition';
import { ExercisesApproach } from '../../../model/abstract/exercises-approach';
import { AdjustableService } from '../../../services/adjustable.service';
import { ModelService } from '../../../services/model.service';

import { RightOne } from '../../../component/adjustable/exercises-approach/right-one';

import { PointsPanelComponent } from '../../../component/adjustable/evaluation/points-panel/points-panel.component';
import { ExerciseDefinition } from '../../../model/exercise-definition';
import { FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-definition-edit',
  templateUrl: './test-definition-edit.component.html',
  styleUrls: ['./test-definition-edit.component.css']
})
export class TestDefinitionEditComponent implements OnInit {
  test: TestDefinition;

  constructor(protected adjustableService: AdjustableService, protected model: ModelService, protected file: FileService, private route: ActivatedRoute)  {
    var id = this.route.snapshot.paramMap.get('testid');
    console.log(this.route.snapshot.paramMap.get('testid'));
    console.log("" + id);
    this.test = this.model.loadTest(this.route.snapshot.paramMap.get('testid'))();
  }

  ngOnInit() {
  }

  signIn() {
    this.file.signIn();
  }
  
  pokus() {
   //     console.log(this.test);
   // console.log(this.model.testDefinitionToXml(this.test));
    //this.file.save(this.model.testDefinitionToXml(this.test));
    //this.file.open('1LAgksHdsjZ9qEKiiFsjgPcVsj6ytZbNM');
    //this.file.saveToFile("19wGTy527rtaFVLlYk0piKGyjDwLo3sxa", this.model.testDefinitionToXml(this.model.test));
        this.test = this.model.loadTest(this.route.snapshot.paramMap.get('testid'))();

  }
}
