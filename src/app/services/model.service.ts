import {Injectable, Type} from '@angular/core';
import {TestDefinition} from '../model/test-definition';
import {AnswerDefinition} from '../model/answer-definition';
import {StatisticPanelComponent} from '../component/adjustable/finish/statistic-panel/statistic-panel.component';

import {PointsPanelComponent} from '../component/adjustable/evaluation/points-panel/points-panel.component';
import {OneByOne} from 'app/component/adjustable/questions-approach/one-by-one';
import {ShowTaskComponent} from 'app/component/adjustable/task-panel/show-task/show-task.component';

import {OneByOne as OneByOneTask} from '../component/adjustable/tasks-approach/one-by-one';
import {AdjustableDefinition} from 'app/model/adjustable-definition';
import {ShowQuestionComponent} from '../component/adjustable/question-panel/show-question/show-question.component';
import {SameAsInDefinition} from '../component/adjustable/answer-approach/same-as-in-definition';
import {WriteAnswerComponent} from '../component/adjustable/answer-panel/write-answer/write-answer.component';
import {GamePanelComponent } from '../component/adjustable/evaluation/game-panel/game-panel.component';
import {RightOne } from '../component/adjustable/exercises-approach/right-one';
import {ExactlySame} from '../component/adjustable/right-answer-algorithm/exactly-same';
import {TestovacModel} from '../model/TestovacModel';
import {ExerciseDefinition} from '../model/exercise-definition';
import {ParamValue } from '../model/param-value';
import {QuestionAnswerDefinition } from '../model/question-answer-definition';
import {QuestionDefinition } from '../model/question-definition';
import {Test} from '../model/runing/test';
import {TaskDefinition } from '../model/task-definition';
import {Question } from '../model/runing/question';
import {Exercise } from '../model/runing/exercise';
import {Answer } from '../model/runing/answer';
import { FileService } from './file.service';

import * as fs from 'fs';
import * as sxml from 'sxml';
import XML = sxml.XML;
import XMLList = sxml.XMLList;

@Injectable()
export class ModelService {
  test: TestDefinition;
  id: String;
  classMap: Map<String, Type<any>> = new Map();
  
  loadTest(id) {
   // this.file.signIn();
                 console.log("id" + id);

     if (id) {
       if (id != this.id){
             console.log("Open");

         this.file.open(id).subscribe(res => {this.test = this.testDefinitionFromXml(res);return ()=>{return this.test}});
       }
    } else if (!this.test){
      this.test = new TestDefinition();
    }
    return ()=>{return this.test};
  }

  getClassForName(name) {
    return this.classMap.get(name);
  }

  newTestovacModel(name) {
    const typeT = this.getClassForName(name);
    if (typeT) {
      return new typeT();
    } else {
      return null;
    }
  }

  private toXml(model: TestovacModel, name, map: Map<Object, number>): XML {
    const xml = new XML();
    xml.setTag(name);
    if (!model) {
      return xml;
    }
    xml.setProperty('type', model.constructor.name);

    const link = map.get(model);
    if (link) {
      xml.setProperty('id', '' + link);
      return xml;
    } else {
      xml.setProperty('id', '' + (map.size + 1));
      map.set(model, map.size + 1);
    }

    const array = Object.keys(model);
    for (let i = 0; i < array.length; i++) {
      const propertyName = array[i];
      const propertyValue = model[propertyName];
      if (Array.isArray(propertyValue)) {
        const xmlList = new XMLList();
        for (let j = 0; j < propertyValue.length; j++) {
          if (propertyValue[j]) {
            const subXml = this.toXml(propertyValue[j], propertyName, map);
            xml.push(subXml);
          }
        }
      } else if (propertyValue instanceof Type) {
        xml.insertValue(propertyName, propertyValue.typeOfAdjustable + ' ' + propertyValue.name).setProperty('type', 'Type');
      } else if (propertyValue instanceof Object) {
        const subXml = this.toXml(propertyValue, propertyName, map);
        xml.push(subXml);
      } else if (propertyValue) {
        xml.insertValue(propertyName, propertyValue).setProperty('type', typeof propertyValue);
      }
    }
    return xml;
  }

  private fromXml(xml: XML, map: Map<number, Object>) {
    const typeProp = xml.getProperty('type');

    if (typeProp === 'string') {
      return xml.getValue();
    } else if (typeProp === 'number') {
      return parseInt(xml.getValue(), 10);
    } else if (typeProp === 'number') {
      return xml.getValue() === 'true';
    } else if (typeProp === 'Type') {
      return this.getClassForName(xml.getValue());
    }

    //  xml.getTag();
    if (!xml.hasProperty('id')) {
      return null;
    }
    const id = parseInt(xml.getProperty('id'), 10);
    let model = map.get(id);
    if (model) {
      return model;
    }

    model = this.newTestovacModel(typeProp);
    if (!model) {
      return null;
    }
    map.set(id, model);

    // xml.begin.
    let iterator = xml.begin();
    while (iterator.value != null) {
      const actValue = model[iterator.value.first];
      for (let i = 0; i < iterator.value.second.size(); i++) {
        const subXml = iterator.value.second.at(i);
        if (Array.isArray(actValue)) {
          actValue.push(this.fromXml(subXml, map));
        } else {
          model[iterator.value.first] = this.fromXml(subXml, map);
        }
      }
      iterator = iterator.next();
    }
    return model;
  }

  public testDefinitionToXml(test: TestDefinition): string {
    return this.toXml(test, '', new Map()).toString();
  }
   public testDefinitionFromXml(xml: string): TestDefinition {
    return <TestDefinition> this.fromXml(new XML(xml), new Map());
  }




  constructor(protected file: FileService) {
    const modelDefinitionClasses = [TestDefinition, AdjustableDefinition, ExerciseDefinition, TaskDefinition,
      QuestionDefinition, QuestionAnswerDefinition, AnswerDefinition, ParamValue];
    const modelTestClasses = [Test, Exercise, Question, Answer];

    const adjustableClasses = [SameAsInDefinition, WriteAnswerComponent, GamePanelComponent, PointsPanelComponent,
      RightOne, OneByOne, StatisticPanelComponent, ShowQuestionComponent, ExactlySame, ShowTaskComponent, OneByOneTask];

    modelDefinitionClasses.forEach((cls) =>  {
      this.classMap.set(cls.name, cls);
    });

    adjustableClasses.forEach((cls) =>  {
      this.classMap.set(cls.typeOfAdjustable + ' ' + cls.name, cls);
    });
  }

}
