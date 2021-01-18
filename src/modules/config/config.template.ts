import { jsonValuesTypes } from '../../types/json.types';

export class ConfigTemplate {
  static readonly fields: {
    name: string;
    required: boolean;
    type: jsonValuesTypes;
  }[] = [
    {
      name: 'apiUrl',
      required: true,
      type: 'string',
    },
  ];
}

export interface ConfigInterface {
  [key: string]: jsonValuesTypes;

  apiUrl: string;
}
