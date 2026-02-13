import type { DefaultError, DefaultType, JsError } from '#src/results/types';
import { BaseOptional } from '#src/optionals/base';
import { BaseResult } from '#src/results/base';
import { NoSuchElementError } from '#src/optionals/utils';
import { Optional } from '#src/optionals/index';
import { Result } from '#src/results/index';

// These methods relies on Both `Result` and `Optional` which results in cyclic dependencies.

type Writable<T> = { -readonly [P in keyof T]: T[P] };

declare module '#src/results/base' {
  interface BaseResult<T, E> {
    /**
     * Transforms this `Result<T, E>` to an `Optional<T>`. If the value is `Result::Okay` then the value will transformed
     * into an `Optional::Some<T>`, and if the value is a `Result::Error` then the value will transformed
     * an `Optional::None` object.
     */
    readonly toOptional: () => Optional<T & {}>;

    /**
     * Transforms this `Result<T, E>` to a `Result<NonNullable<T>, E | NoSuchElementError>`. Where:
     * - if this result is a `Result::Error<T, E>` it will become a `Result::Error<NonNullable<T>, E>`.
     * - if this result is a `Result::Okay<X, E>` where `X` is nullable it will become
     *   a `Result::Error<never, NoSuchElementError>`.
     * - if this result is a `Result::Okay<X, E>` where `X` is not nullable then it will become
     *   a `Result::Okay<NonNullable<T>, E>`.
     */
    readonly nonNullable: () => Result<NonNullable<T>, E | NoSuchElementError>;
  }
}

(BaseResult.prototype as Writable<typeof BaseResult.prototype>).toOptional = function toOptional<
  T,
>(): Optional<T & {}> {
  return this.match({
    [Result.ERROR]: () => Optional.none(),
    [Result.OKAY]: (value: T) => Optional.from(value),
  });
};

(BaseResult.prototype as Writable<typeof BaseResult.prototype>).nonNullable = function nonNullable<
  T,
  E extends JsError = DefaultError,
>(): Result<NonNullable<T>, E | NoSuchElementError> {
  type E2 = NoSuchElementError;
  type T2 = NonNullable<T>;

  return this.match({
    [Result.ERROR]: (error: E) => Result.error<T2, E>(error),
    [Result.OKAY]: (value: T) =>
      Optional.from(value).match({
        [Optional.SOME]: (nonNull: T2) => Result.okay<T2>(nonNull),
        [Optional.NONE]: () => Result.error<T2, E2>(new NoSuchElementError()) as Result<T2, E2>,
      }),
  });
};

declare module '#src/optionals/base' {
  interface BaseOptional<T> {
    /**
     * Converts this Optional to a Result. If the Optional is None, returns a `Result::Error`
     * with a `NoSuchElementError`. If the Optional is Some, returns a `Result::Okay` with the value.
     */
    readonly toResult: {
      /**
       * Converts this Optional to a Result with a custom error type.
       */
      <E extends JsError>(error: E): Result<T, E>;
      (): Result<T, NoSuchElementError>;
    };
  }
}

(BaseOptional.prototype as Writable<typeof BaseOptional.prototype>).toResult = function toResult<
  T = DefaultType,
  E extends JsError = DefaultError,
>(error?: E): Result<T, E | NoSuchElementError> {
  return this.match({
    [Optional.NONE]: () => Result.error(error ?? new NoSuchElementError()),
    [Optional.SOME]: (value) => Result.okay(value),
  });
};

export * from '#src/optionals/index';
export * from '#src/results/index';
