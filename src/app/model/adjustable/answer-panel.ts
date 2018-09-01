import { Adjustable } from './adjustable';
import { Answer } from 'app/model/running/answer';

export abstract class AnswerPanel extends Adjustable {
      static typeOfAdjustable = 'AnswerPanel';

  answer: Answer;
}
