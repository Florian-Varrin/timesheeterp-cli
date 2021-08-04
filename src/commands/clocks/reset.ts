import { Command, flags } from '@oclif/command';
import { ClocksService } from '../../modules/clocks/clocks.service';
import { ClocksType } from '../../modules/clocks/clocks.type';

export default class ClocksReset extends Command {
  static description = 'reset a clock';

  static aliases = ['clock:reset', 'clk:reset'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
    start: flags.boolean({ char: 's', description: 'Start the clock after reset', default: false }),
  };

  async run() {
    const { id, start } = this.parse(ClocksReset).flags;

    const clocksService = new ClocksService(this);

    const clock = id
      ? await clocksService.get(Number(id), { hydrated: false }) as ClocksType
      : await clocksService.select(false, { hydrated: false }) as ClocksType;

    await clocksService.reset(clock.id);

    if (clock.status !== 'RUNNING' && start) await clocksService.start(clock.id);
  }
}
