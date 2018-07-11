import { AnswerApproach } from './../../../model/abstract/answer-approach';
import { Question } from 'app/model/runing/question';

export class SameAsInDefinition extends AnswerApproach {
  static typeOfAdjustable = 'AnswerApproach';
  static nameDef= 'Same as in definition';
  static description: string;

  run(question: Question) {
    question.definition.answers.forEach((answerDef) =>  {
        question.createAnswer(answerDef.answer);
      }
    );
  }
}
