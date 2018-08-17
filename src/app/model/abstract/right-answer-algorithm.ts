import { Adjustable } from './adjustable';
import { Question } from '../runing/question';

export abstract class RightAnswerAlgorithm extends Adjustable {
    static typeOfAdjustable = 'RightAnswerAlgorithm';

  abstract run(question: Question);
}
