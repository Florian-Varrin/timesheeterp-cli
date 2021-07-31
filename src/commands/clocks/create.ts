import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ClocksService } from '../../modules/clocks/clocks.service';
import { ClocksType } from '../../modules/clocks/clocks.type';

export default class ClockCreate extends Command {
  static description = 'create a clock';

  static aliases = ['clock:create', 'clk:create'];

  static flags = {
    name: flags.string({ char: 'n', description: 'name of the clock' }),
    start: flags.boolean({ char: 's', description: 'Start the clock after creation', default: false }),
  };

  async run() {
    const { name, start } = this.parse(ClockCreate).flags;

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

    const clock: ClocksType = await clocksService.create({ name: name || answers.name });

    if (start) await clocksService.start(clock.id);
  }
}
