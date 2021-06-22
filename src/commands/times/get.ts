import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import { ProjectsService } from '../../modules/projects/projects.service';
import { TimesService } from '../../modules/times/times.service';
import { ProjectType } from '../../modules/projects/project.type';

export default class TimesGet extends Command {
  static description = 'get times for a project';

  static aliases = ['time:get'];

  static flags = {
    'project-id': flags.integer({ description: 'Id of the project' }),
    start: flags.string({ char: 's', description: 'Start date of the query' }),
    end: flags.string({ char: 'e', description: 'End date of the query' }),
    ...cli.table.flags(),
  };

  async run() {
    const { flags } = this.parse(TimesGet);
    const { 'project-id': projectId, start, end } = flags;

    const projectService = new ProjectsService(this);
    const timeService = new TimesService(this);

    const project = projectId
      ? await projectService.get(Number(projectId)) as ProjectType
      : await projectService.select(false) as ProjectType;

    let times = await timeService.get(project.id);

    if (start) {
      const startDate = new Date(start).getTime();
      times = times.filter((time) => {
        const timeDate = new Date(time.date).getTime();

        return timeDate > startDate;
      });
    }

    if (end) {
      const endDate = new Date(end).getTime();
      times = times.filter((time) => {
        const timeDate = new Date(time.date).getTime();

        return timeDate < endDate;
      });
    }

    await timeService.list(times, project, flags);
  }
}
