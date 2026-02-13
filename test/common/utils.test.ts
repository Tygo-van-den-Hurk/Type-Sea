/* eslint-disable max-classes-per-file */
import { describe, expect, test } from 'vitest';
import { represent } from '#src/common/utils';

describe(`function ${represent.name}`, () => {
  // Type === null

  test(`expression '${represent.name}(null)' equals 'null'`, () => {
    expect(represent(null)).toBe('null');
  });

  // Type === boolean

  test(`expression '${represent.name}(false)' equals 'false'`, () => {
    expect(represent(false)).toBe('false');
  });

  test(`expression '${represent.name}(true)' equals 'true'`, () => {
    expect(represent(true)).toBe('true');
  });

  // Type === Number

  test(`expression '${represent.name}(1)' equals '1'`, () => {
    expect(represent(false)).toBe('false');
  });

  test(`expression '${represent.name}(1.1)' equals '1.1'`, () => {
    expect(represent(1.1)).toBe('1.1');
  });

  test(`expression '${represent.name}(-1)' equals '-1'`, () => {
    expect(represent(-1)).toBe('-1');
  });

  test(`expression '${represent.name}(NaN)' equals 'NaN'`, () => {
    expect(represent(NaN)).toBe('NaN');
  });

  test(`expression '${represent.name}(Infinity)' equals 'Infinity'`, () => {
    expect(represent(Infinity)).toBe('Infinity');
  });

  test(`expression '${represent.name}(12345678901234567890n)' equals '12345678901234567890'`, () => {
    expect(represent(12345678901234567890n)).toBe('12345678901234567890');
  });

  // Type === undefined || Type === void 0

  test(`expression '${represent.name}(void 0)' equals ''`, () => {
    expect(represent(undefined)).toBe(''); // eslint-disable-line no-undefined
    expect(represent(void 0)).toBe(''); // eslint-disable-line no-void
  });

  // Type === function

  test(`expression '${represent.name}(() => ({})))' equals 'function'`, () => {
    expect(represent(() => ({}))).toBe('function');
  });

  test(`expression '${represent.name}(object.function))' equals 'function'`, () => {
    const someFn = function someFn(): void {
      // Do nothing
    };

    expect(represent(someFn)).toBe('function');
  });

  // Type === Class

  test(`expression '${represent.name}(class ABC {})' equals 'ABC'`, () => {
    const Class = class ABC {
      public field = '';
    };

    expect(represent(Class)).toBe('ABC');
  });

  test(`expression '${represent.name}(class {})' equals 'Class'`, () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const Class = (() =>
      class {
        public field = '';
      })();

    expect(represent(Class)).toBe('Class');
  });

  // Type === Symbol

  test(`expression '${represent.name}(Symbol(...))' equals 'symbol'`, () => {
    expect(represent(Symbol('description'))).toBe('symbol');
  });

  // Type === Array

  test(`expression '${represent.name}([1, 2, 3])' equals '[1, 2, 3]'`, () => {
    expect(represent([1, 2, 3])).toBe('[1, 2, 3]');
  });

  test(`expression '${represent.name}([1, null, 3])' equals '[1, null, true]'`, () => {
    expect(represent([1, null, true])).toBe('[1, null, true]');
  });

  // Type === string

  test(`expression '${represent.name}("test")' equals '"test"'`, () => {
    expect(represent('test')).toBe('"test"');
  });

  test(`expression '${represent.name}("a long string with a bunch of information")' equals '"a long st...formation"'`, () => {
    expect(represent('a long string with a bunch of information')).toBe('"a long st...formation"');
  });

  // Type === object

  test(`expression '${represent.name}({ test: 4 })' equals '{ test }'`, () => {
    expect(represent({ test: 4 })).toBe('{ test }');
  });

  test(`expression '${represent.name}({ test: 4, value: true })' equals '"a long st...formation"'`, () => {
    expect(represent({ test: 4, value: true })).toBe('{ test, value }');
  });
});
