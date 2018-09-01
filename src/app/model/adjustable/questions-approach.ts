import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { Adjustable } from './adjustable';
import { Question } from 'app/model/running/question';
import { Test } from 'app/model//running/test';

export abstract class QuestionsApproach extends Adjustable {
    static typeOfAdjustable = 'QuestionsApproach';

  test: Test;
// metody run, check
  abstract nextQuestion(): QuestionDefinition;
}
