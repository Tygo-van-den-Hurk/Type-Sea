import * as names from '#src/results/const';
import type { DefaultError, DefaultType, JsError } from '#src/results/types';
import { BaseResult } from '#src/results/base';
import { ErrorResult } from '#src/results/error';
import { OkayResult } from '#src/results/okay';

const ErrorClass = Error;

/** The result enum. Is either a `Result::Okay` or a `Result::Error`. */
export type Result<T = DefaultType, E extends JsError = DefaultError> =
  | OkayResult<T, E>
  | ErrorResult<T, E>;

// eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare
export namespace Result {
  /** The name of the result class */
  export const name = names.base;

  /**
   * The base class for `Result`s. Can be used to make `instanceof` checks.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   *
   * const result = Result.okay();
   *
   * assert(result instanceof Result.Class);
   * ```
   */
  export const Class = BaseResult;

  /**
   * The error variant of the `Result` stores an Error class object.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   *
   * const result = Result.error(...);
   *
   * assert(result instanceof Result.Error);
   * ```
   *
   * You can also call `result.isError()` to find out if this is true.
   */
  export const Error = ErrorResult;

  /**
   * The full name of the error result variant.
   */
  export const ERROR = names.error.long;

  /**
   * Creates a new `Result.Error` object from an error `E`. If the exception provided is a string then that is
   * automatically converted to an Error.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   *
   * const error = new Error('Oh, no!');
   * const result = Result.error(error);
   *
   * assert(!result.isOkay());
   * assert(result.isError());
   * assert(result.error === error);
   * ```
   */
  export function error<T = DefaultType>(exception: string, cause?: unknown): ErrorResult<T>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function error<T = DefaultType, E extends JsError = DefaultError>(
    exception: Readonly<E>
  ): ErrorResult<T, E>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function error<T = DefaultType>(
    exception: string | Readonly<JsError>,
    cause?: unknown
  ): ErrorResult<T> {
    if (typeof exception !== 'string') return ErrorResult.create<T>(exception);
    return ErrorResult.create<T>(new ErrorClass(exception, { cause }));
  }

  Object.defineProperty(error, 'name', { value: `${BaseResult.name}.error` });

  /**
   * The okay variant of the `Result` stores a value `T`.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   *
   * const result = Result.okay(...);
   *
   * assert(result instanceof Result.Okay);
   * ```
   *
   * You can also call `result.isOkay()` to find out if this is true.
   */
  export const Okay = OkayResult;

  /**
   * The full name of the error result variant.
   */
  export const OKAY = names.okay.long;

  /**
   * Creates a new `Result.Okay` object from a value `T`.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   *
   * const result = Result.okay('success!');
   *
   * assert(result.isOkay());
   * assert(!result.isError());
   * assert(result.value === 'success!');
   * ```
   */
  export function okay(): OkayResult;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function okay<T>(value: T): OkayResult<T>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function okay<T>(value?: T): OkayResult<T | DefaultType> {
    return OkayResult.create(value);
  }

  Object.defineProperty(okay, 'name', { value: `${names.base}.okay` });

  /**
   * Wraps execution of a function, returning a `Result` in all cases. Used for when you know a function can fail, but
   * have no control over it because for example it is imported from a library. If you do have control over the
   * function you can implement it returning a result as normal.
   *
   * **Example**
   *
   * ```TypeScript
   * import { Result } from '@tygo-van-den-hurk/type-sea';
   * import fs from 'fs';
   *
   * const file = 'input.txt';
   * const result = Result.exec(fs.readFile, file);
   *
   * if (result.isError()) {
   *   console.error(result.error);
   *   process.exit(1);
   * }
   *
   * else {
   *   const contents = result.value;
   *   console.log(contents);
   * }
   * ```
   */
  export function exec<P extends readonly unknown[], R>(
    fn: (...params: P) => Promise<R>,
    ...params: P
  ): Promise<Result<R>>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function exec<P extends readonly unknown[], R>(
    fn: (...params: P) => R,
    ...params: P
  ): Result<R>;

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function exec<P extends readonly unknown[], R>(
    fn: (...params: P) => R | Promise<R>,
    ...params: P
  ): Result<R> | Promise<Result<R>> {
    try {
      const result = fn(...params);

      if (result instanceof Promise) {
        return result
          .then((value: R) => okay<R>(value))
          .catch((exception: unknown) => ErrorResult.fromThrown<R>(exception));
      }

      return okay(result);
    } catch (exception) {
      return ErrorResult.fromThrown(exception);
    }
  }

  Object.defineProperty(exec, 'name', { value: `${names.base}.exec` });

  /** A wrapper for `Result.Error.fromThrown(...)` to make this api public. See its JsDoc for more information. */
  export const fromThrown = function fromThrown(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...args: Parameters<typeof ErrorResult.fromThrown>
  ): ReturnType<typeof ErrorResult.fromThrown> {
    return ErrorResult.fromThrown(...args);
  };

  Object.defineProperty(fromThrown, 'name', { value: `${names.base}.fromThrown` });
}
