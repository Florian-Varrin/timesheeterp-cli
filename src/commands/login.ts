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

    const { host, apiVersion } = await configService.getAllConfig();

    const questions = [
      {
        type: 'password',
        name: 'password',
        message: 'password: ',
      },
    ];

    if (!account) {
      questions.unshift({
        type: 'input',
        name: 'email',
        message: 'email: ',
      });
    }

    const answers = await inquirer
      .prompt(questions);

    const { email, password } = answers;

    const apiUrl = `${host}/api/v${apiVersion}`;
    await loginService.login(email || account, password, apiUrl);

    displayService.displaySuccess('You are logged in');
  }
}
