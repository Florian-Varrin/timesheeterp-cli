import { Command } from '@oclif/command';
import { TimeType } from './time.type';
import { HttpService } from '../common/http.service';
import { DisplayService } from '../common/display.service';
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import axios from 'axios';

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
}
