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

  // eslint-disable-next-line class-methods-use-this
  formatTime(time: number) {
    let minutesNumber: number | string = Math.floor(time / 60);

    let hoursNumber: number | string = 0;
    if (minutesNumber > 60) {
      hoursNumber = Math.floor(minutesNumber / 60);

      minutesNumber -= (hoursNumber * 60);
    }

    let secondsNumber: number | string = time - ((hoursNumber * 60 * 60) + (minutesNumber * 60));

    if (hoursNumber < 10) hoursNumber = `0${hoursNumber}`;
    if (minutesNumber < 10) minutesNumber = `0${minutesNumber}`;
    if (secondsNumber < 10) secondsNumber = `0${secondsNumber}`;

    return `${hoursNumber}:${minutesNumber}:${secondsNumber}`;
  }
}
