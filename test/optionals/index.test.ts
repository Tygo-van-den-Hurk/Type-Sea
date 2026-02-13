import * as names from '#src/optionals/const';
import { describe, expect, test } from 'vitest';
import { BaseOptional } from '#src/optionals/base';
import { NoneOptional } from '#src/optionals/none';
import { Optional } from '#src/optionals/index';
import { SomeOptional } from '#src/optionals/some';

describe(`type ${Optional.name}`, () => {
  test(`expression '${Optional.name}.name' is '${BaseOptional.name}'`, () => {
    expect(Optional.name).toBe(names.base);
  });

  test(`property '${Optional.name}.Class' is '${BaseOptional.name}' class`, () => {
    expect(Optional.Class).toBe(BaseOptional);
  });

  expect(Optional.none.name).toBe(`${Optional.name}.none`);

  test(`property '${Optional.name}.None' is '${NoneOptional.name}' class`, () => {
    expect(Optional.None).toBe(NoneOptional);
  });

  test(`property '${Optional.name}.NONE' is '${names.none.long}'`, () => {
    expect(Optional.NONE).toBe(names.none.long);
  });

  test(`function '${Optional.name}.none' returns instance of '${NoneOptional.name}'`, () => {
    expect(Optional.none()).instanceOf(NoneOptional);
  });

  expect(Optional.some.name).toBe(`${Optional.name}.some`);

  test(`property '${Optional.name}.Some' is '${SomeOptional.name}' class`, () => {
    expect(Optional.Some).toBe(SomeOptional);
  });

  test(`property '${Optional.name}.SOME' is '${SomeOptional.name}'`, () => {
    expect(Optional.SOME).toBe(names.some.long);
  });

  test(`function '${Optional.name}.some' returns instance of '${SomeOptional.name}'`, () => {
    expect(Optional.some('test')).instanceOf(SomeOptional);
  });

  const returnOdd = function returnOdd(num: number): number | null {
    if (num % 2 === 1) return num;
    return null;
  };

  test(`function '${Optional.name}.exec' returns instance of '${NoneOptional.name}' when returning a nullish value`, () => {
    const value = 1_123_000;
    expect(returnOdd(value)).toBe(null);
    const optional = Optional.exec(returnOdd, value);
    expect(optional.isNone()).toBe(true);
  });

  test(`function '${Optional.name}.exec' returns instance of '${SomeOptional.name}' when returning a value`, () => {
    const value = 1;
    expect(returnOdd(value)).toBe(value);
    const optional = Optional.exec(returnOdd, value);
    expect(optional.isSome()).toBe(true);
    const someOptional = optional as SomeOptional<number>;
    expect(someOptional.value).toBe(value);
  });

  const returnOddAsync = async function returnOddAsync(num: number): Promise<number | null> {
    if (num % 2 === 1) return Promise.resolve(num);
    return Promise.resolve(null);
  };

  test(`function '${Optional.name}.exec' (async) returns instance of '${NoneOptional.name}' when returning a nullish value`, async () => {
    const value = 1_123_000;
    const returns = await returnOddAsync(value);
    expect(returns).toBe(null);
    const optional = await Optional.exec(returnOddAsync, value);
    expect(optional.isNone()).toBe(true);
  });

  test(`function '${Optional.name}.exec' (async) returns instance of '${SomeOptional.name}' when returning`, async () => {
    const value = 1;
    const returns = await returnOddAsync(value);
    expect(returns).toBe(value);
    const optional = await Optional.exec(returnOddAsync, value);
    expect(optional.isSome()).toBe(true);
    const someOptional = optional as SomeOptional<number>;
    expect(someOptional.value).toBe(value);
  });

  expect(Optional.exec.name).toBe(`${Optional.name}.exec`);
});
