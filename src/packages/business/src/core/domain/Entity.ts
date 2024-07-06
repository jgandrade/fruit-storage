import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;

  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (!object) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!this.isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  private isEntity(object: unknown): boolean {
    return object instanceof Entity;
  }
}
