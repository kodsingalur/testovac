import { Component, OnInit } from '@angular/core';
import { TaskDefinition } from '../../../model/task-definition';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../../../services/model.service';
import { AdjustableService } from '../../../services/adjustable.service';

@Component({
  selector: 'app-task-definition-edit',
  templateUrl: './task-definition-edit.component.html',
  styleUrls: ['./task-definition-edit.component.css']
})
export class TaskDefinitionEditComponent implements OnInit {
  task: TaskDefinition;
  constructor(protected adjustableService: AdjustableService, private route: ActivatedRoute, protected model: ModelService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('exercise_order');
    const exercise = this.model.test.exercises[id];
    const idTask = +this.route.snapshot.paramMap.get('task_order');
    this.task = exercise.tasks[idTask];

  }

}
