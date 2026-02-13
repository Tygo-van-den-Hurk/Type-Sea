import { beforeEach, describe, expect, test } from 'vitest';
import { PanicAble } from '#src/common/panic';

describe(`class ${PanicAble.name}`, () => {
  const defaultState = PanicAble.panics;

  beforeEach(() => {
    PanicAble.panics = defaultState;
  });

  test(`expression '${PanicAble.name}.panics' equals 'false'`, () => {
    expect(PanicAble.panics).toBe(false);
  });

  test(`expression '(new ${PanicAble.name}).panics' equals 'false'`, () => {
    expect(new PanicAble().panics).toBe(false);
  });

  test(`Changing static influences all panics, instance overrides static`, () => {
    const panic = new PanicAble();
    PanicAble.panics = !PanicAble.panics;
    expect(panic.panics).toBe(PanicAble.panics);
    panic.panics = !PanicAble.panics;
    expect(panic.panics).toBe(!PanicAble.panics);
  });
});
