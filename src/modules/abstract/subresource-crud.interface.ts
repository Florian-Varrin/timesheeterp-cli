interface SubresourceCrudInterface<T, U> {
  create(parentId: number, resource: U): Promise<T | null>;

  get(parentId: number, childId: number, parameters: object): Promise<T | null>;

  getAll(parentId: number, parameters: object): Promise<T[]>;

  update(parentId: number, childId: number, resource: T): Promise<void>;

  delete(parentId: number, childId: number): Promise<void>;
}
