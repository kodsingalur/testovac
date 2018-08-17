import { Adjustable } from './adjustable';
import { Exercise } from '../runing/exercise';

export abstract class TaskPanel extends Adjustable {
      static typeOfAdjustable = 'TaskPanel';

  exercise: Exercise;
}
