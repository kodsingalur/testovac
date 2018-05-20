import { Content } from './content';
import { ExerciseDefinition } from './exercise-definition';
import { QuestionAnswerDefinition } from './question-answer-definition';

export class QuestionDefinition extends Content {
  exercise: ExerciseDefinition;
  answers: QuestionAnswerDefinition[]= [];
  /**
   * vrati poradi tohoto cviceni
   */
  getOrder() {
    return this.exercise.questions.indexOf(this);
  }
  /**
   * vytvori vazbu mezi otazkou a odpovedi a spoji ji s otazkou
   */
  createAnswer() {
    const answer = new QuestionAnswerDefinition();
    answer.question = this;
    this.answers.push(answer);
    return answer;
  }
  /**
   * Odpoji otazku od teto odpovedi 
   */
  deleteAnswer(answer: QuestionAnswerDefinition) {
    this.answers.splice(this.answers.indexOf(answer), 1);
  }

}
