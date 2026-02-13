import type { PanicAble } from '#src/common/panic';

/** A common interface for all things that are unwrapAble. */
export interface UnwrapAble<T> extends PanicAble {
  /**
   * Returns the value T if this result is successful, but throws or panics if it is not.
   */
  readonly unwrap: (() => T | never) &
    (<F = T>(options: { readonly fallback?: F; readonly panics?: boolean }) => T | F | never);
}
