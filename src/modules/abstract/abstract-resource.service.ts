import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import { cli } from 'cli-ux';
import Timesheeterp, { AxiosError } from 'timesheeterp-js-sdk';
import { DisplayService } from '../common/display.service';
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import { HttpService } from '../common/http.service';
import { DateService } from '../common/date.service';

export abstract class AbstractResourceService<T, U> {
  protected host: string;

  protected apiVersion: number;

  protected resourceName: string;

  protected displayService: DisplayService;

  protected configService: ConfigService;

  protected loginService: LoginService;

  protected httpService: HttpService;

  protected dateService: DateService;

  protected columns: {};

  protected isSubResource: boolean;

  // @ts-ignore
  protected constructor(protected oclifContext: Command) {
    this.displayService = new DisplayService(oclifContext);
    this.configService = new ConfigService(oclifContext);
    this.loginService = new LoginService(oclifContext);
    this.httpService = new HttpService(oclifContext);
    this.dateService = new DateService(oclifContext);
    this.columns = {};
    this.isSubResource = false;
    this.resourceName = 'Resource';

    const { host, apiVersion } = this.configService.getAllConfig();

    this.host = host;
    this.apiVersion = +apiVersion;
  }

  async createClient(): Promise<Timesheeterp> {
    // @ts-ignore
    const accessToken = await this.loginService.getAccessToken();
    return new Timesheeterp(this.host, this.apiVersion, accessToken);
  }

  async select(idOnly = true, getAllParameters?: any[], parameters = {}): Promise<number | T> {
    const resources = getAllParameters
      // @ts-ignore
      ? await this.getAll(...getAllParameters as [], parameters)
    // @ts-ignore
      : await this.getAll(parameters);

    const choices = resources.map((resource: T) => ({
      // @ts-ignore
      name: this.formatSelectName(resource),
      // @ts-ignore
      value: idOnly ? resource.id : resource,
    }));

    const { resource } = await inquirer.prompt({
      type: 'list',
      name: 'resource',
      choices,
    });

    return resource;
  }

  // eslint-disable-next-line class-methods-use-this
  async list(resources: T[], flags: import('cli-ux/lib/styled/table').table.Options) {
    try {
      // @ts-ignore
      cli.table(resources, this.columns, {
        printLine: this.oclifContext.log,
        ...flags,
      });
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatSelectName(resource: T): string {
    // @ts-ignore
    return `${resource.id} | ${resource.name}`;
  }

  displayError(error: AxiosError) {
    this.displayService.displayError(error?.response?.data?.message || error.toString() || 'An unknown error occurred');
  }
}
