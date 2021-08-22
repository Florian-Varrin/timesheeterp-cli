export type ClocksType = {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  user_id: number;
  // eslint-disable-next-line camelcase
  current_time_in_seconds: number;
  // eslint-disable-next-line camelcase
  current_time_formatted: string;
  events: any[];
  status: 'RUNNING' | 'STOPPED';
};

export type ClocksCreateDto = {
  name: string;
};
