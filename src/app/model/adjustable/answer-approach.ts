import { Adjustable } from './adjustable';
import { Question } from '../running/question';

export abstract class AnswerApproach extends Adjustable {
    static typeOfAdjustable = 'AnswerApproach';

  abstract run(question: Question);

}
