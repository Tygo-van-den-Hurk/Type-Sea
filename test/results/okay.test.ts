import * as names from '#src/results/const';
import { describe, expect, test, vi } from 'vitest';
import { BaseResult } from '#src/results/base';
import { OkayResult } from '#src/results/okay';

describe(`class ${names.okay.long}`, () => {
  const value = '<VERY_SPECIFIC_PATTERN>' as const;

  test(`class ${names.error.long} is instance of '${names.base}' and '${names.error.long}'`, () => {
    expect(OkayResult.create(0)).instanceOf(BaseResult);
    expect(OkayResult.create(0)).instanceOf(OkayResult);
  });

  test(`class ${OkayResult.name}.name is '${names.okay.long}'`, () => {
    expect(OkayResult.name).toBe(names.okay.long);
  });

  test(`class ${names.okay.long}<T, E> extends ${BaseResult.name}<T, E>`, () => {
    expect(OkayResult.create(value)).toBeInstanceOf(BaseResult);
  });

  test(`expression '${names.okay.long}.create(...).type' is '${names.okay.long}'`, () => {
    const result = OkayResult.create(value);
    expect(result.type).toBe(names.okay.long);
  });

  test(`expression '${names.okay.long}.create(<VALUE>).value' is '<VALUE>'`, () => {
    const result = OkayResult.create(value);
    expect(result.value).toBe(value);
  });

  test(`expression '${names.okay.long}.create(...).isError()' is 'false'`, () => {
    const result = OkayResult.create(value);
    expect(result.isError()).toBe(false);
  });

  test(`expression '${names.okay.long}.create(...).isOkay()' is 'true'`, () => {
    const result = OkayResult.create(value);
    expect(result.isOkay()).toBe(true);
  });

  test(`expression '${names.okay.long}.create(...).toString()' to match '${names.okay.long}(...)`, () => {
    const result = OkayResult.create(value);
    const regex = new RegExp(`^${names.okay.long}\\(.*\\)$`, 'u');
    expect(result.toString()).toMatch(regex);
  });

  test(`expression '${names.okay.long}.create(<VALUE>).unwrap()' returns '<VALUE>'`, () => {
    const result = OkayResult.create(value);
    expect(result.unwrap()).toBe(value);
  });

  test(`expression '${names.okay.long}.unwrap({ fallback: <VALUE> })' to return '<VALUE>'`, () => {
    const fallback = 'value' as const;
    const result = OkayResult.create(value) as BaseResult<typeof value>;
    expect(result.unwrap({ fallback })).toBe(value);
    expect(result.unwrap({ fallback })).not.toBe(fallback);
  });

  test(`expression '${names.okay.long}.match(...)' to return a exec right branch`, () => {
    const result = OkayResult.create(value);
    const spy1 = vi.fn();
    result.match({ Okay: spy1 });
    expect(spy1).toHaveBeenCalledWith(value);
    expect(spy1.name).toContain(names.okay.long);
    const spy2 = vi.fn();
    result.match({ 'Result::Okay': spy2 });
    expect(spy2).toHaveBeenCalledWith(value);
    expect(spy2.name).toContain(names.okay.long);
  });
});
