import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { User } from "../Domain/Entities/user";
import { IUserDTO } from "../DTO/userDTO";

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
    const createdUniqueIdFromExistingUserId = new UniqueEntityID(user._id);
    const domainUser = User.create(
      {
        fullname: user.fullname,
        password: user.password,
        username: user.username,
      },
      createdUniqueIdFromExistingUserId
    );

    return domainUser.getValue();
  }
}
