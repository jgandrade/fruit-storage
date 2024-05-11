import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityID";

export abstract class AggregateRoot<T> extends Entity<T> {
  get unique_id(): UniqueEntityID {
    return this.id;
  }
}
