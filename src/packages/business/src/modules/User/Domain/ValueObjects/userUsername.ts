import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";

interface UserUsernameProps {
  value: string;
}

export class UserUsername extends ValueObject<UserUsernameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserUsernameProps) {
    super(props);
  }

  public static create(email: string): Result<UserUsernameProps> {
    return Result.ok<UserUsernameProps>(new UserUsername({ value: email }));
  }
}
