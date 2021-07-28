import * as moment from 'moment';

export class ToDoDto {
  id: number;
  name: string;

  constructor(name: string) {
    const uid = moment().valueOf();
    this.id = uid;
    this.name = name;
  }
}
