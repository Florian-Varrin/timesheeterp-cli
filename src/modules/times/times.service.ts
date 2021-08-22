import { Command } from '@oclif/command';
import { TimeCreateDto, TimeType } from './time.type';
import { AbstractResourceService } from '../abstract/abstract-resource.service';
import { CreateTimeDto } from '../../../../timesheeterp-client-js-sdk/dist/timesheet/times/dto/create-time.dto';
import { ProjectType } from '../projects/project.type';

export class TimesService
  extends AbstractResourceService<TimeType, CreateTimeDto>
  implements SubresourceCrudInterface<TimeType, CreateTimeDto> {
  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.resourceName = 'Time';

    this.columns = {
      id: {
        header: 'ID',
        minWidth: 10,
      },
      project_name: {
        header: 'PROJECT NAME',
        extended: true,
        minWidth: 15,
      },
      project_hour_rate: {
        header: 'HOUR RATE',
        extended: true,
        minWidth: 10,
      },
      date: {
        header: 'DATE',
        minWidth: 15,
      },
      duration: {
        header: 'DURATION',
        minWidth: 10,
      },
      description: {
        header: 'DESCRIPTION',
        minWidth: 45,
      },
    };
  }

  async create(projectId: number, createDto: TimeCreateDto): Promise<TimeType | null> {
    try {
      const client = await this.createClient();
      const time = await client.timeService.create(projectId, createDto);

      this.displayService.displaySuccess(`${this.resourceName} with id "${time.id}" was created`);

      return time;
    } catch (error) {
      this.displayError(error);

      return null;
    }
  }

  async get(projectId: number, clockId: number, parameters = {}): Promise<TimeType | null> {
    try {
      const client = await this.createClient();

      return client.timeService.findOneById(projectId, clockId, parameters);
    } catch (error) {
      this.displayError(error);

      return null;
    }
  }

  async getAll(projectId: number, parameters = {}): Promise<TimeType[]> {
    try {
      const client = await this.createClient();

      return client.timeService.findAll(projectId, parameters);
    } catch (error) {
      this.displayError(error);

      return [];
    }
  }

  async update(projectId: number, timeId: number, time: TimeType): Promise<void> {
    try {
      const client = await this.createClient();
      await client.timeService.update(projectId, timeId, time);

      this.displayService.displaySuccess(`${this.resourceName} with id "${timeId}" deleted`);
    } catch (error) {
      this.displayError(error);
    }
  }

  async delete(projectId: number, timeId: number): Promise<void> {
    try {
      const client = await this.createClient();
      await client.timeService.remove(projectId, timeId);

      this.displayService.displaySuccess(`${this.resourceName} with id "${timeId}" deleted`);
    } catch (error) {
      this.displayError(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatResourceForListing(times: TimeType[], project: ProjectType): any {
    return times.map((time) => ({
      ...time,
      project_name: project.name,
      project_hour_rate: project.hour_rate,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  formatSelectName(time: TimeType): string {
    // @ts-ignore
    return `${time.id} | ${time.description}`;
  }
}
