import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ProjectsService } from '../../modules/projects/projects.service';
import { DisplayService } from '../../modules/common/display.service';

export default class ProjectsDelete extends Command {
  static description = 'delete a project';

  static aliases = ['project:delete', 'prj:delete'];

  static flags = {
    id: flags.string({ description: 'Id of the project' }),
    force: flags.boolean({ default: false }),
  };

  async run() {
    let { id } = this.parse(ProjectsDelete).flags;
    const { force } = this.parse(ProjectsDelete).flags;

    const displayService = new DisplayService(this);
    const projectService = new ProjectsService(this);

    if (!id) {
      const projects = await projectService.get();
      const choices = projects.map((project: {
        id: number;
        name: string;
        // eslint-disable-next-line camelcase
        user_id: number;
        // eslint-disable-next-line camelcase
        hour_rate: number;
      }) => ({
        name: `${project.id} | ${project.name}`,
        value: project.id,
      }));

      const { project } = await inquirer.prompt({
        type: 'list',
        name: 'project',
        choices,
      });

      id = project.toString();
    }

    if (!force) {
      const { validated } = await inquirer.prompt({
        type: 'confirm',
        name: 'validated',
        message: `Are you sure you want to delete project ${id}?`,
      });

      if (!validated) displayService.displayError('Deletion aborted');

      await projectService.delete(Number(id));
    }
  }
}
