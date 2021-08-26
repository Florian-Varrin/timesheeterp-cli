import { Command } from '@oclif/command';
import { AbstractResourceService } from '../abstract/abstract-resource.service';
import { ClocksCreateDto, ClocksType } from './clocks.type';

export class ClocksService extends AbstractResourceService<ClocksType, ClocksCreateDto> {
  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.resourceName = 'Clock';

    this.columns = {
      id: {
        header: 'ID',
        minWidth: 10,
      },
      name: {
        header: 'NAME',
        minWidth: 25,
      },
      current_time_formatted: {
        header: 'CURRENT TIME',
        minWidth: 25,
      },
      status: {
        header: 'STATUS',
        minWidth: 25,
      },
    };
  }

  async create(createDto: ClocksCreateDto): Promise<ClocksType | null> {
    try {
      const client = await this.createClient();
      const clock = await client.clockService.create(createDto);

      this.displayService.displaySuccess(`${this.resourceName} with id "${clock.id}" was created`);

      return clock;
    } catch (error) {
      this.displayError(error);

      return null;
    }
  }

  async get(clockId: number, parameters = {}): Promise<ClocksType | null> {
    try {
      const client = await this.createClient();

      return client.clockService.findOneById(clockId, parameters);
    } catch (error) {
      this.displayError(error);

      return null;
    }
  }

  async getAll(parameters = {}): Promise<ClocksType[]> {
    try {
      const client = await this.createClient();

      return client.clockService.findAll(parameters);
    } catch (error) {
      this.displayError(error);

      return [];
    }
  }

  async update(clockId: number, clock: ClocksType): Promise<void> {
    try {
      const client = await this.createClient();
      await client.projectService.update(clockId, clock);

      this.displayService.displaySuccess(`${this.resourceName} with id "${clockId}" deleted`);
    } catch (error) {
      this.displayError(error);
    }
  }

  async delete(clockId: number): Promise<void> {
    try {
      const client = await this.createClient();
      await client.clockService.remove(clockId);

      this.displayService.displaySuccess(`${this.resourceName} with id "${clockId}" deleted`);
    } catch (error) {
      this.displayError(error);
    }
  }

  async start(clockId: number) {
    try {
      const client = await this.createClient();
      const clock = await client.clockService.start(clockId);

      const { current_time_formatted: currentTime } = clock;

      this.displayService.displaySuccess(`Clock with id "${clockId}" started, current time is ${currentTime}`);
    } catch (error) {
      this.displayError(error);
    }
  }

  async stop(clockId: number) {
    try {
      const client = await this.createClient();
      const clock = await client.clockService.stop(clockId);

      const { current_time_formatted: currentTime } = clock;

      this.displayService.displaySuccess(`Clock with id "${clockId}" stopped, current time is ${currentTime}`);
    } catch (error) {
      this.displayError(error);
    }
  }

  async stopAll() {
    try {
      const client = await this.createClient();
      const clocks = await client.clockService.stopAll();

      clocks.forEach((clock) => {
        const { current_time_formatted: currentTime } = clock;
        this.displayService.displaySuccess(`Clock with id "${clock.id}" stopped, current time is ${currentTime}`);
      });
    } catch (error) {
      this.displayError(error);
    }
  }

  async reset(clockId: number) {
    try {
      const client = await this.createClient();
      const clock = await client.clockService.reset(clockId);

      const { status } = clock;

      this.displayService.displaySuccess(`Clock with id "${clockId}" has been reset, clock is ${status.toLowerCase()}`);
    } catch (error) {
      this.displayError(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatSelectName(resource: ClocksType): string {
    return `${super.formatSelectName(resource)} | ${resource.current_time_formatted} | ${resource.status}`;
  }
}
