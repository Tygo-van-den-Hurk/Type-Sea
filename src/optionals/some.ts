import * as names from '#src/optionals/const';
import type {
  BaseType,
  OptionalMatchSomeFullName,
  OptionalMatchSomeShortName,
} from '#src/optionals/types';
import { BaseOptional } from '#src/optionals/base';
import type { DefaultMatchResult } from '#src/common/types';
import type { NoneOptional } from '#src/optionals/none';
import { represent } from '#src/common/utils';

interface ReadonlySomeOptional<T extends BaseType> {
  /** The value `T` stored in the `Optional`. */
  readonly value: T;
}

/** The `Optional` variant where there is a value. */
export class SomeOptional<T extends BaseType>
  extends BaseOptional<T>
  implements ReadonlySomeOptional<T>
{
  public readonly type: typeof names.some.long = names.some.long;

  readonly #value;

  private constructor(value: T) {
    super();
    this.#value = value;
  }

  public get value(): T {
    return this.#value;
  }

  /** Creates a new `Optional` with a value value. */
  public static create<T extends BaseType>(value: T): SomeOptional<T> {
    return new SomeOptional(value);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public unwrap(): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isSome(): this is SomeOptional<T> {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isNone(): this is NoneOptional<T> {
    return false;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public match<SomeReturn = DefaultMatchResult>(
    options: OptionalMatchSomeFullName<T, SomeReturn> | OptionalMatchSomeShortName<T, SomeReturn>
  ): SomeReturn {
    const callbackFunctionName = `${names.base}.match => ${names.some.long}`;

    if (names.some.short in options) {
      const key = names.some.short;
      Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
      return options[key](this.value);
    }

    const key = names.some.long;
    Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
    return options[key](this.value);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public toString(): `${typeof names.some.long}(${string})` {
    return `${names.some.long}(${represent(this.value)})`;
  }
}

Object.defineProperty(SomeOptional, 'name', { value: names.some.long });
