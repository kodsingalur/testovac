import { RightAnswerAlgorithm } from 'app/model/abstract/right-answer-algorithm';
import { Question } from 'app/model/runing/question';

export class ExactlySame extends RightAnswerAlgorithm {
  static typeOfAdjustable = 'RightAnswerAlgorithm';
  static nameDef = 'Exactly same';
  static description: string;

  run(question: Question) {
    question.right = question.answers.every((answer) =>  {
      return answer.definition.text === answer.text;
    });
  }
}
