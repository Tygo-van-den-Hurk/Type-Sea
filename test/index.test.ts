import '#src/index';
import * as optionalNames from '#src/optionals/const';
import * as resultNames from '#src/results/const';
import { describe, expect, test } from 'vitest';
import type { ErrorResult } from '#src/results/error';
import { NoSuchElementError } from '#src/optionals/utils';
import type { OkayResult } from '#src/results/okay';
import { Optional } from '#src/optionals/index';
import { Result } from '#src/results/index';

describe(`class ${Result.name}`, () => {
  const pattern = '<VERY_SPECIFIC_PATTERN>' as const;

  test(`expression '${resultNames.error.long}(...).toOptional()' is '${optionalNames.some.long}(...)'`, () => {
    const result = Result.okay(pattern);
    const optional = result.toOptional();
    expect(optional.isSome()).toBe(true);
    expect(() => optional.unwrap()).not.toThrow();
    expect(optional.unwrap()).toBe(pattern);
    expect(optional).toStrictEqual(Optional.some(pattern));
  });

  test(`expression '${resultNames.error.long}().toOptional()' is '${optionalNames.none.long}()'`, () => {
    const result = Result.okay();
    const optional = result.toOptional();
    expect(optional.isNone()).toBe(true);
  });

  test(`expression '${resultNames.error.long}(...).toOptional()' is '${optionalNames.none.long}()'`, () => {
    const result = Result.error('This is a test');
    const optional = result.toOptional();
    expect(optional.isNone()).toBe(true);
  });

  test(`expression '${resultNames.okay.long}(null).nonNullable()' is '${resultNames.error.long}()'`, () => {
    const result = Result.okay(null).nonNullable();
    expect(result).instanceOf(Result.Error);
    expect(result.isError()).toBe(true);
    const { error } = result as ErrorResult<never, NoSuchElementError>;
    expect(error).instanceOf(NoSuchElementError);
  });

  test(`expression '${resultNames.okay.long}(<VALUE>).nonNullable()' is '${resultNames.okay.long}()'`, () => {
    const result = Result.okay(pattern as string | null).nonNullable();
    expect(result).instanceOf(Result.Okay);
    expect(result.isOkay()).toBe(true);
    const { value } = result as OkayResult<string, never>;
    expect(value).toBe(pattern);
  });

  test(`expression '${resultNames.error.long}(<ERROR>).nonNullable()' is '${resultNames.error.long}(<ERROR>)'`, () => {
    class MyError extends Error {}
    const error = new MyError(pattern);
    const result = Result.error(error).nonNullable();
    expect(result).instanceOf(Result.Error);
    expect(result.isError()).toBe(true);
    const errorResult = result as ErrorResult<never, MyError>;
    expect(errorResult.error).instanceOf(MyError);
    expect(errorResult.message).toBe(error.message);
  });
});

describe(`class ${Optional.name}`, () => {
  const pattern = '<VERY_SPECIFIC_PATTERN>' as const;

  test(`expression '${optionalNames.some.long}(...).toResult()' is '${Result.Okay.name}(...)'`, () => {
    const optional = Optional.some(pattern);
    const result = optional.toResult();
    expect(result.isOkay()).toBe(true);
    expect(() => result.unwrap()).not.toThrow();
    expect(result.unwrap()).toBe(pattern);
    expect(result).toStrictEqual(Result.okay(pattern));
  });

  test(`expression '${optionalNames.none.long}().toResult()' is '${Result.Error.name}(${NoSuchElementError.name})'`, () => {
    const optional = Optional.none();
    const result = optional.toResult();
    expect(result.isError()).toBe(true);
    const error = result as ErrorResult<string, NoSuchElementError>;
    expect(error.error).instanceOf(NoSuchElementError);
  });

  test(`expression '${optionalNames.none.long}().toResult()' is '${Result.Error.name}(${NoSuchElementError.name})'`, () => {
    const optional = Optional.none();
    const result = optional.toResult(new TypeError(pattern));
    expect(result.isError()).toBe(true);
    const error = result as ErrorResult<string, NoSuchElementError>;
    expect(error.error).instanceOf(TypeError);
  });
});
