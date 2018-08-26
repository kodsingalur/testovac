import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { Adjustable } from './adjustable';
import { Question } from 'app/model/runing/question';
import { Test } from 'app/model//runing/test';

export abstract class QuestionsApproach extends Adjustable {
    static typeOfAdjustable = 'QuestionsApproach';

  test: Test;
// metody run, check
  abstract nextQuestion(): QuestionDefinition;
}
