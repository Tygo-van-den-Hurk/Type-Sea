import * as names from '#src/results/const';
import { describe, expect, test } from 'vitest';

describe(`namespace names`, () => {
  test(`const names.base is 'Result'`, () => {
    expect(names.base).toBe('Result');
  });

  test(`const names.error.long is 'Result::Error'`, () => {
    expect(names.error.long).toBe('Result::Error');
  });

  test(`const names.error.short is 'Error'`, () => {
    expect(names.error.short).toBe('Error');
  });

  test(`const names.some.long is 'Result::Okay'`, () => {
    expect(names.okay.long).toBe('Result::Okay');
  });

  test(`const names.some.short is 'Okay'`, () => {
    expect(names.okay.short).toBe('Okay');
  });
});
