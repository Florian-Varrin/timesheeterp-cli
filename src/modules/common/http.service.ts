import { LoginService } from '../login/login.service';
import { Command } from '@oclif/command';

export class HttpService {

  private loginService: LoginService;

  constructor(private oclifContext: Command) {
    this.loginService = new LoginService(oclifContext);
  }

  async getAuthHeaders() {
    const accessToken = await this.loginService.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return headers;
  }
}
