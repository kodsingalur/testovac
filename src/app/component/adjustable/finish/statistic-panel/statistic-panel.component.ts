import { Component, OnInit } from '@angular/core';
import { FinishPanel } from '../../../../model/abstract/finish-panel';

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
