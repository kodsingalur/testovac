import { Adjustable } from './adjustable';
import { Question } from '../runing/question';

export abstract class RightAnswerAlgorithm extends Adjustable {
  abstract run(question: Question);
}
