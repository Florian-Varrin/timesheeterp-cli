import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ProjectsService } from '../../modules/projects/projects.service';
import { TimesService } from '../../modules/times/times.service';
import { TimeType } from '../../modules/times/time.type';

export default class TimesEdit extends Command {
  static description = 'edit a time';

  static flags = {
    'project-id': flags.integer({ char: 'p', description: 'Id of the project' }),
    'time-id': flags.integer({ char: 't', description: 'Id of the time' }),
  };

  static aliases = ['time:edit'];

  async run() {
    let { 'project-id': projectId } = this.parse(TimesEdit).flags;
    const { 'time-id': timeId } = this.parse(TimesEdit).flags;

    const projectService = new ProjectsService(this);
    const timeService = new TimesService(this);

    if (!projectId) {
      projectId = await projectService.select(true) as number;
    }

    const time = timeId
      ? await timeService.get(projectId, timeId) as TimeType
      : await timeService.select(false, [projectId]) as TimeType;

    const editedTime: TimeType = {
      ...await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          default: time.description,
        },
        {
          type: 'input',
          name: 'date',
          default: time.date,
        },
        {
          type: 'number',
          name: 'duration',
          default: time.duration,
        },
      ]),
      id: time.id,
      project_id: time.project_id,
    };

    await timeService.update(projectId, time.id as number, editedTime);
  }
}
