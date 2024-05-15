export class Result<T> {
  private value: T;

  public constructor(value: T) {
    this.value = value;

    Object.freeze(this);
  }

  public static ok<T>(value: T): Result<T> {
    return new Result<T>(value);
  }

  public getValue(): T {
    return this.value;
  }
}
