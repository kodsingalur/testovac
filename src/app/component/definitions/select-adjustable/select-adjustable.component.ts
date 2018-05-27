import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ParamPanelComponent } from '../param-panel/param-panel.component';
import { Adjustable } from 'app/model/abstract/adjustable';
import { AdjustableDefinition } from 'app/model/adjustable-definition';
import { ParamValue } from 'app/model/param-value';

import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-adjustable',
  templateUrl: './select-adjustable.component.html',
  styleUrls: ['./select-adjustable.component.css']
})
export class SelectAdjustableComponent implements OnInit {
  @Input() label: string;
  @Input() mandatory: boolean;
  @Input() options: AdjustableDefinition<Adjustable>[];
  @Input() model: AdjustableDefinition<Adjustable>;
  @Output() modelChange: EventEmitter<AdjustableDefinition<Adjustable>> = new EventEmitter<AdjustableDefinition<Adjustable>>();

  onChange() {
    this.modelChange.emit(this.model);
    this.viewContainerRef.clear();
    if (this.model && this.model.type.prototype.params) {
      this.model.type.prototype.params.forEach( (paramDefinition) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ParamPanelComponent);

        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        const param = this.model.getOrCreateParam(paramDefinition);

        componentRef.instance.param = param;

      });
    }
  }
  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnInit() {
    this.onChange();
  }

  compare(val1, val2) {

    return val1 && val2 ? val1.type === val2.type : val1 === val2;
  }
}
