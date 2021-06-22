import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ProjectsService } from '../../modules/projects/projects.service';
import { DisplayService } from '../../modules/common/display.service';

export default class ProjectsDelete extends Command {
  static description = 'delete a project';

  static aliases = ['project:delete', 'prj:delete'];

  static flags = {
    id: flags.integer({ description: 'Id of the project' }),
    force: flags.boolean({ default: false }),
  };

  async run() {
    let { id } = this.parse(ProjectsDelete).flags;
    const { force } = this.parse(ProjectsDelete).flags;

    const displayService = new DisplayService(this);
    const projectService = new ProjectsService(this);

    if (!id) {
      id = await projectService.select() as number;
    }

    if (!force) {
      const { validated } = await inquirer.prompt({
        type: 'confirm',
        name: 'validated',
        message: `Are you sure you want to delete project ${id}?`,
        default: false,
      });

      if (!validated) displayService.displayError('Deletion aborted');

      await projectService.delete(id);
    }
  }
}
