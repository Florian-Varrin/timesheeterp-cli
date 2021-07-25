import { Command, flags } from '@oclif/command';
import { ClocksService } from '../../modules/clocks/clocks.service';
import { ProjectType } from '../../modules/projects/project.type';
import { ClocksType } from '../../modules/clocks/clocks.type';

export default class ClocksStart extends Command {
  static description = 'start a clock';

  static aliases = ['clock:start', 'clk:start'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
  };

  async run() {
    const { id } = this.parse(ClocksStart).flags;

    const clocksService = new ClocksService(this);

    const clock = id
      ? await clocksService.get(Number(id)) as ClocksType
      : await clocksService.select(false) as ClocksType;

    await clocksService.start(clock.id);
  }
}
