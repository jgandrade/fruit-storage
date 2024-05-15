import { User } from "../Domain/Entities/user";
import { UserMapper } from "../Mappers";
import { IUser, User as UserModel } from "../Models/User";

interface IUserProps {
  username?: string;
  fullname?: string;
}

interface IUserRepository {
  findUserByProps: (props: IUserProps) => Promise<IUser | null>;
  userExistsData: (props: IUserProps) => Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  public findUserByProps = async (props: IUserProps) => {
    const userData = await this.userExistsData(props);
    return userData ? userData : null;
  };

  public userExistsData = async (props: IUserProps) => {
    const userResults = await UserModel.find({
      $or: [props],
    }).lean();

    if (userResults.length === 0) {
      return null;
    }

    return userResults[0];
  };

  public createUser = (userCreds: {
    fullname: string;
    username: string;
    password: string;
  }) => {
    const userToDomain = User.create(userCreds);
    return userToDomain.getValue();
  };

  public async save(user: User): Promise<void> {
    const persistedUser = UserMapper.toPersistence(user);
    const NewUserModel = new UserModel(persistedUser);
    NewUserModel.save();
  }
}
