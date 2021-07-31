import { Command } from '@oclif/command';
import axios from 'axios';
import { AbstractResourceService } from '../common/abstract-resource.service';
import { ClocksCreateDto, ClocksType } from './clocks.type';

export class ClocksService extends AbstractResourceService<ClocksType, ClocksCreateDto> {
  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.apiUrl += 'clocks';

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

  async start(id: number) {
    try {
      const headers = await this.httpService.getAuthHeaders();

      const result = await axios({
        method: 'POST',
        url: `${this.apiUrl}/${id}/start`,
        headers,
      });

      if (result.status !== 201) throw new Error('An error occurred');

      const { current_time_formatted: currentTime } = result.data;

      this.displayService.displaySuccess(`Clock with id "${id}" started, current time is ${currentTime}`);
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

      const { current_time_formatted: currentTime } = result.data;

      this.displayService.displaySuccess(`Clock with id "${id}" stopped, current time is ${currentTime}`);
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatSelectName(resource: ClocksType): string {
    return `${super.formatSelectName(resource)} | ${resource.current_time_formatted} | ${resource.status}`;
  }
}
