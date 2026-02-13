import * as names from '#src/optionals/const';
import { describe, expect, test, vi } from 'vitest';
import { BaseOptional } from '#src/optionals/base';
import { SomeOptional } from '#src/optionals/some';

describe(`class ${names.some.long}`, () => {
  const value = '<VERY_SPECIFIC_PATTERN>' as const;

  test(`class ${names.some.long} is instance of '${names.base}'`, () => {
    expect(SomeOptional.create(0)).instanceOf(BaseOptional);
    expect(SomeOptional.create(0)).instanceOf(SomeOptional);
  });

  test(`class ${SomeOptional.name}.name is '${names.some.long}'`, () => {
    expect(SomeOptional.name).toBe(names.some.long);
  });

  test(`expression '${names.some.long}.create(...).type' is '${names.some.long}'`, () => {
    const optional = SomeOptional.create(value);
    expect(optional.type).toBe(names.some.long);
  });

  test(`expression '${names.some.long}.create(<VALUE>).value' is '<VALUE>'`, () => {
    const optional = SomeOptional.create(value);
    expect(optional.value).toBe(value);
  });

  test(`expression '${names.some.long}.create(...).isNone()' is 'false'`, () => {
    const optional = SomeOptional.create(value);
    expect(optional.isNone()).toBe(false);
  });

  test(`expression '${names.some.long}.create(...).isSome()' is 'true'`, () => {
    const optional = SomeOptional.create(value);
    expect(optional.isSome()).toBe(true);
  });

  test(`expression '${names.some.long}.create(...).toString()' to match '${names.some.long}(...)`, () => {
    const optional = SomeOptional.create(value);
    const regex = new RegExp(`^${names.some.long}\\(.*\\)$`, 'u');
    expect(optional.toString()).toMatch(regex);
  });

  test(`expression '${names.some.long}.create(<VALUE>).unwrap()' returns '<VALUE>'`, () => {
    const optional = SomeOptional.create(value);
    expect(() => optional.unwrap()).not.toThrow();
    expect(optional.unwrap()).toBe(value);
  });

  test(`expression '${names.some.long}.unwrap({ fallback: <VALUE> })' to return '<VALUE>'`, () => {
    const fallback = 'value' as const;
    const optional = SomeOptional.create(value) as BaseOptional<typeof value>;
    expect(optional.unwrap({ fallback })).toBe(value);
    expect(optional.unwrap({ fallback })).not.toBe(fallback);
  });

  test(`expression '${names.some.long}.match(...)' to return a exec right branch`, () => {
    const optional = SomeOptional.create(value);
    const spy1 = vi.fn();
    optional.match({ Some: spy1 });
    expect(spy1).toHaveBeenCalledWith(value);
    expect(spy1.name).toContain(names.some.long);
    const spy2 = vi.fn();
    optional.match({ 'Optional::Some': spy2 });
    expect(spy2).toHaveBeenCalledWith(value);
    expect(spy2.name).toContain(names.some.long);
  });
});
