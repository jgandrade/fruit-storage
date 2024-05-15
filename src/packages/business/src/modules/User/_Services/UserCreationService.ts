import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { User } from "../Domain/Entities/user";
import { UserPassword } from "../Domain/ValueObjects/userPassword";

interface UserCreds {
  fullname: string;
  username: string;
  password: string;
}

export abstract class UserCreationService {
  public static async createUser(
    userCreds: UserCreds,
    id?: UniqueEntityID
  ): Promise<User> {
    const createdHashedPassword = await UserPassword.create({
      value: userCreds.password,
    });

    const user = User.create(
      {
        ...userCreds,
        password: createdHashedPassword.getValue().value,
      },
      id
    ).getValue();

    return user;
  }
}
