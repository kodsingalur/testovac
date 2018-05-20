import { Adjustable } from './adjustable';
import { Question } from '../runing/question';

export abstract class AnswerApproach extends Adjustable {
  abstract run(question: Question);

}
