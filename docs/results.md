# Results

Results are for when you know a function can fail:

```TypeScript
// So instead of this signature:
type function = (...) => string;

// You can have this:
type function = (...) => Result<string>;
```

However, a function that returns a result should never throw. This allows a user to skip the `try` and `catch` blocks.

## Control Flows

There are several ways to create control flows for this. 

### Match Arms

One is match arms:

```TypeScript
import { Result } from '...';

let result: Result<T, E>;

result.match({
  [Result.OKAY]: (value: T) => console.log(value),
  [Result.ERROR]: (error: E) => console.error(error),
});
```

You can even return `match` statements!

```TypeScript
import { Result } from '...';

function multiply<E>(result: Result<number, E>): Result<number, E> {
  return result.match({
    [Result.ERROR]: (error) => Result.error(error),
    [Result.OKAY]: (value) => Result.okay(value * 2),
  });
}
```

### Is Variant Functions

There is also the `isOkay()` and `isError()` functions:

```TypeScript
import { Result } from '...';

let result: Result<T, E>;

if (result.isOkay()) {
  console.log(result.value),
} 

else if (result.isError()) {
  console.error(result.error),
}

else {
  // unreachable statement
}
```

### Instance Checks

Lastly there is instance matching:

```TypeScript
import { Result } from '...';

let result: Result<T>;

if (result instanceof Result.Okay) {
  console.log(result.value),
} 

if (result instanceof Result.Error) {
  console.error(result.error),
}

if (result instanceof Result.Class) {
  // check if okay or error
}
```

## Creating

There are several ways to create instances of `Result`s. Even if you don't control the functions signature for example.

### Exec

The `Result.exec` function wraps execution of a function and always returns an `Result` even if the function throws:

```TypeScript
import { Result } from '...';
import myFunction from '...';

let result = Result.exec(myFunction, ...);
```

Where it takes the arguments that function would take, fully typed:

```TypeScript
import { Result } from '...';

function divide(a: number, b: number): number | null;

let result = Result.exec(divide, 1, 2); // Okay!
let result = Result.exec(divide, 1, '3'); // Error: string is not a number
let result = Result.exec(divide, 1); // Error: missing argument
let result = Result.exec(divide, 1, 2, 3); // Error: too many arguments
```

### Okay and Error functions

You can also create `Result`s when you do control the signature:

```TypeScript
import { Result } from '...';

function divide(a: number, b: number): Result<number> {
  if (b === 0) return Result.error('Cannot divide by zero');
  else return Result.okay(a / b);
}
```

Chose either a string to create a base error class instance, or pick a specific class:

```TypeScript
class MyError extends Error {}
const instance = new MyError('a message on what went wrong');
Result.error(instance);
```

### From function

You can also let prevent regular try/catch patterns using `Result.fromThrown`:

```TypeScript
function maybe<T>(a: T): Result<T> {
  try {
    ...
  } catch (error) {
    const fallback = 'in case `error` is not a string or error instance';
    return Result.fromThrown(error, fallback);
  }
}
```
