import { ChangeEvent } from './changeevent';

export class Changeable {
  private handlers = [];
  addChangeHandler(callback: (event: ChangeEvent) => any) {
    this.handlers.push(callback);
  }
  removahangeHandler(callback: (event: ChangeEvent) => any) {
    this.handlers.splice(this.handlers.indexOf(callback));
  }

  onChange(name, oldValue, newValue) {
    const event = new ChangeEvent(name, oldValue, newValue);
    this.handlers.forEach(value =>  {
      value(event);
    });
  }
}
