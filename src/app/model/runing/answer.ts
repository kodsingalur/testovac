import { Exercise } from './exercise';
import { Question } from './question';
import { AnswerDefinition } from 'app/model/definitions/answer-definition';

export class Answer {
  definition: AnswerDefinition;
  question: Question;
  text: string;
  private _answered: boolean;

  get answered(): boolean{
    return this._answered;
  }
  set answered(value: boolean){
    this._answered = value;
    this.question.answered = this.question.answers.every((answer) =>  {
      return answer.answered;
    });
  }
}
