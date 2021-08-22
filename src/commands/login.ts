import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { ConfigService } from '../modules/config/config.service';
import { LoginService } from '../modules/login/login.service';
import { DisplayService } from '../modules/common/display.service';

export default class Login extends Command {
  static description = 'Login to TimeSheetER';

  static flags = {
    account: flags.string({ char: 'a', required: false }),
  }

  async run() {
    const { account } = this.parse(Login).flags;

    const loginService = new LoginService(this);
    const configService = new ConfigService(this);
    const displayService = new DisplayService(this);

    const configEmail = await configService.getAConfig('._email');

    const questions: {
      type: string;
      name: string;
      message: string;
      default?: string;
    }[] = [];

    questions.push({
      type: 'input',
      name: 'email',
      message: 'email: ',
      default: `${configEmail || ''}`,
    });

    if (!account) {
      questions.push({
        type: 'password',
        name: 'password',
        message: 'password: ',
      });
    }

    const answers = await inquirer
      .prompt(questions);

    const { email, password } = answers;

    await loginService.login(email || account, password);

    displayService.displaySuccess('You are logged in');
  }
}
