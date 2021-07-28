import { Command } from '@oclif/command';
import { ProjectCreateDto, ProjectType } from './project.type';
import { AbstractResourceService } from '../common/abstract-resource.service';

export class ProjectsService extends AbstractResourceService<ProjectType, ProjectCreateDto> {
  constructor(protected oclifContext: Command) {
    super(oclifContext);

    this.apiUrl += 'projects';

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
}
