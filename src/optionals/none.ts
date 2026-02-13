import * as names from '#src/optionals/const';
import type {
  BaseType,
  OptionalMatchNoneFullName,
  OptionalMatchNoneShortName,
} from '#src/optionals/types';
import { BaseOptional } from '#src/optionals/base';
import type { DefaultMatchResult } from '#src/common/types';
import { NoSuchElementError } from '#src/optionals/utils';
import type { SomeOptional } from '#src/optionals/some';

/** The `Optional` variant where is no value. */
export class NoneOptional<T extends BaseType> extends BaseOptional<T> {
  public readonly type: typeof names.none.long = names.none.long;

  private constructor() {
    super();
  }

  /** Creates a new `Optional` without a value value. */
  public static create<T extends BaseType>(): NoneOptional<T> {
    return new NoneOptional<T>();
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  public unwrap<F = NonNullable<T>>({
    fallback,
    panics,
  }: {
    readonly fallback?: F;
    readonly panics?: boolean;
  } = {}): never | F {
    if (fallback !== void 0) return fallback; // eslint-disable-line no-void
    const message = `called unwrap on an ${names.none.long}`;
    if (!(panics ?? this.panics)) throw new NoSuchElementError(message);
    console.error(`Panic: ${message}`); // eslint-disable-line no-console
    return process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isSome(): this is SomeOptional<T> {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isNone(): this is NoneOptional<T> {
    return true;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/class-methods-use-this
  public match<NoneReturn = DefaultMatchResult>(
    options: OptionalMatchNoneFullName<NoneReturn> | OptionalMatchNoneShortName<NoneReturn>
  ): NoneReturn {
    const callbackFunctionName = `${names.base}.match => ${names.none.long}`;

    if (names.none.short in options) {
      const key = names.none.short;
      Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
      return options[key]();
    }

    const key = names.none.long;
    Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
    return options[key]();
  }

  // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/class-methods-use-this
  public toString(): `${typeof names.none.long}()` {
    return `${names.none.long}()`;
  }
}

Object.defineProperty(NoneOptional, 'name', { value: `${names.base}::None` });
