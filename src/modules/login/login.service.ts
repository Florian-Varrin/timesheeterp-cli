import { Command } from '@oclif/command';
import * as keytar from 'keytar';
import axios from 'axios';
import { ConfigService } from '../config/config.service';
import { DisplayService } from '../common/display-service';

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

  async getAccessToken(email: string): Promise<string | null> {
    return keytar.getPassword(this.serviceName, email);
  }

  async login(email: string, password: string, apiUrl: string): Promise<void> {
    const data: { email?: string; password: string } = { email, password };

    try {
      const result = await axios({
        method: 'POST',
        url: `${apiUrl}/login`,
        data,
      });

      const { accessToken } = result.data;

      if (accessToken) {
        await this.storeAccessToken(email, accessToken);
      }
    } catch (error) {
      if (!error.response) {
        this.displayService.displayError(
          'Unable to reach the server, please verify api url by running',
          'tser config',
        );
      }

      const statusCode = error.response.status;

      if (statusCode === 401) this.displayService.displayError('Invalid credentials');

      this.displayService.displayError('An unknown error occurred, please retry');
    }
  }
}
