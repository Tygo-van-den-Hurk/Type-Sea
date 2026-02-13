import * as names from '#src/optionals/const';
import { describe, expect, test } from 'vitest';
import { BaseOptional } from '#src/optionals/base';

describe(`class ${BaseOptional.name}`, () => {
  test(`class ${BaseOptional.name}.name is 'Result'`, () => {
    expect(BaseOptional.name).toBe(names.base);
  });
});
