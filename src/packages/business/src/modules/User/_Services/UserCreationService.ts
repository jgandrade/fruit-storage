import { User } from "../Domain/Entities/user";
import { UserPassword } from "../Domain/ValueObjects/userPassword";

interface UserCreds {
  fullname: string;
  username: string;
  password: string;
}

export abstract class UserCreationService {
  public static async createUser(userCreds: UserCreds): Promise<User> {
    const createdHashedPassword = await UserPassword.create({
      value: userCreds.password,
    });

    const user = User.create({
      ...userCreds,
      password: createdHashedPassword.getValue().value,
    }).getValue();

    return user;
  }
}
