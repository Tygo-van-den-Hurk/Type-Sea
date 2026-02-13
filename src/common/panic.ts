/** A class for panic we something happens */
export class PanicAble {
  static #PANICS = false;

  #panics: boolean | null = null;

  /**
   * Wether or not to panic when an unwrap is called on invalid data. Would crash the program without catching. If
   * turned off, throws an error instead. Override this setting using the instance field as that will take priority.
   */
  public static get panics(): boolean {
    return PanicAble.#PANICS;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public static set panics(value: boolean) {
    PanicAble.#PANICS = value;
  }

  /**
   * Wether or not to panic when an unwrap is called on invalid data. Would crash the program without catching. If
   * turned off, throws an error instead. Overrides the global setting. The instance field takes priority.
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public get panics(): boolean {
    return this.#panics ?? PanicAble.#PANICS;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public set panics(value: boolean) {
    this.#panics = value;
  }
}
