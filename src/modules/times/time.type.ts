export type TimeType = {
  id: number | null;
  date: string;
  // eslint-disable-next-line camelcase
  duration: number;
  // eslint-disable-next-line camelcase
  project_id: number;
  description: string;
};

export type TimeCreateDto = {
  date: string;
  // eslint-disable-next-line camelcase
  duration: number;
  // eslint-disable-next-line camelcase
  project_id: number;
  description: string;
};
