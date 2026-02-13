import * as names from '#src/results/const';
import { describe, expect, test } from 'vitest';
import { BaseResult } from '#src/results/base';
import { ErrorResult } from '#src/results/error';
import { OkayResult } from '#src/results/okay';
import { Result } from '#src/results/index';

describe(`type ${names.base}`, () => {
  test(`expression '${names.base}.name' is '${names.base}'`, () => {
    expect(Result.name).toBe(names.base);
  });

  test(`property '${names.base}.Class' is '${names.base}' class`, () => {
    expect(Result.Class).toBe(BaseResult);
  });

  test(`property '${names.base}.Error' is '${names.error.long}' class`, () => {
    expect(Result.Error).toBe(ErrorResult);
  });

  test(`property '${names.base}.ERROR' is '${names.error.long}'`, () => {
    expect(Result.ERROR).toBe(names.error.long);
  });

  expect(Result.error.name).toBe(`${names.base}.error`);

  test(`function '${names.base}.error' returns instance of '${names.error.long}'`, () => {
    const cause = new Error('some previous error');
    expect(Result.error('test', cause)).instanceOf(ErrorResult);
    expect(Result.error(new Error('test'))).instanceOf(ErrorResult);
  });

  expect(Result.okay.name).toBe(`${names.base}.okay`);

  test(`property '${names.base}.Okay' is '${names.okay.long}' class`, () => {
    expect(Result.Okay).toBe(OkayResult);
  });

  test(`property '${names.base}.OKAY' is '${names.okay.long}'`, () => {
    expect(Result.OKAY).toBe(names.okay.long);
  });

  test(`function '${names.base}.okay' returns instance of '${names.okay.long}'`, () => {
    expect(Result.okay('test')).instanceOf(OkayResult);
  });

  expect(Result.exec.name).toBe(`${names.base}.exec`);

  const error = new Error('<VERY_SPECIFIC_PATTERN>');

  const throwOdd = function throwOdd(num: number): number {
    if (num % 2 === 1) throw error;
    return num;
  };

  test(`function '${names.base}.exec' returns instance of '${names.error.long}' when thrown`, () => {
    const value = 1;
    expect(() => throwOdd(value)).toThrow(error);
    const result = Result.exec(throwOdd, value);
    expect(result.isError()).toBe(true);
    const errorResult = result as ErrorResult<number>;
    expect(errorResult.error).toBe(error);
  });

  test(`function '${names.base}.exec' returns instance of '${names.okay.long}' when returning`, () => {
    const value = 1_123_000;
    expect(() => throwOdd(value)).not.toThrow();
    const result = Result.exec(throwOdd, value);
    expect(result.isOkay()).toBe(true);
    const errorResult = result as OkayResult<number>;
    expect(errorResult.value).toBe(value);
  });

  const throwOddAsync = async function throwOddAsync(num: number): Promise<number> {
    if (num % 2 === 1) throw error;
    return Promise.resolve(num);
  };

  test(`function '${names.base}.exec' (async) returns instance of '${names.error.long}' when thrown`, async () => {
    const value = 1;
    await expect(async () => throwOddAsync(value)).rejects.toThrow(error);
    const result = await Result.exec(throwOddAsync, value);
    expect(result.isError()).toBe(true);
    const errorResult = result as ErrorResult<number>;
    expect(errorResult.error).toBe(error);
  });

  test(`function '${names.base}.exec' (async) returns instance of '${names.okay.long}' when returning`, async () => {
    const value = 1_123_000;
    await expect(throwOddAsync(value)).resolves.not.toThrow();
    const result = await Result.exec(throwOddAsync, value);
    expect(result.isOkay()).toBe(true);
    const errorResult = result as OkayResult<number>;
    expect(errorResult.value).toBe(value);
  });

  expect(Result.fromThrown.name).toBe(`${names.base}.fromThrown`);

  test(`function '${names.base}.fromThrown' returns instance of '${names.error.long}' when returning`, () => {
    expect(Result.fromThrown(1)).instanceOf(ErrorResult);
  });
});
