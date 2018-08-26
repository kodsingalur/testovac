import { TaskPanel } from '../../../model/adjustable/task-panel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent extends TaskPanel implements OnInit {

  static nameDef= 'Show task';
  static description: string;

  constructor() {
    super();
  }

  ngOnInit() {

  }

}
