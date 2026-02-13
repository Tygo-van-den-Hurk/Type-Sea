import * as names from '#src/results/const';
import type { DefaultError, DefaultType, JsError, ResultMatchArms } from '#src/results/types';
import type { DefaultMatchResult } from '#src/common/types';
import type { ErrorResult } from '#src/results/error';
import type { OkayResult } from '#src/results/okay';
import { PanicAble } from '#src/common/panic';
import type { UnwrapAble } from '#src/common/unwrap';

interface ReadonlyResult<T = DefaultType, E extends JsError = DefaultError> {
  /**
   * The type of this `Result`, is either `Result::Okay`, or `Result::Error`.
   */
  readonly type: typeof names.error.long | typeof names.okay.long;

  /**
   * Wether or not this result was unsuccessful.
   */
  readonly isError: () => this is ErrorResult<T, E>;

  /**
   * Wether or not this result was successful.
   */
  readonly isOkay: () => this is OkayResult<T, E>;

  /**
   * Shows a string representation of this object.
   */
  readonly toString: () => string;

  /**
   * Allows you to match a result with a matching arm.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   *
   * function addOne(result: Result<number>): Result<number> {
   *   return result.match({
   *     Error: error => Result.error(error),
   *     Okay: value => Result.okay(value + 1),
   *   });
   * }
   * ```
   */
  readonly match: <OkayReturn = DefaultMatchResult, ErrorReturn = DefaultMatchResult>(
    options: ResultMatchArms<OkayReturn, ErrorReturn, T, E>
  ) => OkayReturn | ErrorReturn;
}

/** The Result base class for the other enum members. */
export abstract class BaseResult<T = DefaultType, E extends JsError = DefaultError>
  extends PanicAble
  implements UnwrapAble<T>, ReadonlyResult<T, E>
{
  public abstract type: typeof names.error.long | typeof names.okay.long;

  public abstract unwrap<F>(options?: {
    readonly fallback?: F;
    readonly panics?: boolean;
  }): T | F | never;

  public abstract isError(): this is ErrorResult<T, E>;
  public abstract isOkay(): this is OkayResult<T, E>;
  public abstract toString(): string;

  public abstract match<OkayReturn = DefaultMatchResult, ErrorReturn = DefaultMatchResult>(
    options: ResultMatchArms<OkayReturn, ErrorReturn, T, E>
  ): OkayReturn | ErrorReturn;
}

Object.defineProperty(BaseResult, 'name', { value: names.base });
