import { Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Question } from 'app/model/runing/question';
import { QuestionPanel } from 'app/model/abstract/question-panel';

@Component({
  selector: 'app-question-panel-wraper',
  templateUrl: './question-panel-wraper.component.html',
  styleUrls: ['./question-panel-wraper.component.css']
})
export class QuestionPanelWraperComponent implements OnInit {
  @Input() question: Question;
  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (this.question) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.question.exercise.task.questionPanel.type);

      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      const instance = componentRef.instance;
      (<QuestionPanel>instance).question = this.question;
    }
  }

}
