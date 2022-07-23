import { Command, flags } from '@oclif/command';
import { ClocksService } from '../../modules/clocks/clocks.service';
import { ClocksType } from '../../modules/clocks/clocks.type';

export default class ClocksReset extends Command {
  static description = 'reset a clock';

  static aliases = ['clock:reset', 'clk:reset'];

  static flags = {
    id: flags.integer({ description: 'Id of the clock' }),
    start: flags.boolean({ char: 's', description: 'Start the clock after reset', default: false }),
    all: flags.boolean({ description: 'Reset all clocks' }),
  };

  async resetAll(clocksService: ClocksService): Promise<ClocksType[]> {
    return clocksService.resetAll();
  }

  async resetOne(clocksService: ClocksService, id: number|undefined): Promise<ClocksType | null> {
    const clock = id
      ? await clocksService.get(Number(id), { hydrated: false }) as ClocksType
      : await clocksService.select(false, [], { hydrated: false }) as ClocksType;

    return clocksService.reset(clock.id);
  }

  async run() {
    const { id, start, all } = this.parse(ClocksReset).flags;

    const clocksService = new ClocksService(this);

    const resetClocks = all
      ? await this.resetAll(clocksService)
      : [await this.resetOne(clocksService, id)];

    if (!resetClocks) return;

    const promises = resetClocks.map((clock) => {
      if (clock && clock.status !== 'RUNNING' && start) return clocksService.start(clock.id);
      return null;
    });
    await Promise.all(promises);
  }
}
