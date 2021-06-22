import { Command } from '@oclif/command';
import { TimeType } from './time.type';
import { HttpService } from '../common/http.service';
import { DisplayService } from '../common/display.service';
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import axios from 'axios';
import { cli } from 'cli-ux';
import { ProjectType } from '../projects/project.type';

export class TimesService {
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

  async get(projectId: number, start?: string, end?: string): Promise<TimeType[]> {
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
          minWidth: 10,
        },
        duration: {
          header: 'DURATION',
          minWidth: 10,
        },
        description: {
          header: 'DESCRIPTION',
          minWidth: 25,
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
