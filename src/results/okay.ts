import * as names from '#src/results/const';
import type {
  DefaultError,
  DefaultType,
  JsError,
  ResultMatchOkayFullName,
  ResultMatchOkayShortName,
} from '#src/results/types';
import { BaseResult } from '#src/results/base';
import type { DefaultMatchResult } from '#src/common/types';
import type { ErrorResult } from '#src/results/error';
import { represent } from '#src/common/utils';

interface ReadonlyOkayResult<T = DefaultType> {
  /** The value `T` stored in the `Result`. */
  readonly value: T;
}

/** The result class for positive results. */
export class OkayResult<T = DefaultType, E extends JsError = DefaultError>
  extends BaseResult<T, E>
  implements ReadonlyOkayResult<T>
{
  public readonly type: typeof names.okay.long = names.okay.long;

  readonly #value: T;

  private constructor(value: T) {
    super();
    this.#value = value;
  }

  public get value(): T {
    return this.#value;
  }

  /** Creates an instance of this class. */
  public static create<T>(value: T): OkayResult<T> {
    return new OkayResult(value);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public unwrap(): T {
    return this.#value;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isError(): this is ErrorResult<T, E> {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isOkay(): this is OkayResult<T, E> {
    return true;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public match<OkayReturn = DefaultMatchResult>(
    options: ResultMatchOkayFullName<OkayReturn, T> | ResultMatchOkayShortName<OkayReturn, T>
  ): OkayReturn {
    const callbackFunctionName = `${names.base}.match => ${names.okay.long}`;

    if (names.okay.short in options) {
      const key = names.okay.short;
      Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
      return options[key](this.value);
    }

    const key = names.okay.long;
    Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
    return options[key](this.value);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public toString(): `${typeof names.okay.long}(${string})` {
    return `${names.okay.long}(${represent(this.value)})`;
  }
}

Object.defineProperty(OkayResult, 'name', { value: names.okay.long });
