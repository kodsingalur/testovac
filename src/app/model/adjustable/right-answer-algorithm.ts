import { Adjustable } from './adjustable';
import { Question } from '../running/question';

export abstract class RightAnswerAlgorithm extends Adjustable {
    static typeOfAdjustable = 'RightAnswerAlgorithm';

  abstract run(question: Question);
}
