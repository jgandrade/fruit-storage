import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { User } from "../Domain/Entities/user";
import { UserPassword } from "../Domain/ValueObjects/userPassword";
import { IUserDTO } from "../DTO/userDTO";

export class UserMapper {
  public static toDTO(user: User): IUserDTO {
    return {
      id: user.userId.unique_id.toString(),
      username: user.username.value,
      password: user.password.value,
      fullname: user.fullname.value,
    };
  }

  public static async toDomain(user: IUserDTO): Promise<User> {
    const userPassword = await UserPassword.create({ value: user.password });

    const domainUser = User.create(
      {
        id: user.id,
        fullname: user.fullname,
        password: userPassword.getValue().value,
        username: user.username,
      },
      new UniqueEntityID(),
    );

    return domainUser.getValue();
  }
}
