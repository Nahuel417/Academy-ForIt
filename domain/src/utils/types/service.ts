import type { Entity } from "./entity.js";

export interface Service<TEntity extends Entity>
  extends ServiceQuery<TEntity>,
    ServiceStorage<TEntity> {}

interface ServiceQuery<TEntity extends Entity> {
  findById: (id: string) => Promise<TEntity | undefined>;
  findAll: () => Promise<TEntity[]>;
}

interface ServiceStorage<TEntity extends Entity> {
  editOne: (data: TEntity) => Promise<TEntity>;
  save: (data: TEntity) => Promise<void>;
  updateMany: (data: TEntity[]) => Promise<TEntity[] | undefined>;
  delete: (id: string) => Promise<void>;
}
