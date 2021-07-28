import { Command } from '@oclif/command';

export class DateService {
  constructor(private oclifContext: Command) {}

  // eslint-disable-next-line class-methods-use-this
  formatDate(date: Date) {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    const year = date.getFullYear().toString();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return `${year}-${month}-${day}`;
  }
}
