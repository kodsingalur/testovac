import { Question } from '../running/question';
import { Adjustable } from './adjustable';

export abstract class QuestionPanel extends Adjustable {
        static typeOfAdjustable = 'QuestionPanel';

  question: Question;
}
