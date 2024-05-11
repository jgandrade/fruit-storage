import { AggregateRoot } from "../../../../core/domain/AggregateRoot";

interface IUser {
  id: string;
  fullname: string;
  username: string;
  password: string;
}

export class User extends AggregateRoot<IUser> {}
