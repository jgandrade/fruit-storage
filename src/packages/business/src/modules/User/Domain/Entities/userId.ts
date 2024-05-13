import { Entity } from "../../../../core/domain/Entity";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";

export class UserId extends Entity<null> {
  get unique_id(): UniqueEntityID {
    return this.id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
}
