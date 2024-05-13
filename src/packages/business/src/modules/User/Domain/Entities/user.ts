import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { UserFullname } from "../ValueObjects/userFullname";
import { UserPassword } from "../ValueObjects/userPassword";
import { UserUsername } from "../ValueObjects/userUsername";
import { UserId } from "./userId";

interface UserProps {
  fullname: string;
  username: string;
  password: string;
}

export class User extends AggregateRoot<UserProps> {
  get unique_id(): UniqueEntityID {
    return this.id;
  }

  get userId(): UserId {
    return UserId.caller(this.id);
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
}

const userInstance = new User({
  fullname: "John Glenn",
  username: "jgandrade",
  password: "password",
});

console.log(userInstance);
console.log(userInstance.unique_id.toString());

/*
  OUTPUT : 

  User {
    id: UniqueEntityID { value: '9d1fd5
    props: {
      fullname: 'John Glenn',
      username: 'jgandrade',
      password: 'password'
    }
  }

  9d1fd5d3-aac1-45b5-986c-fbc9e525d7c7

*/
