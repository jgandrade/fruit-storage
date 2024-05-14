import { IUserDTO } from "../DTO/userDTO";
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

  public async save(user: IUserDTO): Promise<void> {
    const userToDomain = await UserMapper.toDomain(user);
    const persistedUser = UserMapper.toDTO(userToDomain);
    const NewUserModel = new UserModel(persistedUser);
    NewUserModel.save();
  }
}
