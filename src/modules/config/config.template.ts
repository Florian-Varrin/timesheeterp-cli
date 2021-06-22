import { jsonValuesTypes } from '../../types/json.types';

export class ConfigTemplate {
  static readonly fields: {
    name: string;
    required: boolean;
    type: jsonValuesTypes;
    message: string;
    default?: string;
  }[] = [
    {
      name: 'host',
      required: true,
      type: 'string',
      message: 'Host URL :',
    },
    {
      name: 'apiVersion',
      required: true,
      type: 'string',
      message: 'API version :',
      default: '1',
    },
  ];
}

export interface ConfigInterface {
  [key: string]: jsonValuesTypes;

  host: string;
  apiVersion: string;
}
