import { Command } from '@oclif/command';
import { cli } from 'cli-ux';
import { ClocksService } from '../../modules/clocks/clocks.service';

export default class ClocksList extends Command {
  static description = 'list clocks';

  static aliases = ['clock:list', 'clk:list'];

  static flags = {
    ...cli.table.flags(),
  };

  async run() {
    const { flags } = this.parse(ClocksList);

    const clocksService = new ClocksService(this);

    const projects = await clocksService.getAll();
    await clocksService.list(projects, flags);
  }
}
