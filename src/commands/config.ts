import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ConfigService } from '../modules/config/config.service';
import Login from './login';
import { DisplayService } from '../modules/common/display-service';
import { ConfigTemplate } from '../modules/config/config.template';

export default class ConfigCommand extends Command {
  static description = 'Configure the client'

  async run(): Promise<void> {
    const configService = new ConfigService(this);
    const displayService = new DisplayService(this);

    const currentContent = configService.getAllConfig();
    const { fields: fieldsTemplate } = ConfigTemplate;

    const questions = Object.keys(currentContent).map((key) => {
      const fieldTemplate = fieldsTemplate.find((field) => field.name === key);

      return {
        type: 'input',
        name: key,
        message: fieldTemplate?.message || '',
        default: currentContent[key],
      };
    });

    const answers = await inquirer
      .prompt(questions);

    configService.setAllConfig(answers);

    displayService.displaySuccess('Config has been updated');

    const { login } = await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'login',
          message: 'Do you want to login?',
        },
      ]);

    if (login) await Login.run([]);
  }
}
