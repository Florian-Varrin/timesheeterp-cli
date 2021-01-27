import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ConfigService } from '../modules/config/config.service';
import Login from './login';
import { DisplayService } from '../modules/common/display-service';

export default class ConfigCommand extends Command {
  static description = 'Configure the client'

  async run(): Promise<void> {
    const configService = new ConfigService(this);
    const displayService = new DisplayService(this);

    const currentContent = configService.getAllConfig();

    const answers = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'apiUrl',
          message: 'Api URL :',
          default: currentContent.apiUrl,
        },
      ]);

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
