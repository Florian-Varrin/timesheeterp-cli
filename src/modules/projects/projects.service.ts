import { Command } from '@oclif/command';
import axios from 'axios';
import { cli } from 'cli-ux'
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import { DisplayService } from '../common/display.service';
import { HttpService } from '../common/http.service';

export class ProjectsService {
  private readonly apiUrl: string;

  private displayService: DisplayService;

  private configService: ConfigService;

  private loginService: LoginService;

  private httpService: HttpService;

  constructor(private oclifContext: Command) {
    this.displayService = new DisplayService(oclifContext);
    this.configService = new ConfigService(oclifContext);
    this.loginService = new LoginService(oclifContext);
    this.httpService = new HttpService(oclifContext);

    const { host, apiVersion } = this.configService.getAllConfig();

    this.apiUrl = `${host}/api/v${apiVersion}/projects`;
  }

  // eslint-disable-next-line consistent-return
  async create(name: string, hourRate: number) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'POST',
        url: this.apiUrl,
        headers,
        data: {
          name,
          hour_rate: hourRate,
        },
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.toString() || 'An unknown error occurred');
    }
  }

  async get() {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: this.apiUrl,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError('An error occurred');
      return null;
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

      this.displayService.displaySuccess(`Project with id "${id}" deleted`);
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async list(flags: import('cli-ux/lib/styled/table').table.Options) {
    try {
      const projects = await this.get();

      cli.table(projects, {
        id: {
          header: 'ID',
          minWidth: 10,
        },
        name: {
          header: 'NAME',
          minWidth: 25,
        },
        hour_rate: {
          header: 'HOUR RATE',
          extended: true,
          minWidth: 10,
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
