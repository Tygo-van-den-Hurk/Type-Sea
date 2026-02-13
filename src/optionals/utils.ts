/** A class for when no such element exists */
export class NoSuchElementError extends Error {
  /** A class for when no such element exists */
  public constructor(message = 'No such element') {
    super(message);
    this.name = NoSuchElementError.name;
  }
}
