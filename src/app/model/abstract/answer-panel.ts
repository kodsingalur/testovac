import { Adjustable } from './adjustable';
import { Answer } from 'app/model/runing/answer';

export abstract class AnswerPanel extends Adjustable {
  answer: Answer;
}
