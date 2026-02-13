import type * as names from '#src/optionals/const';
import type { DefaultMatchResult } from '#src/common/types';

/** The base type that all `T` in `Optional`s will extend. */
export type BaseType = NonNullable<unknown>;

/** The match arm by full name of the `Optional::Some` enum variant. */
export interface OptionalMatchSomeFullName<T extends BaseType, R = DefaultMatchResult> {
  readonly [names.some.long]: (value: T) => R;
}

/** The match arm by the short name of the `Optional::Some` enum variant. */
export interface OptionalMatchSomeShortName<T, R = DefaultMatchResult> {
  readonly [names.some.short]: (value: T) => R;
}

/** The match arm by full name of the `Optional::None` enum variant. */
export interface OptionalMatchNoneFullName<R = DefaultMatchResult> {
  readonly [names.none.long]: () => R;
}

/** The match arm by the short name of the `Optional::None` enum variant. */
export interface OptionalMatchNoneShortName<R = DefaultMatchResult> {
  readonly [names.none.short]: () => R;
}

/** The match arms by full name of the `Optional` enum variant. */
export type OptionalMatchFullName<
  T extends BaseType,
  SomeReturn = DefaultMatchResult,
  NoneReturn = DefaultMatchResult,
> = OptionalMatchSomeFullName<T, SomeReturn> & OptionalMatchNoneFullName<NoneReturn>;

/** The match arms by full name of the `Optional` enum variant. */
export type OptionalMatchShortName<
  T,
  SomeReturn = DefaultMatchResult,
  NoneReturn = DefaultMatchResult,
> = OptionalMatchSomeShortName<T, SomeReturn> & OptionalMatchNoneShortName<NoneReturn>;

/** The possible variations of the arms for the `Optional.match` function. */
export type OptionalMatchArms<
  T extends BaseType,
  SomeReturn = DefaultMatchResult,
  NoneReturn = DefaultMatchResult,
> =
  | OptionalMatchFullName<T, SomeReturn, NoneReturn>
  | OptionalMatchShortName<T, SomeReturn, NoneReturn>;
