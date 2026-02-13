/** The name of the base optional class. */
export const base = `Optional` as const;

/** The names of the optional none class. */
export const none = {
  /** The full name of the optional none class. */
  long: `${base}::None`,
  /** The short name of the optional none class. */
  short: `None`,
} as const;

/** The names of the optional some class. */
export const some = {
  /** The full name of the optional some class. */
  long: `${base}::Some`,
  /** The short name of the optional some class. */
  short: `Some`,
} as const;
