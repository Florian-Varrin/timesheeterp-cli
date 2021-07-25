import { Command, flags } from '@oclif/command';
import { DisplayService } from '../../modules/common/display.service';
import { ProjectsService } from '../../modules/projects/projects.service';
import * as inquirer from 'inquirer';
import { ClocksService } from '../../modules/clocks/clocks.service';

export default class ClocksDelete extends Command {
  static description = 'delete a clock';

  static aliases = ['clock:delete', 'clk:delete'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
    force: flags.boolean({ default: false }),
  };

  async run() {
    let { id } = this.parse(ClocksDelete).flags;
    const { force } = this.parse(ClocksDelete).flags;

    const displayService = new DisplayService(this);
    const clocksService = new ClocksService(this);

    if (!id) {
      id = await clocksService.select() as number;
    }

    if (!force) {
      const { validated } = await inquirer.prompt({
        type: 'confirm',
        name: 'validated',
        message: `Are you sure you want to delete clock ${id}?`,
        default: false,
      });

      if (!validated) displayService.displayError('Deletion aborted');
    }

    await clocksService.delete(id);
  }
}
