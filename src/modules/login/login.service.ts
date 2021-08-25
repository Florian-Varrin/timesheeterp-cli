import { Command } from '@oclif/command';
import * as keytar from 'keytar';
import Timesheeterp from 'timesheeterp-js-sdk';
import { ConfigService } from '../config/config.service';
import { DisplayService } from '../common/display.service';

export class LoginService {
  private readonly serviceName: string;

  private configService: ConfigService;

  private displayService: DisplayService;

  constructor(private oclifContext: Command) {
    this.serviceName = 'timesheeter';
    this.configService = new ConfigService(oclifContext);
    this.displayService = new DisplayService(oclifContext);
  }

  displayNeedToLogin() {
    this.displayService.displayError('You need to login first by running', 'tser login');
  }

  async storeAccessToken(email: string, accessToken: string): Promise<void> {
    this.configService.setAConfig('account', email);
    await keytar.setPassword(this.serviceName, email, accessToken);
  }

  async getAccessToken(): Promise<string | null> {
    const email = await this.configService.getAConfig('._email') as string;

    if (!email) this.displayNeedToLogin();

    const accessToken = keytar.getPassword(this.serviceName, email);

    if (!accessToken) this.displayNeedToLogin();

    return accessToken;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const { host, apiVersion } = this.configService.getAllConfig();
      const client = new Timesheeterp(host, +apiVersion);

      const accessToken = await client.authService.login({ email, password });

      if (accessToken) {
        await this.storeAccessToken(email, accessToken);
        await this.configService.setAConfig('._email', email);
      }

      return;
    } catch (error) {
      if (!error.response) {
        this.displayService.displayError(
          'Unable to reach the server, please verify host url and api version by running',
          'tser config',
        );
        return;
      }

      const statusCode = error.response.status;

      if (statusCode === 401) {
        this.displayService.displayError('Invalid credentials');
        return;
      }

      this.displayService.displayError('An unknown error occurred, please retry');
    }
  }
}
