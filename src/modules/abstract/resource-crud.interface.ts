interface ResourceCrudInterface<T, U> {
  create(resource: U): Promise<T | null>;

  get(id: number, parameters: object): Promise<T | null>;

  getAll(parameters: object): Promise<T[]>;

  update(id: number, resource: T): Promise<void>;

  delete(id: number): Promise<void>;
}
