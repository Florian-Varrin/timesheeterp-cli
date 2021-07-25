import { Command } from '@oclif/command';
import { DisplayService } from './display.service';
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import { HttpService } from './http.service';
import { DateService } from './date.service';

export abstract class AbstractService {
  protected apiUrl: string;

  protected displayService: DisplayService;

  protected configService: ConfigService;

  protected loginService: LoginService;

  protected httpService: HttpService;

  protected dateService: DateService;

  protected constructor(protected oclifContext: Command) {
    this.displayService = new DisplayService(oclifContext);
    this.configService = new ConfigService(oclifContext);
    this.loginService = new LoginService(oclifContext);
    this.httpService = new HttpService(oclifContext);
    this.dateService = new DateService(oclifContext);

    const { host, apiVersion } = this.configService.getAllConfig();

    this.apiUrl = `${host}/api/v${apiVersion}/`;
  }
}
