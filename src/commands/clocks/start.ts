import { Command, flags } from '@oclif/command';
import { ClocksService } from '../../modules/clocks/clocks.service';
import { ClocksType } from '../../modules/clocks/clocks.type';

export default class ClocksStart extends Command {
  static description = 'start a clock';

  static aliases = ['clock:start', 'clk:start'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
    'stop-all': flags.boolean({ description: 'Stop all other clocks' }),
  };

  async run() {
    const { id, 'stop-all': stopAll } = this.parse(ClocksStart).flags;

    const clocksService = new ClocksService(this);

    const clock = id
      ? await clocksService.get(Number(id), { hydrated: false }) as ClocksType
      : await clocksService.select(false, [], { status: 'stopped', hydrated: false }) as ClocksType;

    if (stopAll) {
      await clocksService.stopAll();
    }
    await clocksService.start(clock.id);
  }
}
