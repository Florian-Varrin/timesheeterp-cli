import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ProjectsService } from '../../modules/projects/projects.service';
import { ProjectType } from '../../modules/projects/project.type';
import { ClocksService } from '../../modules/clocks/clocks.service';

export default class ClocksEdit extends Command {
  static description = 'edit a clock';

  static aliases = ['clock:edit', 'clk:edit'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
  };

  async run() {
    const { id } = this.parse(ClocksEdit).flags;

    const clocksService = new ClocksService(this);

    const clock = id
      ? await clocksService.get(Number(id)) as ProjectType
      : await clocksService.select(false) as ProjectType;

    const editedClock: ProjectType = {
      ...await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          default: clock.name,
        },
      ]),
      user_id: clock.user_id,
      id: clock.id,
    };

    await clocksService.update(clock.id, editedClock);
  }
}
