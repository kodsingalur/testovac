import { AnswerDefinition } from './answer-definition';
import { QuestionDefinition } from './question-definition';


export class QuestionAnswerDefinition {
  answer: AnswerDefinition;
  question: QuestionDefinition;
  right: boolean;
  /**
   * vrati poradi tohoto cviceni
   */
  getOrder() {
    return this.question.answers.indexOf(this);
  }
  /**
   * vytvori odpoved a spoji ji s touto vazbou
   */
  createAnswer() {
    this.answer = new AnswerDefinition();
    this.answer.questions.push(this);
    return this.answer;
  }

}
