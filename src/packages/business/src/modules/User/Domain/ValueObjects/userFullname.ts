import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";

interface UserFullnameProps {
  value: string;
}

export class UserFullname extends ValueObject<UserFullnameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserFullnameProps) {
    super(props);
  }

  public static create(fullname: UserFullnameProps) {
    return Result.ok(new UserFullname(fullname));
  }
}
