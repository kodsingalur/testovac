import {Injectable, Type} from '@angular/core';
import {TestDefinition} from 'app/model/definitions/test-definition';
import {AnswerDefinition} from '../model/definitions/answer-definition';
import {StatisticPanelComponent} from '../adjustable/finish/statistic-panel/statistic-panel.component';

import {PointsPanelComponent} from '../adjustable/evaluation/points-panel/points-panel.component';
import {OneByOne} from 'app/adjustable/questions-approach/one-by-one';
import {ShowTaskComponent} from 'app/adjustable/task-panel/show-task/show-task.component';

import {OneByOne as OneByOneTask} from '../adjustable/tasks-approach/one-by-one';
import {AdjustableDefinition} from 'app/model/definitions/adjustable-definition';
import {ShowQuestionComponent} from '../adjustable/question-panel/show-question/show-question.component';
import {SameAsInDefinition} from '../adjustable/answer-approach/same-as-in-definition';
import {WriteAnswerComponent} from '../adjustable/answer-panel/write-answer/write-answer.component';
import {GamePanelComponent} from '../adjustable/evaluation/game-panel/game-panel.component';
import {RightOne} from '../adjustable/exercises-approach/right-one';
import {ExactlySame} from '../adjustable/right-answer-algorithm/exactly-same';
import {TestovacModel} from '../model/definitions/testovac-model';
import {Adjustable} from '../model/adjustable/adjustable';
import {ExerciseDefinition} from '../model/definitions/exercise-definition';
import {ParamValue} from '../model/definitions/param-value';
import {QuestionAnswerDefinition} from '../model/definitions/question-answer-definition';
import {QuestionDefinition} from '../model/definitions/question-definition';
import {Test} from '../model/running/test';
import {TaskDefinition} from '../model/definitions/task-definition';
import {Question} from '../model/running/question';
import {Exercise} from '../model/running/exercise';
import {Answer} from '../model/running/answer';
import {FileService} from './file.service';

import * as sxml from 'sxml';
import XML = sxml.XML;
import XMLList = sxml.XMLList;

@Injectable()
export class ModelService {
  /** aktualni definice tesu*/
  test: TestDefinition;
  /** id aktualni definice testu - id souboru na googledisku nebo mock nebo 0 pro novy test*/
  id: String;
  /** mapa trid */
  classMap: Map<String, Type<any>> = new Map();
  /** tridy definic */
  modelDefinitionClasses = [TestDefinition, AdjustableDefinition, ExerciseDefinition, TaskDefinition,
    QuestionDefinition, QuestionAnswerDefinition, AnswerDefinition, ParamValue];

  /** tridy beziciho testu*/
  modelTestClasses = [Test, Exercise, Question, Answer];

  /** Adjustable tridy */
  adjustableClasses = [SameAsInDefinition, WriteAnswerComponent, GamePanelComponent, PointsPanelComponent,
    RightOne, OneByOne, StatisticPanelComponent, ShowQuestionComponent, ExactlySame, ShowTaskComponent, OneByOneTask];

  /** nacte test dle id, 0 znamena novy test, mock znamená mock test*/
  loadTest(id) {
    return new Promise<TestDefinition>((resolve, reject) => {

      if (id && (!this.test) && (id === 'mock')) {
        this.useMockTest();
      } else if (id && (id !== this.id) && (id !== '0')) {
        if (id !== this.id) {
          this.id = id;
          this.file.open(id).then(content => {this.test = this.testDefinitionFromXml(content); resolve(this.test); });
          return;
        }
      } else if ((!this.test) && (this.id !== '0')) {
        this.test = new TestDefinition();
      }
      resolve(this.test);
    });
  }

  /** vrati tridu dle jmena*/
  getClassForName(name) {
    return this.classMap.get(name);
  }

  /** vytvori novou instanci dle jmena*/
  newTestovacModel(name) {
    const typeT = this.getClassForName(name);
    if (typeT) {
      return new typeT();
    } else {
      return null;
    }
  }

  /** prevedo objekt na xml */
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

  /** prevede objekt z xml*/
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

  /** prevede definici test na xml */
  public testDefinitionToXml(test: TestDefinition): string {
    return this.toXml(test, '', new Map()).toString();
  }

  /** prevede definici test z xml */
  public testDefinitionFromXml(xml: string): TestDefinition {
    return <TestDefinition>this.fromXml(new XML(xml), new Map());
  }

  /** vrati seznam AdjustableDefinition pro predany typ*/
  public getAdjustable(typeAdj: string) {
    const result = [];
    this.adjustableClasses.forEach((cls) => {
      if (cls.typeOfAdjustable === typeAdj) {
        result.push(new AdjustableDefinition<Adjustable>(cls));
      }
    });
    return result;
  }
  
  /*vytvori mock test a nastavi jej jako aktualni - slouzi pro testovani, pokud neni zadouci se pripojovat na googledisk */
  public useMockTest() {
    this.id = 'mock';
    this.test = new TestDefinition();
    this.test.name = 'Mock test';
    this.test.evaluationPanel = new AdjustableDefinition(PointsPanelComponent);
    this.test.questionApproach = new AdjustableDefinition(OneByOne);
    this.test.finishPanel = new AdjustableDefinition(StatisticPanelComponent);
    this.test.exercisesApproach = null;
    const exercise = this.test.createExercise();
    exercise.name = 'MockExercise';
    exercise.text = 'Contetn text';
    exercise.tasksApproach = new AdjustableDefinition(OneByOneTask);
    const task = exercise.createTask();
    task.taskPanel = new AdjustableDefinition(ShowTaskComponent);
    task.questionPanel = new AdjustableDefinition(ShowQuestionComponent);
    task.answerApproach = new AdjustableDefinition(SameAsInDefinition);
    task.answerPanel = new AdjustableDefinition(WriteAnswerComponent);
    task.rightAnswerAlgorithm = new AdjustableDefinition(ExactlySame);
    let question = exercise.createQuestion();
    question.text = 'Pokusna otazka';
    let answer = question.createAnswer();
    let answerC = answer.createAnswer();
    answerC.text = 'Odpoved';
    question = exercise.createQuestion();
    question.text = 'Pokusna otazka 2';
    answer = question.createAnswer();
    answerC = answer.createAnswer();
    answerC.text = 'Odpoved 2';
  }

  constructor(protected file: FileService) {
    // naplni classMap
    this.modelDefinitionClasses.forEach((cls) => {
      this.classMap.set(cls.name, cls);
    });

    this.adjustableClasses.forEach((cls) => {
      this.classMap.set(cls.typeOfAdjustable + ' ' + cls.name, cls);
    });
  }
}
