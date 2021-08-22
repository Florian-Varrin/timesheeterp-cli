import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { DisplayService } from '../../modules/common/display.service';
import { ProjectsService } from '../../modules/projects/projects.service';
import { TimesService } from '../../modules/times/times.service';

export default class TimesDelete extends Command {
  static description = 'edit a time';

  static flags = {
    'project-id': flags.integer({ char: 'p', description: 'Id of the project' }),
    'time-id': flags.integer({ char: 't', description: 'Id of the time' }),
    force: flags.boolean({ default: false }),
  };

  static aliases = ['time:delete'];

  async run() {
    let { 'project-id': projectId, 'time-id': timeId } = this.parse(TimesDelete).flags;
    const { force } = this.parse(TimesDelete).flags;

    const projectService = new ProjectsService(this);
    const timeService = new TimesService(this);
    const displayService = new DisplayService(this);

    if (!projectId) {
      projectId = await projectService.select(true) as number;
    }

    if (!timeId) {
      timeId = await timeService.select(true, [projectId]) as number;
    }

    if (!force) {
      const { validated } = await inquirer.prompt({
        type: 'confirm',
        name: 'validated',
        message: `Are you sure you want to delete time ${timeId}?`,
        default: false,
      });

      if (!validated) displayService.displayError('Deletion aborted');
    }

    await timeService.delete(projectId, timeId);
  }
}
