import { FinishPanel } from '../../../model/adjustable/finish-panel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-panel',
  templateUrl: './statistic-panel.component.html',
  styleUrls: ['./statistic-panel.component.css']
})


export class StatisticPanelComponent extends FinishPanel implements OnInit {

  static nameDef= 'Statistic panel';
  static description: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
