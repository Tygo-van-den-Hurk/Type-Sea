import * as names from '#src/optionals/const';
import type { BaseType, OptionalMatchArms } from '#src/optionals/types';
import type { DefaultMatchResult } from '#src/common/types';
import type { NoneOptional } from '#src/optionals/none';
import { PanicAble } from '#src/common/panic';
import type { SomeOptional } from '#src/optionals/some';
import type { UnwrapAble } from '#src/common/unwrap';

interface ReadonlyOptional<T extends BaseType> {
  /**
   * The type of this `Optional`, is either `Optional::Some`, or `Optional::None`.
   */
  readonly type: typeof names.none.long | typeof names.some.long;

  /**
   * Wether or not this optional contains a value.
   */
  readonly isSome: () => this is SomeOptional<T>;

  /**
   * Wether or not this optional lacks a value.
   */
  readonly isNone: () => this is NoneOptional<T>;

  /**
   * Allows you to match a optional with a matching arm.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * interface Person {
   *   readonly name: string;
   *   salary: number;
   * }
   *
   * function addSalary(employee: Optional<Person>): void {
   *   employee.match({
   *     None: () => {},
   *     Some: person => {
   *       person.salary = person.salary * 2;
   *     },
   *   });
   * }
   * ```
   */
  readonly match: <SomeReturn = DefaultMatchResult, NoneReturn = DefaultMatchResult>(
    options: OptionalMatchArms<T, SomeReturn, NoneReturn>
  ) => SomeReturn | NoneReturn;

  /**
   * Shows a string representation of this object.
   */
  readonly toString: () => string;
}

/** The `Optional` base class for the other enum members. */
export abstract class BaseOptional<T extends BaseType>
  extends PanicAble
  implements UnwrapAble<T>, ReadonlyOptional<T>
{
  public abstract readonly type: typeof names.none.long | typeof names.some.long;

  public abstract unwrap<F = NonNullable<T>>(options?: {
    readonly fallback?: F;
    readonly panics?: boolean;
  }): T | F | never;

  public abstract isSome(): this is SomeOptional<T>;
  public abstract isNone(): this is NoneOptional<T>;
  public abstract toString(): string;
  public abstract match<SomeReturn = DefaultMatchResult, NoneReturn = DefaultMatchResult>(
    options: OptionalMatchArms<T, SomeReturn, NoneReturn>
  ): SomeReturn | NoneReturn;
}

Object.defineProperty(BaseOptional, 'name', { value: names.base });
