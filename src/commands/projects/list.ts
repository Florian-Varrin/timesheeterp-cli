import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import { ProjectsService } from '../../modules/projects/projects.service';

export default class ProjectsList extends Command {
  static description = 'list projects';

  static aliases = ['project:list', 'prj:list'];

  static flags = {
    ...cli.table.flags(),
  }

  static args = [{ name: 'file' }];

  async run() {
    const { flags } = this.parse(ProjectsList);

    const projectService = new ProjectsService(this);

    const projects = await projectService.getAll();
    await projectService.list(projects, flags);
  }
}
