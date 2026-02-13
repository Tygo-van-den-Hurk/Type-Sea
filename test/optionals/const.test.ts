import * as names from '#src/optionals/const';
import { describe, expect, test } from 'vitest';

describe(`namespace names`, () => {
  test(`const names.base is 'Optional'`, () => {
    expect(names.base).toBe('Optional');
  });

  test(`const names.none.long is 'Optional::None'`, () => {
    expect(names.none.long).toBe('Optional::None');
  });

  test(`const names.none.short is 'None'`, () => {
    expect(names.none.short).toBe('None');
  });

  test(`const names.some.long is 'Optional::Some'`, () => {
    expect(names.some.long).toBe('Optional::Some');
  });

  test(`const names.some.short is 'Some'`, () => {
    expect(names.some.short).toBe('Some');
  });
});
