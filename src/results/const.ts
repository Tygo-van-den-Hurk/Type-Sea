/** The name of the base result class. */
export const base = `Result` as const;

/** The names of the result okay class. */
export const okay = {
  /** The full name of the result none class. */
  long: `${base}::Okay`,
  /** The short name of the result none class. */
  short: `Okay`,
} as const;

/** The names of the result error class. */
export const error = {
  /** The full name of the result error class. */
  long: `${base}::Error`,
  /** The short name of the result error class. */
  short: `Error`,
} as const;
