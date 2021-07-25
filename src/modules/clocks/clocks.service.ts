import { Command } from '@oclif/command';
import axios from 'axios';
import { cli } from 'cli-ux';
import { AbstractService } from '../common/abstract.service';
import { ClocksType } from './clocks.type';
import { ProjectType } from '../projects/project.type';
import * as inquirer from 'inquirer';
import { EventTypeEnum } from './event-type.enums';

export class ClocksService extends AbstractService {

  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.apiUrl += 'clocks';
  }

  // eslint-disable-next-line consistent-return
  async create(name: string) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'POST',
        url: this.apiUrl,
        headers,
        data: { name },
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  async get(id: number): Promise<ClocksType | null> {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: `${this.apiUrl}/${id}`,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
      return null;
    }
  }

  async getAll(): Promise<ClocksType[]> {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: this.apiUrl,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
      return [];
    }
  }

  async update(id: number, clock: ClocksType) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'PATCH',
        url: `${this.apiUrl}/${id}`,
        headers,
        data: clock,
      });

      if (result.status !== 200) throw new Error('An error occurred');

      this.displayService.displaySuccess(`Clock with id "${id}" edited`);
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  async delete(id: number) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'DELETE',
        url: `${this.apiUrl}/${id}`,
        headers,
      });

      if (result.status !== 204) throw new Error('An error occured');

      this.displayService.displaySuccess(`Clock with id "${id}" deleted`);
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  async select(idOnly = true): Promise<number | ClocksType> {
    const clocks = await this.getAll();
    const choices = clocks.map((clock: ClocksType) => ({
      name: `${clock.id} | ${clock.name}`,
      value: idOnly ? clock.id : clock,
    }));

    const { clock } = await inquirer.prompt({
      type: 'list',
      name: 'clock',
      choices,
    });

    return clock;
  }

  // eslint-disable-next-line class-methods-use-this
  async list(clocks: ClocksType[], flags: import('cli-ux/lib/styled/table').table.Options) {
    try {
      // eslint-disable-next-line no-param-reassign
      const formattedClocks = clocks.map((clock) => {
        // eslint-disable-next-line camelcase
        const formatted_time = this.dateService.formatTime(clock.current_time);
        const lastEvent = clock.events
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .reverse()[0];

        let status = 'STOPPED';
        if (lastEvent && lastEvent.type === EventTypeEnum.START) status = 'RUNNING';

        return {
          ...clock,
          formatted_time,
          status,
        };
      });

      cli.table(formattedClocks, {
        id: {
          header: 'ID',
          minWidth: 10,
        },
        name: {
          header: 'NAME',
          minWidth: 25,
        },
        formatted_time: {
          header: 'CURRENT TIME',
          minWidth: 25,
        },
        status: {
          header: 'STATUS',
          minWidth: 25,
        },
      }, {
        printLine: this.oclifContext.log,
        ...flags,
      });
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  async start(id: number) {
    try {
      const headers = await this.httpService.getAuthHeaders();

      const result = await axios({
        method: 'POST',
        url: `${this.apiUrl}/${id}/start`,
        headers,
      });

      if (result.status !== 201) throw new Error('An error occurred');

      const { current_time: currentTime } = result.data;

      const formattedTime = this.dateService.formatTime(currentTime);
      this.displayService.displaySuccess(`Clock with id "${id}" started, current time is ${formattedTime}`);
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  async stop(id: number) {
    try {
      const headers = await this.httpService.getAuthHeaders();

      const result = await axios({
        method: 'POST',
        url: `${this.apiUrl}/${id}/stop`,
        headers,
      });

      if (result.status !== 201) throw new Error('An error occurred');

      const { current_time: currentTime } = result.data;

      const formattedTime = this.dateService.formatTime(currentTime);
      this.displayService.displaySuccess(`Clock with id "${id}" stopped, current time is ${formattedTime}`);
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }
}
