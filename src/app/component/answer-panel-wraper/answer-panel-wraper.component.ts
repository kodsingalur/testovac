import { Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Answer } from 'app/model/runing/answer';
import { AnswerPanel } from 'app/model/abstract/answer-panel';

@Component({
  selector: 'app-answer-panel-wraper',
  templateUrl: './answer-panel-wraper.component.html',
  styleUrls: ['./answer-panel-wraper.component.css']
})
export class AnswerPanelWraperComponent implements OnInit {
  @Input() answer: Answer;

  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (this.answer) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.answer.question.exercise.task.answerPanel.type);

      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      const instance = componentRef.instance;
      (<AnswerPanel>instance).answer = this.answer;
    }

  }

}
