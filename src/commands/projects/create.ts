import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ProjectsService } from '../../modules/projects/projects.service';

export default class ProjectsCreate extends Command {
  static description = 'create a project';

  static aliases = ['project:create', 'prj:create'];

  static flags = {
    name: flags.string({ char: 'n', description: 'name of the project' }),
    hourRate: flags.string({ char: 'h', description: 'hour rate the project' }),
  };

  async run() {
    const { name, hourRate } = this.parse(ProjectsCreate).flags;

    const questions = [];
    if (!name) {
      questions.push({
        type: 'input',
        name: 'name',
        message: 'Project name: ',
      });
    }

    if (!hourRate) {
      questions.push({
        type: 'input',
        name: 'hourRate',
        message: 'Project hour rate: ',
      });
    }

    const answers = await inquirer.prompt(questions);

    const projectService = new ProjectsService(this);

    const project = await projectService.create({
      name: name || answers.name,
      hour_rate: Number(hourRate) || Number(answers.hourRate),
    });

    this.log(`Project "${project.name}" with id "${project.id}" was created`);
  }
}
