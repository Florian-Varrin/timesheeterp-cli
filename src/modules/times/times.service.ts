import { Command } from '@oclif/command';
import { TimeType } from './time.type';
import axios from 'axios';
import { cli } from 'cli-ux';
import { ProjectType } from '../projects/project.type';
import * as inquirer from 'inquirer';
import { AbstractService } from '../common/abstract.service';

export class TimesService extends AbstractService {
  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.apiUrl += 'projects';
  }

  async create(projectId: number, time: TimeType): Promise<TimeType | null> {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'POST',
        url: `${this.apiUrl}/${projectId}/times`,
        headers,
        data: time,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.toString() || 'An unknown error occurred');
      return null;
    }
  }

  async get(projectId: number, timeId: number): Promise<TimeType | null> {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: `${this.apiUrl}/${projectId}/times/${timeId}`,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.toString());
      return null;
    }
  }

  async getAll(projectId: number): Promise<TimeType[]> {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: `${this.apiUrl}/${projectId}/times`,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.toString() || 'An unknown error occurred');
      return [];
    }
  }

  async select(idOnly = true, projectId: number): Promise<number | TimeType> {
    const times = await this.getAll(projectId);

    const choices = times.map((time: TimeType) => ({
      name: `${time.id} | ${time.description} (${time.duration})`,
      value: idOnly ? time.id : time,
    }));

    const { time } = await inquirer.prompt({
      type: 'list',
      name: 'time',
      choices,
    });

    return time;
  }

  async update(projectId: number, timeId: number, time: TimeType) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'PATCH',
        url: `${this.apiUrl}/${projectId}/times/${timeId}`,
        headers,
        data: time,
      });

      if (result.status !== 200) throw new Error('An error occurred');

      this.displayService.displaySuccess(`Time with id "${timeId}" edited`);
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  async delete(projectId: number, timeId: number) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'DELETE',
        url: `${this.apiUrl}/${projectId}/times/${timeId}`,
        headers,
      });

      if (result.status !== 204) throw new Error('An error occured');

      this.displayService.displaySuccess(`Project with id "${timeId}" deleted`);
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  async list(times: TimeType[], project: ProjectType, flags: import('cli-ux/lib/styled/table').table.Options) {
    try {
      const joinedTimes = times.map((time) => ({
        ...time,
        project_name: project.name,
        project_hour_rate: project.hour_rate,
      }));

      cli.table(joinedTimes, {
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
      }, {
        printLine: this.oclifContext.log,
        ...flags,
      });
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }
}
