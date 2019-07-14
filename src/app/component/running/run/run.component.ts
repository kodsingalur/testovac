import {EvaluationPanel} from 'app/model/adjustable/evaluation-panel';
import {FinishPanel} from 'app/model/adjustable/finish-panel';
import {TaskPanel} from 'app/model/adjustable/task-panel';
import {ComponentRef, Component, OnInit, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {Test} from 'app/model/running/test';
import {Question} from 'app/model/running/question';

import {ModelService} from 'app/services/model.service';
import {Type} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Adjustable} from 'app/model/adjustable/adjustable';
import {AdjustableDefinition} from 'app/model/definitions/adjustable-definition';


@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {
  test: Test;
  taskPanel: ComponentRef<TaskPanel>;

  constructor(protected model: ModelService, public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver, private route: ActivatedRoute) {}

  ngOnInit() {
    this.model.loadTest(this.route.snapshot.paramMap.get('testid')).then((test) => {
      this.test = new Test();
      this.test.definition = this.model.test;

      this.viewContainerRef.clear();

      const testDefinition = this.test.definition;

      // vytvori se instance, ktere se budou drzet cely test
      if (testDefinition.evaluationPanel) {
        this.test.evalPanel = <EvaluationPanel>this.insertPanel(testDefinition.evaluationPanel).instance;
        this.test.evalPanel.test = this.test;
      }
      if (testDefinition.questionApproach) {
        this.test.questionApproach = new testDefinition.questionApproach.type();
        this.test.questionApproach.test = this.test;
      } else {
        this.test.exerciseApproach = new testDefinition.exercisesApproach.type();
        this.test.exerciseApproach.test = this.test;
      }

      this.nextQuestion();
    });
  }

  nextQuestion() {
    // TODO - resit callbackama v komponentach
    if (this.taskPanel) {
      this.taskPanel.destroy();
    }
    const question: Question = this.test.nextQuestion();

    if (this.test.finish) {
      if (this.test.definition.finishPanel) {
        this.viewContainerRef.clear();
        const finishPanel: FinishPanel = <FinishPanel>this.insertPanel(this.test.definition.finishPanel).instance;
        finishPanel.test = this.test;
      } else {
        alert('Konec');
      }
    } else {
      this.taskPanel = <ComponentRef<TaskPanel>>this.insertPanel(question.exercise.task.taskPanel);

      this.taskPanel.instance.exercise = question.exercise;
      question.exercise.addChangeHandler(event => {
        if (event.name === 'answered' && event.newValue) {
          this.nextQuestion();
        }
      });
    }
  }


  insertPanel(panel: AdjustableDefinition<Adjustable>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(panel.type);

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const instance = componentRef.instance;
    (<Adjustable>instance).paramValues = panel.params;

    return componentRef;
  }

}
