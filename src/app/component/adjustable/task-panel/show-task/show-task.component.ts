import { Component, OnInit } from '@angular/core';
import { TaskPanel } from '../../../../model/abstract/task-panel';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent extends TaskPanel implements OnInit {
    static typeOfAdjustable = 'TaskPanel';

  static nameDef= 'Show task';
  static description: string;

  constructor() {
    super();
  }

  ngOnInit() {

  }

}
