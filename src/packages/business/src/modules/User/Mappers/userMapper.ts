import { User } from "../Domain/Entities/user";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { IUserDTO } from "../DTO/userDTO";
import { UserPassword } from "../Domain/ValueObjects/userPassword";
import { UserCreationService } from "../_Services/UserCreationService";

export class UserMapper {
  public static toPersistence(user: User): IUserDTO {
    return {
      _id: user.unique_id.toValue(),
      username: user.username,
      password: user.password,
      fullname: user.fullname,
    };
  }

  public static async toDomain(user: IUserDTO): Promise<User> {
    const userPassword = await UserPassword.create({ value: user.password });
    const createdUniqueIdFromExistingUserId = new UniqueEntityID(user._id);
    const domainUser = await UserCreationService.createUser(
      {
        fullname: user.fullname,
        password: userPassword.getValue().value,
        username: user.username,
      },
      createdUniqueIdFromExistingUserId
    );

    return domainUser;
  }
}
