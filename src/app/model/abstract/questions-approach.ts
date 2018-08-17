import { QuestionDefinition } from '../question-definition';
import { Adjustable } from './adjustable';
import { Question } from '../runing/question';
import { Test } from '../runing/test';

export abstract class QuestionsApproach extends Adjustable {
    static typeOfAdjustable = 'QuestionsApproach';

  test: Test;
// metody run, check
  abstract nextQuestion(): QuestionDefinition;
}
