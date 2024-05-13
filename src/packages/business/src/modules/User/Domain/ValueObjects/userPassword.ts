import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import bcrypt from "bcrypt";

interface UserPasswordProps {
  value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    return Result.ok(new UserPassword(props));
  }
}
