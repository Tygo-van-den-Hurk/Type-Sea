import * as names from '#src/optionals/const';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BaseOptional } from '#src/optionals/base';
import { NoneOptional } from '#src/optionals/none';
import { PanicAble } from '#src/common/panic';

describe(`class ${names.none.long}`, () => {
  const message = '<VERY_SPECIFIC_PATTERN>' as const;

  beforeEach(() => {
    PanicAble.panics = false;
  });

  test(`class ${names.none.long} is instance of '${names.base}'`, () => {
    expect(NoneOptional.create()).instanceOf(BaseOptional);
    expect(NoneOptional.create()).instanceOf(NoneOptional);
  });

  test(`class ${NoneOptional.name}.name is '${names.none.long}'`, () => {
    expect(NoneOptional.name).toBe(names.none.long);
  });

  test(`expression '${names.none.long}.create().type' is '${names.none.long}'`, () => {
    const optional = NoneOptional.create();
    expect(optional.type).toBe(names.none.long);
  });

  test(`expression '${names.none.long}.create().isNone()' is 'true'`, () => {
    const optional = NoneOptional.create();
    expect(optional.isNone()).toBe(true);
  });

  test(`expression '${names.none.long}.create().isSome()' is 'false'`, () => {
    const optional = NoneOptional.create();
    expect(optional.isSome()).toBe(false);
  });

  test(`expression '${names.none.long}.create(...).toString()' to match '${names.none.long}(...)`, () => {
    const optional = NoneOptional.create();
    const regex = new RegExp(`^${names.none.long}\\(.*\\)$`, 'u');
    expect(optional.toString()).toMatch(regex);
  });

  test(`expression '${names.none.long}.unwrap({ fallback: <VALUE> })' to return '<VALUE>'`, () => {
    const fallback = message;
    const optional = NoneOptional.create() as BaseOptional<typeof message>;
    expect(optional.unwrap({ fallback })).toBe(fallback);
  });

  test(`expression '${names.none.long}.unwrap({ fallback: <VALUE> })' to return '<VALUE>'`, () => {
    const fallback = message;
    const optional = NoneOptional.create() as BaseOptional<typeof message>;
    expect(optional.unwrap({ fallback })).toBe(fallback);
  });

  test(`expression '${names.none.long}.unwrap()' to throw`, () => {
    const optional = NoneOptional.create();
    NoneOptional.panics = false;
    optional.panics = false;
    const fn = (): unknown => optional.unwrap();
    expect(fn).toThrow();
  });

  test(`expression '${names.none.long}.unwrap({ panic: true })' to exit`, () => {
    const spy = vi.spyOn(process, 'exit').mockImplementation((exitCode) => {
      expect(exitCode).toBeGreaterThan(0);
      return void 0 as never; // eslint-disable-line no-void
    });

    const optional = NoneOptional.create();
    optional.unwrap({ panics: true });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test(`expression '${names.none.long}.match(...)' to return a exec right branch`, () => {
    const optional = NoneOptional.create();
    const spy1 = vi.fn();
    optional.match({ None: spy1 });
    expect(spy1).toHaveBeenCalledWith();
    expect(spy1.name).toContain(names.none.long);
    const spy2 = vi.fn();
    optional.match({ 'Optional::None': spy2 });
    expect(spy2).toHaveBeenCalledWith();
    expect(spy2.name).toContain(names.none.long);
  });
});
