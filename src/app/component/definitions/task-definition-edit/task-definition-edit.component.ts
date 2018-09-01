import {Component, OnInit} from '@angular/core';
import {TaskDefinition} from 'app/model/definitions/task-definition';
import {ActivatedRoute} from '@angular/router';
import {ModelService} from 'app/services/model.service';

@Component({
  selector: 'app-task-definition-edit',
  templateUrl: './task-definition-edit.component.html',
  styleUrls: ['./task-definition-edit.component.css']
})
export class TaskDefinitionEditComponent implements OnInit {
  task: TaskDefinition;
  constructor(private route: ActivatedRoute, protected model: ModelService) {}

  ngOnInit() {
    this.model.loadTest(this.route.snapshot.paramMap.get('testid')).then((test) => {
      const id = +this.route.snapshot.paramMap.get('exercise_order');
      const exercise = this.model.test.exercises[id];
      const idTask = +this.route.snapshot.paramMap.get('task_order');
      this.task = exercise.tasks[idTask];
    });
  }
}
