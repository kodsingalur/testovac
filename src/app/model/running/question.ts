import { Changeable } from '../changeable/changeable';
import { Exercise } from './exercise';
import { Answer } from './answer';
import { QuestionDefinition } from 'app/model/definitions/question-definition';
import { AnswerDefinition } from 'app/model/definitions/answer-definition';

export class Question extends Changeable {
  definition: QuestionDefinition;
  exercise: Exercise;
  answers: Answer[]= [];

  private _right: boolean;
  get right(): boolean {
    return this._right;
  }
  set right(right: boolean) {
    this.onChange('right', this._right, right);
    this._right = right;
  }

  private _answered: boolean;
  get answered(): boolean{
    return this._answered;
  }
  set answered(answered: boolean){
    this.onChange('answered', this._answered, answered);

    this._answered = answered;

    // TODO - vymazat, do callbacku
    if (this._answered) {
      (new this.exercise.task.rightAnswerAlgorithm.type()).run(this);
    }
    this.exercise.answered = this.exercise.questions.every((question) =>  {
      return question.answered;
    });

  }
  /**
   * vytvori odpoved a pripoji ji k teto otazce
   */
  createAnswer(answerDefinition: AnswerDefinition): Answer {
    const answer: Answer = new Answer();
    answer.definition = answerDefinition;
    answer.question = this;
    this.answers.push(answer);
    return answer;
  }
}
