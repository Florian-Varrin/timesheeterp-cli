import { Command } from '@oclif/command';
import * as chalk from 'chalk';

export class DisplayService {
  constructor(private oclifContext: Command) {}

  displaySuccess(message: string) {
    this.oclifContext.log(chalk.green(message));
  }

  displayError(message: string, commandToRun?: string) {
    if (!commandToRun) this.oclifContext.error(chalk.red(message));

    const error = chalk.red(message);
    const command = chalk.gray(commandToRun);

    this.oclifContext.error(`${error} ${command}`);
  }
}
