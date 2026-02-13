import * as names from '#src/optionals/const';
import { BaseOptional } from '#src/optionals/base';
import type { BaseType } from '#src/optionals/types';
import { NoneOptional } from '#src/optionals/none';
import { SomeOptional } from '#src/optionals/some';

/** The optional enum. Is either a `Optional::Some<T>()` or a `Optional::None()`. */
export type Optional<T extends BaseType> = SomeOptional<T> | NoneOptional<T>;

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare, jsdoc/require-jsdoc
export namespace Optional {
  /** The name of the optional class */
  export const name = names.base;

  /**
   * The base class for `Result`s. Can be used to make `instanceof` checks.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * const optional = Optional.none();
   *
   * assert(optional instanceof Optional.Class);
   * ```
   */
  export const Class = BaseOptional;

  /**
   * The error variant of the Result stores an Error class object.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * const optional = Optional.none();
   *
   * assert(optional instanceof Optional.None);
   * ```
   *
   * You can also call `optional.isNone()` to find out if this is true.
   */
  export const None = NoneOptional;

  /**
   * The full name of the none optional variant.
   */
  export const NONE = names.none.long;

  /**
   * Creates a new `Optional.none` object.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * const result = Optional.none(error);
   *
   * assert(!result.isSome());
   * assert(result.isNone());
   * ```
   */
  export const none = function none<T extends BaseType>(): NoneOptional<T> {
    return NoneOptional.create();
  };

  Object.defineProperty(none, 'name', { value: `${names.base}.none` });

  /**
   * The some variant of the `Optional` stores a value `T`.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * const optional = Optional.some(...);
   *
   * assert(optional instanceof Optional.Some);
   * ```
   *
   * You can also call `optional.isSome()` to find out if this is true.
   */
  export const Some = SomeOptional;

  /**
   * The full name of the some optional variant.
   */
  export const SOME = names.some.long;

  /**
   * Creates a new `Result.Okay` object from a value `T`.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * const optional = Optional.some('success!');
   *
   * assert(optional.isSome());
   * assert(!optional.isNone());
   * assert(optional.value === 'success!');
   * ```
   */
  export const some = function some<T extends BaseType>(value: T): SomeOptional<T> {
    return SomeOptional.create(value);
  };

  Object.defineProperty(some, 'name', { value: `${names.base}.some` });

  /**
   * Converts a value to an optional
   */
  export const from = function from<T>(value: T): Optional<T & {}> {
    if (value === null || value === void 0) return none(); // eslint-disable-line no-void
    return some(value);
  };

  Object.defineProperty(from, 'name', { value: `${names.base}.from` });

  /**
   * Wraps execution of a function, returning a `Optional` in all cases. Used for when you know a function does not,
   * fail, but have no control over it because for example it is imported from a library. If you do have control over
   * the function you can implement it returning an `Optional` as normal.
   *
   * **Example**
   * Lets say there is a library function you have no control over that might return a nullish value:
   * ```TypeScript
   * // Some Library function
   * function getPort(): number | null {
   *   if (!process.env.PORT) return null
   *   const port = Number.parseInt(process.env.PORT, 10);
   *   if (Number.isNaN(port)) return null;
   *   return port;
   * }
   * ```
   * You can use `Optional.exec(...)` to get the value as an `Optional<number>` instead:
   * ```TypeScript
   * import { Optional } from '@tygo-van-den-hurk/type-sea';
   *
   * const port: Optional<string> = Optional.exec(getPort);
   * ```
   */
  export function exec<P extends readonly unknown[], R>(
    fn: (...params: P) => Promise<R>,
    ...params: P
  ): Promise<Optional<R & {}>>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function exec<P extends readonly unknown[], R>(
    fn: (...params: P) => R,
    ...params: P
  ): Optional<R & {}>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function exec<P extends readonly unknown[], R>(
    fn: (...params: P) => R | Promise<R>,
    ...params: P
  ): Optional<R & {}> | Promise<Optional<R & {}>> {
    const result = fn(...params);

    if (result instanceof Promise) {
      const callback = function callback<V>(value: V): Optional<NonNullable<V>> {
        if (value === null || value === void 0) return none(); // eslint-disable-line no-void
        return some(value as NonNullable<V>);
      };

      return result.then(callback);
    }

    return from(result);
  }

  Object.defineProperty(exec, 'name', { value: `${names.base}.exec` });
}
