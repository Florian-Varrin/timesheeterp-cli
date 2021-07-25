export type ClocksType = {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  user_id: number;
  // eslint-disable-next-line camelcase
  current_time: number;
  // eslint-disable-next-line camelcase
  formatted_time: string;
  events: any[];
  status: 'RUNNING' | 'STOPPED';
};
