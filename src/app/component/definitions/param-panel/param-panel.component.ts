import { Component, OnInit } from '@angular/core';
import { ParamValue } from 'app/model/param-value';

@Component({
  selector: 'app-param-panel',
  templateUrl: './param-panel.component.html',
  styleUrls: ['./param-panel.component.css']
})
export class ParamPanelComponent implements OnInit {
  param: ParamValue;
  constructor() { }

  ngOnInit() {
  }

  label() {
    if (this.param) {
      return this.param.definition.description;
    }
  }

  type() {
    if (this.param) {
      if (this.param.definition.type === Boolean) {
        return 'checkbox';
      } else if (this.param.definition.type === String) {
        return 'list';
      } else if (this.param.definition.type === Number) {
        return 'number';
      }
    }
  }
}
