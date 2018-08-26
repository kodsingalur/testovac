import { Content } from './content';
import { QuestionAnswerDefinition } from './question-answer-definition';

export class AnswerDefinition extends Content {
  questions: QuestionAnswerDefinition[]= [];
}
