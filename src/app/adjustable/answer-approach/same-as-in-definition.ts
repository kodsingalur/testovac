import { AnswerApproach } from 'app/model/adjustable/answer-approach';
import { Question } from 'app/model/runing/question';

export class SameAsInDefinition extends AnswerApproach {
  static nameDef= 'Same as in definition';
  static description: string;

  run(question: Question) {
    question.definition.answers.forEach((answerDef) =>  {
        question.createAnswer(answerDef.answer);
      }
    );
  }
}
