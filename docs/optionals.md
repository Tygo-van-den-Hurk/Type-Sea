# Optionals

Optionals are for when a value may or may not be nullish:

```TypeScript
// So instead of this signature:
type function = (...) => string | null;

// You can have this:
type function = (...) => Optional<string>;
```

The difference with this is that the user is forced to check wether or not the value exists before they can access it.
This prevents people from just using the value as if it is not nullish.

## Control Flows

There are several ways to create control flows for this.

### Match Arms

One is match arms:

```TypeScript
import { Optional } from '...';

let optional: Optional<T>;

optional.match({
  [Optional.NONE]: () => console.log('Nothing here'),
  [Optional.SOME]: (value) => console.log(value),
});
```

You can even return `match` statements!

```TypeScript
import { Optional } from '...';

function multiply(optional: Optional<number>): Optional<number> {
  return optional.match({
    [Optional.NONE]: () => Optional.none(),
    [Optional.SOME]: (value) => Optional.some(value * 2),
  });
}
```

### Is Variant Functions

There is also the `isSome()` and `isNone()` functions:

```TypeScript
import { Optional } from '...';

let optional: Optional<T>;

if (optional.isSome()) {
  console.log(optional.value),
} 

else if (optional.isNone()) {
  console.log('Nothing here'),
}

else {
  // unreachable statement
}
```

### Instance Checks

Lastly there is instance matching:

```TypeScript
import { Optional } from '...';

let optional: Optional<T>;

if (optional instanceof Optional.Some) {
  console.log(optional.value),
} 

if (optional instanceof Optional.None) {
  console.log('Nothing here'),
}

if (optional instanceof Optional.Class) {
  // check if some or none
}
```

## Creating

There are several ways to create instances of `Optional`s. Even if you don't control the functions signature for example.

### Exec

The `Optional.exec` function wraps execution of a function and always returns an `Optional`:

```TypeScript
import { Optional } from '...';
import myFunction from '...';

let optional = Optional.exec(myFunction, ...);
```

Where it takes the arguments that function would take, fully typed:

```TypeScript
import { Optional } from '...';

function divide(a: number, b: number): number | null;

let optional = Optional.exec(divide, 1, 2); // Okay!
let optional = Optional.exec(divide, 1, '3'); // Error: string is not a number
let optional = Optional.exec(divide, 1); // Error: missing argument
let optional = Optional.exec(divide, 1, 2, 3); // Error: too many arguments
```

### Some and None functions

You can also create `Optional`s when you do control the signature:

```TypeScript
import { Optional } from '...';

function divide(a: number, b: number): Optional<number> {
  if (b === 0) return Optional.none();
  else return Optional.some(a / b);
}
```

### From function

You can also let prevent regular if/else patterns using `from`:

```TypeScript
function maybe(a: number | null): Optional<number> {
  return Optional.from(a);
}
```

The `Optional` class will figure out of the value is nullish or not.

