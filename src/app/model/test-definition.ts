import { ExercisesApproach } from './abstract/exercises-approach';
import { QuestionsApproach } from './abstract/questions-approach';
import { EvaluationPanel } from './abstract/evaluation-panel';
import { ExerciseDefinition } from './exercise-definition';
import { FinishPanel } from './abstract/finish-panel';
import { Type } from '@angular/core';
import { AdjustableDefinition } from 'app/model/adjustable-definition';

export class TestDefinition {
  name: string;
  exercisesApproach: AdjustableDefinition<ExercisesApproach>;
  questionApproach: AdjustableDefinition<QuestionsApproach>;
  evaluationPanel: AdjustableDefinition<EvaluationPanel>;
  finishPanel: AdjustableDefinition<FinishPanel>;
  exercises: ExerciseDefinition[] = [];

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

    this.exercises.forEach( (exercise) => {
      result = result.concat(exercise.questions);
    });
    return result;
  }
}
