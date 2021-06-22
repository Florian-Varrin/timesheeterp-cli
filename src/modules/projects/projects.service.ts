import { Command } from '@oclif/command';
import axios from 'axios';
import { cli } from 'cli-ux'
import { ConfigService } from '../config/config.service';
import { LoginService } from '../login/login.service';
import { DisplayService } from '../common/display.service';
import { HttpService } from '../common/http.service';
import * as inquirer from 'inquirer';
import { ProjectType } from './project.type';

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

  async select(idOnly = true): Promise<number | ProjectType> {
    const projects = await this.getAll();
    const choices = projects.map((project: ProjectType) => ({
      name: `${project.id} | ${project.name}`,
      value: idOnly ? project.id : project,
    }));

    const { project } = await inquirer.prompt({
      type: 'list',
      name: 'project',
      choices,
    });

    return project;
  }

  async getAll(): Promise<ProjectType[]> {
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
      return [];
    }
  }

  async get(id: number): Promise<ProjectType | null> {
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

  async update(id: number, project: ProjectType) {
    try {
      const headers = await this.httpService.getAuthHeaders();
      const result = await axios({
        method: 'PATCH',
        url: `${this.apiUrl}/${id}`,
        headers,
        data: project,
      });

      if (result.status !== 200) throw new Error('An error occurred');

      this.displayService.displaySuccess(`Project with id "${id}" edited`);
    } catch (error) {
      this.displayService.displayError('An error occurred');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async list(flags: import('cli-ux/lib/styled/table').table.Options) {
    try {
      const projects = await this.getAll();

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
