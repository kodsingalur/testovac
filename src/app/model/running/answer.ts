import { Changeable } from '../changeable/changeable';
import { Exercise } from './exercise';
import { Question } from './question';
import { AnswerDefinition } from 'app/model/definitions/answer-definition';

export class Answer extends Changeable {
  definition: AnswerDefinition;
  question: Question;

  private _text: string;
  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this.onChange('text', this._text, text);
    this._text = text;
  }
}
