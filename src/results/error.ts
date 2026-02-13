import * as names from '#src/results/const';
import type {
  DefaultError,
  DefaultType,
  JsError,
  ResultMatchErrorFullName,
  ResultMatchErrorShortName,
} from '#src/results/types';
import { BaseResult } from '#src/results/base';
import type { DefaultMatchResult } from '#src/common/types';
import type { OkayResult } from '#src/results/okay';

interface ReadonlyErrorResult<T = DefaultType, E extends JsError = DefaultError> {
  /**
   * Returns the error inside this `Result`.
   *
   * **Examples**
   *
   * ```TypeScript
   * const error: Error;
   * const result = new ErrorResult(error);
   *
   * assert(result.error === error);
   * ```
   */
  readonly error: E;

  /**
   * Returns the name of the error inside this `Result`.
   *
   * **Examples**
   *
   * ```TypeScript
   * const error: Error;
   * const result = new ErrorResult(error);
   *
   * assert(result.name === error.name);
   * ```
   */
  readonly name: E['name'];

  /**
   * Returns the message of the error inside this `Result`.
   *
   * **Examples**
   *
   * ```TypeScript
   * const error: Error;
   * const result = new ErrorResult(error);
   *
   * assert(result.message === error.message);
   * ```
   */
  readonly message: E['message'];

  /**
   * Returns the cause of the error inside this `Result`.
   *
   * **Examples**
   *
   * ```TypeScript
   * const error: Error;
   * const result = new ErrorResult(error);
   *
   * assert(result.cause === error.cause);
   * ```
   */
  readonly cause: E['cause'];

  /**
   * Creates a new `Result::Error` with the internal Error storing this results error as the cause for the new one.
   *
   * **Examples**
   *
   * ```TypeScript
   * function readFile<T>(): Result<T> {
   *   const result: Result<...> = ...;
   *   if (result.isOkay()) return result;
   *   return result.propagate(`Could not read the file: ${result.error.message}`);
   * }
   * ```
   */
  readonly propagate: {
    <X extends JsError = DefaultError>(
      constructor: new (message: string, options?: { cause?: unknown }) => X,
      message: string
    ): ErrorResult<T, X>;
    (message: string): ErrorResult<T>;
  };

  /**
   * Wether or not the error captured is an instance of `type`.
   */
  readonly instanceOf: <C extends new (...args: never) => JsError>(
    type: C
  ) => this is ErrorResult<T, InstanceType<C>>;
}

/** The error variant of the `Result` stores an `Error` class object. */
export class ErrorResult<T = DefaultType, E extends JsError = DefaultError>
  extends BaseResult<T, E>
  implements ReadonlyErrorResult<T, E>
{
  public readonly type: typeof names.error.long = names.error.long;

  readonly #error: E;

  private constructor(error: Readonly<E>) {
    super();
    this.#error = error;
  }

  public get error(): E {
    return this.#error;
  }

  public get name(): typeof this.error.name {
    return this.error.name;
  }

  public get message(): typeof this.error.message {
    return this.error.message;
  }

  public get cause(): typeof this.error.cause {
    return this.error.cause;
  }

  /**
   * Creates an instance of this class from an error.
   *
   * **Examples**
   *
   * ```TypeScript
   * const error: Error;
   * const result = new ErrorResult(error);
   *
   * assert(result.isError());
   * assert(!result.isOkay());
   * assert(result.error === error);
   * assert(result.message === error.message);
   * assert(result.cause === error.cause);
   * ```
   */
  public static create<T = DefaultType, E extends JsError = DefaultError>(
    value: Readonly<E>
  ): ErrorResult<T, E> {
    return new ErrorResult<T, E>(value);
  }

  /**
   * Creates an instance or `Result.Error` from an unknown typed variable like what you get from a catch block. Allows
   * for a optional message to provide in case the thrown error is not actually an error object, or a string.
   *
   * **Examples**
   *
   * ```TypeScript
   * function myFunction<T>(): Result<T> {
   *   try {
   *     // Do anything...
   *   } catch (exception: unknown) {
   *     return ErrorResult.fromThrown(exception);
   *   }
   * }
   * ```
   */
  public static fromThrown<T = DefaultType>(
    exception: unknown,
    fallbackMessage?: string
  ): ErrorResult<T> {
    if (exception instanceof Error) {
      return new ErrorResult(exception);
    }

    if (typeof exception === 'string') {
      return new ErrorResult(new Error(exception));
    }

    const text = fallbackMessage ?? `An unknown error occurred: ${String(exception)}`;
    return new ErrorResult(new Error(text, { cause: exception }));
  }

  public propagate<X extends JsError = DefaultError>(
    messageOrConstructor: string | (new (message: string, options?: { cause?: unknown }) => X),
    message?: string
  ): ErrorResult<T, X> | ErrorResult<T> {
    if (typeof messageOrConstructor === 'string') {
      const exception = new Error(messageOrConstructor, { cause: this.error });
      return new ErrorResult<T>(exception);
    }

    // eslint-disable-next-line new-cap, @typescript-eslint/no-non-null-assertion
    const exception = new messageOrConstructor(message!, { cause: this.error });
    return new ErrorResult<T>(exception);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public unwrap<F = T>({
    fallback,
    panics,
  }: {
    readonly fallback?: F;
    readonly panics?: boolean;
  } = {}): never | F {
    if (fallback !== void 0) return fallback; // eslint-disable-line no-void
    if (!(panics ?? this.panics)) throw this.error;
    console.error(`Panic: called unwrap on an ${names.error.long}`); // eslint-disable-line no-console
    console.error(this.error); // eslint-disable-line no-console
    return process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isError(): this is ErrorResult<T, E> {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, jsdoc/require-jsdoc
  public isOkay(): this is OkayResult<T, E> {
    return false;
  }

  public instanceOf<C extends new (...args: never) => JsError>(
    type: C
  ): this is ErrorResult<T, InstanceType<C>> {
    return this.error instanceof type;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public match<ErrorReturn = DefaultMatchResult>(
    options: ResultMatchErrorFullName<ErrorReturn, E> | ResultMatchErrorShortName<ErrorReturn, E>
  ): ErrorReturn {
    const callbackFunctionName = `${names.base}.match => ${names.error.long}`;

    if (names.error.short in options) {
      const key = names.error.short;
      Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
      return options[key](this.error);
    }

    const key = names.error.long;
    Object.defineProperty(options[key], 'name', { value: callbackFunctionName });
    return options[key](this.error);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public toString(): `${typeof names.error.long}(${string})` {
    return `${names.error.long}(${this.error.name})`;
  }
}

Object.defineProperty(ErrorResult, 'name', { value: names.error.long });
