import type * as names from '#src/results/const';
import type { DefaultMatchResult } from '#src/common/types';

/** The default type that a `Result` has when successful. */
export type DefaultType = void; // eslint-disable-line @typescript-eslint/no-invalid-void-type

/** The default type that a `Result` has when unsuccessful. */
export type DefaultError = Error;

/** The type that the `Result` must extend when unsuccessful. */
export type JsError = Error;

/** The match arm by full name of the `Result::Error` enum variant. */
export interface ResultMatchErrorFullName<
  R = DefaultMatchResult,
  E extends JsError = DefaultError,
> {
  readonly [names.error.long]: (error: Readonly<E>) => R;
}

/** The match arm by full name of the `Result::Okay` enum variant. */
export interface ResultMatchOkayFullName<R = DefaultMatchResult, T = DefaultError> {
  readonly [names.okay.long]: (value: T) => R;
}

/** The match arms by full name of the `Result` enum variant. */
export type ResultMatchFullName<
  OkayReturn = DefaultMatchResult,
  ErrorReturn = DefaultMatchResult,
  T = DefaultError,
  E extends JsError = DefaultError,
> = ResultMatchOkayFullName<OkayReturn, T> & ResultMatchErrorFullName<ErrorReturn, E>;

/** The match arm by the short name of the `Result::Error` enum variant. */
export interface ResultMatchErrorShortName<
  R = DefaultMatchResult,
  E extends JsError = DefaultError,
> {
  readonly [names.error.short]: (error: Readonly<E>) => R;
}

/** The match arm by the short name of the `Result::Okay` enum variant. */
export interface ResultMatchOkayShortName<R = DefaultMatchResult, T = DefaultError> {
  readonly [names.okay.short]: (value: T) => R;
}

/** The match arms by full name of the `Result` enum variant. */
export type ResultMatchShortName<
  OkayReturn = DefaultMatchResult,
  ErrorReturn = DefaultMatchResult,
  T = DefaultError,
  E extends JsError = DefaultError,
> = ResultMatchOkayFullName<OkayReturn, T> & ResultMatchErrorFullName<ErrorReturn, E>;

/** The possible variations of the arms for the `Result.match` function. */
export type ResultMatchArms<
  OkayReturn = DefaultMatchResult,
  ErrorReturn = DefaultMatchResult,
  T = DefaultError,
  E extends JsError = DefaultError,
> =
  | ResultMatchFullName<OkayReturn, ErrorReturn, T, E>
  | ResultMatchShortName<OkayReturn, ErrorReturn, T, E>;
