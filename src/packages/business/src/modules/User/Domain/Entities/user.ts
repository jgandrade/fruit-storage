import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { Result } from "../../../../core/logic/Result";
import { IUserDTO } from "../../DTO/userDTO";
import { UserFullname } from "../ValueObjects/userFullname";
import { UserPassword } from "../ValueObjects/userPassword";
import { UserUsername } from "../ValueObjects/userUsername";
import { UserId } from "./userId";

export class User extends AggregateRoot<IUserDTO> {
  private constructor(props: IUserDTO, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): UserId {
    return UserId.caller(this.userId);
  }

  get fullname(): UserFullname {
    return UserFullname.caller(this.fullname);
  }

  get username(): UserUsername {
    return UserUsername.caller(this.username);
  }

  get password(): UserPassword {
    return UserPassword.caller(this.password);
  }

  public static create(props: IUserDTO, id?: UniqueEntityID): Result<User> {
    const user = new User(props, id);
    return Result.ok<User>(user);
  }
}
