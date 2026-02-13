import * as names from '#src/results/const';
import { describe, expect, test } from 'vitest';
import { BaseResult } from '#src/results/base';

describe(`class ${names.base}`, () => {
  test(`class ${BaseResult.name}.name is '${names.base}'`, () => {
    expect(BaseResult.name).toBe(names.base);
  });
});
