import { Command } from '@oclif/command';
import { ProjectCreateDto, ProjectType } from './project.type';
import { AbstractResourceService } from '../abstract/abstract-resource.service';

export class ProjectsService
  extends AbstractResourceService<ProjectType, ProjectCreateDto>
  implements ResourceCrudInterface<ProjectType, ProjectCreateDto> {
  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.resourceName = 'Project';

    this.columns = {
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
    };
  }

  async create(createDto: ProjectCreateDto): Promise<ProjectType | null> {
    try {
      const client = await this.createClient();
      const project = await client.projectService.create(createDto);

      this.displayService.displaySuccess(`${this.resourceName} with id "${project.id}" was created`);

      return project;
    } catch (error) {
      this.displayError(error);

      return null;
    }
  }

  async get(projectId: number, parameters = {}): Promise<ProjectType | null> {
    try {
      const client = await this.createClient();

      return client.projectService.findOneById(projectId, parameters);
    } catch (error) {
      this.displayError(error);

      return null;
    }
  }

  async getAll(parameters = {}): Promise<ProjectType[]> {
    try {
      const client = await this.createClient();

      return client.projectService.findAll(parameters);
    } catch (error) {
      this.displayError(error);

      return [];
    }
  }

  async update(projectId: number, project: ProjectType): Promise<void> {
    try {
      const client = await this.createClient();
      await client.projectService.update(projectId, project);

      this.displayService.displaySuccess(`${this.resourceName} with id "${projectId}" deleted`);
    } catch (error) {
      this.displayError(error);
    }
  }

  async delete(projectId: number): Promise<void> {
    try {
      const client = await this.createClient();
      await client.projectService.remove(projectId);

      this.displayService.displaySuccess(`${this.resourceName} with id "${projectId}" deleted`);
    } catch (error) {
      this.displayError(error);
    }
  }
}
