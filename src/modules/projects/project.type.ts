export type ProjectType = {
    id: number;
    name: string;
    // eslint-disable-next-line camelcase
    user_id: number;
    // eslint-disable-next-line camelcase
    hour_rate: number;
};

export type ProjectCreateDto = {
  name: string;

  // eslint-disable-next-line camelcase
  hour_rate: number;
};
