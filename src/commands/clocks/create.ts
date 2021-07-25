import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ClocksService } from '../../modules/clocks/clocks.service';

export default class ClockCreate extends Command {
  static description = 'create a clock';

  static aliases = ['clock:create', 'clk:create'];

  static flags = {
    name: flags.string({ char: 'n', description: 'name of the clock' }),
  };

  async run() {
    const { name } = this.parse(ClockCreate).flags;

    const questions = [];
    if (!name) {
      questions.push({
        type: 'input',
        name: 'name',
        message: 'Clock name: ',
      });
    }

    const answers = await inquirer.prompt(questions);

    const clocksService = new ClocksService(this);

    const clock = await clocksService.create(name || answers.name);

    this.log(`Clock "${clock.name}" with id "${clock.id}" was created`);
  }
}
