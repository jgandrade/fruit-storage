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

  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }

  public static async create(
    props: UserPasswordProps,
  ): Promise<Result<UserPassword>> {
    const passwordHashed = await this.hashPassword(props.value);
    props = { ...props, value: passwordHashed };
    return Result.ok(new UserPassword(props));
  }
}
