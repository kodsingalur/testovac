import { Question } from '../runing/question';
import { Adjustable } from './adjustable';

export abstract class QuestionPanel extends Adjustable {
        static typeOfAdjustable = 'ShowQuestionComponent';

  question: Question;
}
