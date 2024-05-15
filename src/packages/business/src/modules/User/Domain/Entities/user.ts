import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { Result } from "../../../../core/logic/Result";

export interface IUser {
  fullname: string;
  username: string;
  password: string;
}

export class User extends AggregateRoot<IUser> {
  private constructor(props: IUser, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): UniqueEntityID {
    return this.unique_id;
  }

  get fullname(): string {
    return this.props.fullname;
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  public static create(props: IUser, id?: UniqueEntityID): Result<User> {
    const user = new User(props, id);
    return Result.ok<User>(user);
  }
}
