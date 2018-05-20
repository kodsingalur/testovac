import { Exercise } from './exercise';
import { Answer } from './answer';
import { QuestionDefinition } from '../question-definition';
import { AnswerDefinition } from '../answer-definition';

export class Question {
  definition: QuestionDefinition;
  exercise: Exercise;
  answers: Answer[]= [];
  right: boolean;

  private _answered: boolean;

  get answered(): boolean{
    return this._answered;
  }
  set answered(value: boolean){
    this._answered = value;
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
