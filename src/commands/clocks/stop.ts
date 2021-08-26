import { Command, flags } from '@oclif/command';
import { ClocksService } from '../../modules/clocks/clocks.service';
import { ClocksType } from '../../modules/clocks/clocks.type';

export default class ClocksStop extends Command {
  static description = 'stop a clock';

  static aliases = ['clock:stop', 'clk:stop'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
    all: flags.boolean({ description: 'Stop all clocks' }),
  };

  async run() {
    const { id, all } = this.parse(ClocksStop).flags;

    const clocksService = new ClocksService(this);

    if (all) {
      await clocksService.stopAll();
      return;
    }

    const clock = id
      ? await clocksService.get(Number(id), { hydrated: false }) as ClocksType
      : await clocksService.select(false, [], { status: 'stopped', hydrated: false }) as ClocksType;

    await clocksService.stop(clock.id);
  }
}
