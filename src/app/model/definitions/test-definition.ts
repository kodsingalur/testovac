import {AnswerDefinition} from './answer-definition';
import {ModelService} from 'app/services/model.service';
import {ExercisesApproach} from 'app/model/adjustable/exercises-approach';
import {QuestionsApproach} from 'app/model/adjustable/questions-approach';
import {EvaluationPanel} from 'app/model/adjustable/evaluation-panel';
import {ExerciseDefinition} from './exercise-definition';
import {QuestionAnswerDefinition} from './question-answer-definition';
import {FinishPanel} from 'app/model/adjustable/finish-panel';
import {QuestionDefinition} from './question-definition';
import {Type} from '@angular/core';
import {AdjustableDefinition} from 'app/model/definitions/adjustable-definition';
import {TestovacModel} from 'app/model/definitions/testovac-model';

export class TestDefinition extends TestovacModel {
  name: string;
  exercisesApproach: AdjustableDefinition<ExercisesApproach> = null;
  questionApproach: AdjustableDefinition<QuestionsApproach> = null;
  evaluationPanel: AdjustableDefinition<EvaluationPanel> = null;
  finishPanel: AdjustableDefinition<FinishPanel> = null;
  exercises: ExerciseDefinition[] = [];

  constructor() {
    super();
  }

  /**
   * vytvori nove cviceni a svaze ho s testem
   */
  createExercise() {
    const exercise = new ExerciseDefinition();
    exercise.test = this;
    this.exercises.push(exercise);
    return exercise;
  }
  /**
   * vymaze cviceni
   */
  deleteExercise(exercise: ExerciseDefinition) {
    this.exercises.splice(this.exercises.indexOf(exercise), 1);
  }
  /**
   * vrati otazky vsech cviceni
   */
  questions() {
    let result = [];

    this.exercises.forEach((exercise) => {
      result = result.concat(exercise.questions);
    });
    return result;
  }

  answers() {
    let result = [];

    this.questions().forEach((question: QuestionDefinition) => {
      question.answers.forEach((answer: QuestionAnswerDefinition) => {
        if (result.indexOf(answer.answer) == -1) {
          result.push(answer.answer);
        }
      });
    });
    return result;
  }
}
