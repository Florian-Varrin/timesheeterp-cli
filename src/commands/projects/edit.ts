import { Command, flags } from '@oclif/command';
import { DisplayService } from '../../modules/common/display.service';
import { ProjectsService } from '../../modules/projects/projects.service';
import * as inquirer from 'inquirer';
import { ProjectType } from '../../modules/projects/project.type';

export default class ProjectsEdit extends Command {
  static description = 'edit a project';

  static aliases = ['project:edit', 'prj:edit'];

  static flags = {
    id: flags.integer({ description: 'Id of the project' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    const { id } = this.parse(ProjectsEdit).flags;

    const projectService = new ProjectsService(this);

    const project = id
      ? await projectService.get(Number(id)) as ProjectType
      : await projectService.select(false) as ProjectType;

    const editedProject: ProjectType = {
      ...await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          default: project.name,
        },
        {
          type: 'number',
          name: 'hour_rate',
          default: project.hour_rate,
        },
      ]),
      user_id: project.user_id,
      id: project.id,
    };

    await projectService.update(project.id, editedProject);
  }
}
