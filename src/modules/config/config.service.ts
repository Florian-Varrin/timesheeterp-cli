import * as fs from 'fs';
import * as path from 'path';
import { Command } from '@oclif/command';
import { ConfigInterface, ConfigTemplate } from './config.template';
import { jsonStructureType } from '../../types/json.types';
import { DisplayService } from '../common/display.service';

export class ConfigService {
  private readonly configDirPath: string;

  public readonly filePath: string;

  private displayService: DisplayService;

  constructor(private oclifContext: Command) {
    this.configDirPath = oclifContext.config.configDir;
    this.filePath = path.join(this.configDirPath, 'config.json');
    this.displayService = new DisplayService(oclifContext);
  }

  displayNeedToConfigure() {
    this.displayService.displayError(
      'You need to configure the cli first by running',
      'tser config',
    );
  }

  hasConfigFile(): boolean {
    return fs.existsSync(this.filePath);
  }

  async getAConfig(config: string, nullIfDoesNotExist = false) {
    if (!this.hasConfigFile()) this.displayNeedToConfigure();

    // @ts-ignore
    const content = await this.getAllConfig(true);

    if (!content[config] && nullIfDoesNotExist) return null;
    if (!content[config]) this.displayNeedToConfigure();

    return content[config];
  }

  setAConfig(config: string, value: string) {
    const content = this.hasConfigFile()
      // @ts-ignore
      ? JSON.parse(fs.readFileSync(this.filePath))
      : {};

    content[config] = value;

    fs.writeFileSync(this.filePath, JSON.stringify(content));
  }

  createEmptyConfig(onlyRequired = false): void {
    const content: jsonStructureType = {};

    const { fields } = ConfigTemplate;

    fields.forEach((field) => {
      if (onlyRequired && !field.required) return;

      content[field.name] = field.default
        ? field.default
        : '';
    });

    if (!fs.existsSync(this.configDirPath)) fs.mkdirSync(this.configDirPath);
    fs.writeFileSync(this.filePath, JSON.stringify(content));
  }

  getAllConfig(withHidden = false): ConfigInterface {
    if (!this.hasConfigFile()) this.createEmptyConfig();

    // @ts-ignore
    const config = JSON.parse(fs.readFileSync(this.filePath));

    if (withHidden) return config;

    const filteredConfig = {};
    Object.keys(config).forEach((key) => {
      // @ts-ignore
      if (!key.startsWith('._')) filteredConfig[key] = config[key];
    });

    return filteredConfig as ConfigInterface;
  }

  setAllConfig(content: ConfigInterface): void {
    fs.writeFileSync(this.filePath, JSON.stringify(content));
  }
}
