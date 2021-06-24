import { Command, flags } from '@oclif/command';
import { ProjectsService } from '../../modules/projects/projects.service';
import { DateService } from '../../modules/common/date.service';
import * as inquirer from 'inquirer';
import { TimesService } from '../../modules/times/times.service';
import { string } from '@oclif/command/lib/flags';
import { DisplayService } from '../../modules/common/display.service';
import { TimeType } from '../../modules/times/time.type';

export default class TimesAdd extends Command {
  static description = 'add a time to a project';

  static aliases = ['time:add'];

  static flags = {
    'project-id': flags.integer({ char: 'p', description: 'Id of the project' }),
    duration: flags.string({ description: 'time\'s duration in decimal' }),
    description: flags.string({ description: 'time\'s description' }),
    date: flags.string({ description: 'time\'s date' }),
    today: flags.boolean({ description: 'add time for today' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    let {
      'project-id': projectId,
      description,
      date,
      today,
    } = this.parse(TimesAdd).flags;
    const { duration } = this.parse(TimesAdd).flags;

    const projectService = new ProjectsService(this);
    const dateService = new DateService(this);
    const displayService = new DisplayService(this);
    const timeService = new TimesService(this);

    const questions = [];
    if (!projectId) {
      projectId = await projectService.select(true) as number;
    }

    if (!today) {
      const { today: todayAnswer } = await inquirer.prompt([
        {
          type: 'confirm',
          default: true,
          name: 'today',
          message: 'Do you want to add the time for today?',
        },
      ]);

      today = todayAnswer;
    }

    if (today) date = dateService.formatDate(new Date());

    if (!duration) {
      questions.push({
        type: 'input',
        name: 'duration',
        message: 'Time\'s duration (in decimal): ',
      });
    }

    if (!description) {
      questions.push({
        type: 'input',
        name: 'description',
        message: 'Time\'s description: ',
      });
    }

    if (!date) {
      questions.push({
        type: 'input',
        name: 'date',
        message: 'Time\'s date (YYYY-MM-DD): ',
      });
    }

    const answers = await inquirer.prompt(questions);

    const durationAsNumber = Number(duration) || Number(answers.duration);
    description = description || answers.description as string;
    date = date || answers.date as string;

    let time: TimeType = {
      id: null,
      project_id: projectId,
      description,
      date,
      duration: durationAsNumber,
    };

    time = await timeService.create(projectId, time) as TimeType;

    displayService.displaySuccess(`A time with id "${time.id}" was added to project "${projectId}"`);
  }
}
