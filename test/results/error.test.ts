/* eslint-disable max-classes-per-file */

import * as names from '#src/results/const';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BaseResult } from '#src/results/base';
import { ErrorResult } from '#src/results/error';
import { PanicAble } from '#src/common/panic';

describe(`class ${names.error.long}`, () => {
  const cause = '<VERY_SPECIFIC_PATTERN_1>' as const;
  const message = '<VERY_SPECIFIC_PATTERN_2>' as const;
  const error = new TypeError(message, { cause });

  beforeEach(() => {
    PanicAble.panics = false;
  });

  test(`class ${names.error.long} is instance of '${names.base}' and '${names.error.long}'`, () => {
    expect(ErrorResult.create(error)).instanceOf(BaseResult);
    expect(ErrorResult.create(error)).instanceOf(ErrorResult);
  });

  test(`class ${names.error.long}<T, E> extends ${BaseResult.name}<T, E>`, () => {
    expect(ErrorResult.create(error)).toBeInstanceOf(BaseResult);
  });

  test(`class ${ErrorResult.name}.name is '${names.error.long}'`, () => {
    expect(ErrorResult.name).toBe(names.error.long);
  });

  test(`expression '${names.error.long}.create(<ERROR>).type' is '${names.error.long}'`, () => {
    const result = ErrorResult.create(error);
    expect(result.type).toBe(names.error.long);
  });

  test(`expression '${names.error.long}.create(<ERROR>).error' is '<ERROR>'`, () => {
    const result = ErrorResult.create(error);
    expect(result.error).toBe(error);
  });

  test(`expression '${names.error.long}.create(...).isError()' is 'true'`, () => {
    const result = ErrorResult.create(error);
    expect(result.isError()).toBe(true);
  });

  test(`expression '${names.error.long}.create(...).isOkay()' is 'false'`, () => {
    const result = ErrorResult.create(error);
    expect(result.isOkay()).toBe(false);
  });

  test(`expression '${names.error.long}.create(<ERROR>).name' is '<ERROR>.name'`, () => {
    const result = ErrorResult.create(error);
    expect(result.name).toBe(error.name);
  });

  test(`expression '${names.error.long}.create(<ERROR>).message' is '<ERROR>.message'`, () => {
    const result = ErrorResult.create(error);
    expect(result.message).toBe(error.message);
  });

  test(`expression '${names.error.long}.create(<ERROR>).cause' is '<ERROR>.cause'`, () => {
    const result = ErrorResult.create(error);
    expect(result.cause).toBe(error.cause);
  });

  test(`expression '${names.error.long}.create(<ERROR>).instanceOf(<ERROR>)' is 'true'`, () => {
    const result = ErrorResult.create(error);
    expect(result.instanceOf(TypeError)).toBe(true);
    class Never extends Error {}
    expect(result.instanceOf(Never)).toBe(false);
  });

  test(`expression '${names.error.long}.create(...).toString()' to match '${names.error.long}(...)`, () => {
    const result = ErrorResult.create(error);
    const regex = new RegExp(`^${names.error.long}\\(.*\\)$`, 'u');
    expect(result.toString()).toMatch(regex);
  });

  test(`expression '${names.error.long}.unwrap()' throws`, () => {
    const result = ErrorResult.create(error);
    const fn = (): unknown => result.unwrap();
    expect(fn).toThrow(error);
  });

  test(`expression '${names.error.long}.propagate(<ERROR>)' to return a ${names.error.long}`, () => {
    const result = ErrorResult.create(error);
    const message2 = '<VERY_SPECIFIC_PATTERN_2>';
    expect(result.propagate(message2)).toBeInstanceOf(ErrorResult);
    expect(result.propagate(message2).error).toBeInstanceOf(Error);
    expect(result.propagate(message2).error.message).toBe(message2);
    expect(result.propagate(message2).error.cause).toBe(result.error);
  });

  test(`expression '${names.error.long}.propagate(<ERROR>, <STRING>)' to return a ${names.error.long}`, () => {
    const result = ErrorResult.create(error);
    const message2 = '<VERY_SPECIFIC_PATTERN_2>';
    const Class = class MyError extends Error {};
    expect(result.propagate(Class, message2)).toBeInstanceOf(ErrorResult);
    expect(result.propagate(Class, message2).error).toBeInstanceOf(Class);
    expect(result.propagate(Class, message2).error.message).toBe(message2);
    expect(result.propagate(Class, message2).error.cause).toBe(result.error);
  });

  test(`expression '${names.error.long}.unwrap({ fallback: <VALUE> })' to return '<VALUE>'`, () => {
    const fallback = message;
    const result = ErrorResult.create(error) as ErrorResult<typeof message>;
    expect(result.unwrap({ fallback })).toBe(fallback);
  });

  test(`expression '${names.error.long}.unwrap({ panics: false })' to throw`, () => {
    const result = ErrorResult.create(error);
    ErrorResult.panics = true;
    result.panics = true;
    const fn = (): unknown => result.unwrap({ panics: false });
    expect(fn).toThrow();
  });

  test(`expression '${names.error.long}.unwrap({ panic: true })' to exit`, () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation((exitCode) => {
      expect(exitCode).toBeGreaterThan(0);
      return void 0 as never; // eslint-disable-line no-void
    });

    const result = ErrorResult.create(error);
    result.unwrap({ panics: true });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test(`expression '${names.error.long}.fromThrown(...)' to return a '${names.error.long}'`, () => {
    const result = ErrorResult.fromThrown(error);
    expect(result.error).toBe(error);
    expect(ErrorResult.fromThrown(message).error.message).toBe(message);
    expect(ErrorResult.fromThrown(1).error.cause).toBe(1);
  });

  test(`expression '${names.error.long}.match(...)' to return a exec right branch`, () => {
    const result = ErrorResult.create(error);
    const spy1 = vi.fn();
    result.match({ Error: spy1 });
    expect(spy1).toHaveBeenCalledWith(error);
    expect(spy1.name).toContain(names.error.long);
    const spy2 = vi.fn();
    result.match({ 'Result::Error': spy2 });
    expect(spy2).toHaveBeenCalledWith(error);
    expect(spy2.name).toContain(names.error.long);
  });
});
