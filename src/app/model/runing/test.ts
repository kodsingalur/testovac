import { TasksApproach } from 'app/model/adjustable/tasks-approach';
import { TestDefinition } from 'app/model/definitions/test-definition';
import { Question } from './question';
import { Exercise } from './exercise';
import { TaskDefinition } from 'app/model/definitions/task-definition';

import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { EvaluationPanel } from 'app/model/adjustable/evaluation-panel';
import { QuestionsApproach } from 'app/model/adjustable/questions-approach';
import { ExercisesApproach } from 'app/model/adjustable/exercises-approach';
import { ExerciseDefinition } from 'app/model/definitions/exercise-definition';

export class Test {
  definition: TestDefinition;
  exercises: Exercise[] = [];

  evalPanel: EvaluationPanel;
  questionApproach: QuestionsApproach;
  exerciseApproach: ExercisesApproach;
  finish: boolean;
  private taskApproaches: Map<ExerciseDefinition, TasksApproach> = new Map();
  private questionApproaches: Map<TaskDefinition, QuestionsApproach>;

  /**
   * Vytvori model pro dalsi otazku - Exercise, Question i Answer.
   * Vyuziva bud TestDefinition.questionApproach, ExerciseDefinition.taskApproach, TaskDefinition.answerApproach
   * nebo TestDefinition.exerciseApproach, ExerciseDefinition.taskApproach, TaskDefinition.questionApproach, TaskDefinition.answerApproach
   */
  nextQuestion(): Question {
    let question;
    if (this.questionApproach) {
      question = this.createQuestion(this.questionApproach.nextQuestion(), null);
      question.exercise.task = this.getTaskApproach(question.exercise.definition).getForQuestion(question);
    } else {
      const exerciseDefinition = this.exerciseApproach.nextExercise();
      if (this.finish) {
        return null;
      }

      const exercise = new Exercise();
      exercise.definition = exerciseDefinition;
      exercise.test = this;
      this.exercises.push(exercise);

      exercise.task = this.getTaskApproach(exerciseDefinition).getForExercise(exercise);
      if (this.finish) {
        return null;
      }

      const questionDefinition = this.getQuestionApproach(exercise.task).nextQuestion();
      question = this.createQuestion(questionDefinition, exercise);
    }
    if (this.finish) {
      return null;
    }
    (new question.exercise.task.answerApproach.type()).run(question);

    return question;
  }
  /**
   * Vrati instanci ExerciseDefinition.taskApproach. Pokud neexistuje, vytvori ji.
   */
  getTaskApproach(exerciseDefinition: ExerciseDefinition) {
    let approach = this.taskApproaches.get(exerciseDefinition);
    if (!approach) {
      approach = new exerciseDefinition.tasksApproach.type();
      this.taskApproaches.set(exerciseDefinition, approach);
    }
    return approach;
  }
  /**
   * Vrati instanci TaskDefinition.questionApproach. Pokud neexistuje, vytvori ji.
   */
  getQuestionApproach(taskDefinition: TaskDefinition) {
    let approach = this.questionApproaches.get(taskDefinition);
    if (!approach) {
      approach = new taskDefinition.questionApproach.type();
      this.questionApproaches.set(taskDefinition, approach);
    }
    return approach;
  }

  /**
   * Vytvori otazku a pripoji ji k cviceni. Pokud neni predane cviceni, vytvori ho a pripoji k testu.
   */
  createQuestion(questionDefinition: QuestionDefinition, exercise: Exercise) {
    const question = new Question();
    question.definition = questionDefinition;

    if (!exercise) {
      exercise = new Exercise();
      exercise.definition = questionDefinition.exercise;

      exercise.test = this;
      this.exercises.push(exercise);
    }

    question.exercise = exercise;
    exercise.questions.push(question);

    return question;
  }
  /*
   * Vrati vsechny otazky testu
   */
  questions(): Question[] {
    let result = [];

    this.exercises.forEach((exercise) => {
      result = result.concat(exercise.questions);
    });
    return result;
  }
  /*
   * Spocita vsechny zodpovezene otazky
   */
  countAnswerdQuestions(questionDefinition: QuestionDefinition) {
    let result = 0;

    this.questions().forEach((question) => {
      if ((question.definition === questionDefinition) && question.exercise.answered) {
        result++;
      }
    });
    return result;
  }

  /*
   * Spocita vsechny zodpovezene cviceni pro predanou definici
   */
  countExercises(exerciseDefinition: ExerciseDefinition): number {
    let result = 0;

    this.exercises.forEach((exercise) => {
      if ((exercise.definition === exerciseDefinition) && exercise.answered) {
        result++;
      }
    });
    return result;
  }
}
