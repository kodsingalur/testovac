import { QuestionsApproach } from 'app/model/adjustable/questions-approach';
import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { Question } from 'app/model/runing/question';

export class OneByOne extends QuestionsApproach {
  static nameDef = 'One by one';
  static description: string;
  private i = 0;
  constructor() {
    super();
  }
  nextQuestion(): QuestionDefinition {
    const questions = this.test.definition.questions();
    this.i = this.i % questions.length;
    const questionDefinition = questions[this.i];
    this.i++;
    return questionDefinition;
  }
}
