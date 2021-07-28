import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import axios from 'axios';
import { cli } from 'cli-ux';
import { DisplayService } from './display.service';
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import { HttpService } from './http.service';
import { DateService } from './date.service';

export abstract class AbstractResourceService<T, U> {
  protected apiUrl: string;

  protected resourceName: string;

  protected displayService: DisplayService;

  protected configService: ConfigService;

  protected loginService: LoginService;

  protected httpService: HttpService;

  protected dateService: DateService;

  protected columns: {};

  protected isSubResource: boolean;

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

    this.apiUrl = `${host}/api/v${apiVersion}/`;
  }

  // eslint-disable-next-line consistent-return
  async create(createDto: U) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'POST',
        url: this.apiUrl,
        headers,
        data: createDto,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError(error.response.data.message || error.toString() || 'An unknown error occurred');
    }
  }

  async get(id: number): Promise<T | null> {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: `${this.apiUrl}/${id}`,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError('An error occurred');
      return null;
    }
  }

  async getAll(topResourceId?: number): Promise<T[]> {
    const apiUrl = this.isSubResource
      ? `${this.apiUrl}/${topResourceId}`
      : this.apiUrl;

    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'GET',
        url: apiUrl,
        headers,
      });

      return result.data;
    } catch (error) {
      this.displayService.displayError('An error occurred');
      return [];
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

      this.displayService.displaySuccess(`${this.resourceName} with id "${id}" deleted`);
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  async update(id: number, resource: T) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'PATCH',
        url: `${this.apiUrl}/${id}`,
        headers,
        data: resource,
      });

      if (result.status !== 200) throw new Error('An error occurred');

      this.displayService.displaySuccess(`${this.resourceName} with id "${id}" edited`);
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  async select(idOnly = true): Promise<number | T> {
    const resources = await this.getAll();

    const choices = resources.map((resource: T) => ({
      // @ts-ignore
      name: `${resource.id} | ${resource.name}`,
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
}
