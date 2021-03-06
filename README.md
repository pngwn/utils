# utils

Simple utility functions for when you need a simple utility function. Tree shakeable, TS definitions and stuff.

They don't handle all edge cases but are mostly sufficient. Tests will give tell you what each function is supposed to cover. I add them as I need them.

## Install

```bash
yarn add @pngwn/utils
# or
npm i @pngwn/utils
```

## functions

- [debounce](#debounce) - squish multiple function calls into one
- [merge](#merge) - deep merge for objects.
- [once](#once) - call a function only once.
- [throttle](#throttle) - call a fuction nor more than every x ms

### `debounce`

`debounce(callbackFn, waitTime = 0, callImmediately = false)`

Squishes multiple function calls into one if those calls are within `n` milliseconds. Accepts 3 arguments: a function, a time in milliseconds and a boolean. The boolean dictates whether or not the function should be called immediately on first invocation. Only the Only the first argument(`callbackFn`) is required. Returns a function.

```js
import { debounce } from '@pngwn/utils';

let count = 0;
const inc = debounce(() => count++, 50, true);

inc(); // count === 1
inc(); // count === 1
inc(); // count === 1
// wait 50ms: `count === 2`

const error = debounce(undefined);
// Error: Expected a function, instead got: undefined
```

### `merge`

`merge(obj1, obj2, obj3, ...)`

Deep merge for objects (not arrays). Can take many objects as parameters. Concatenates arrays, treats Date and RegExp as primitives. Immutable. Returns an object.

```js
import { merge } from '@pngwn/utils';

const obj1 = {
  key1: /abc/,
  key2: [1, 2, 3]
  key3 : { key4: 'hello' }
};

const obj2 = {
  key1: /efg/,
  key2: [4, 5, 6]
  key3: { key5: 'bye' }
};

const obj3  { key99: 'i\'m extra' }

// when merges are not possible: `obj3` overwrites `obj2` which overwrites `obj1`
const merged = merge(obj1, obj2, obj3);

merged === {
  key1: /efg/,
  key2: [1, 2, 3, 4, 5, 6]
  key3: { key4: 'hello', key5: 'bye' },
  key99: 'i\'m extra'
};

// check the tests for more examples/ information on what it can do
```

### `once`

`once(callbackFn)`

Makes a function callable only once. Accepts a function as an argument. Subsequent calls to the function return the initial value which is stored after the first invocation. Returns a function.

```js
import { once } from '@pngwn/utils';

let count = 0;
const inc = once(() => count++);
inc(); // count === 1
inc(); // count === 1

const upper = once(str => str.toUpperCase());
const firstCall = upper('hello'); // 'HELLO'
const secondCall = upper('bejeesus'); // 'HELLO'

const error = once(undefined);
// Error: 'Expected a function, instead got: undefined'
```

### `throttle`

`throttle(callbackFn, interval = 0, callImmediately = false)`

Ensures a function is called no more than every n ms. Accepts 3 arguments: a function, a time in milliseconds and a boolean. The boolean dictates whether or not the function should be called immediately on first invocation. Only the Only the first argument(`callbackFn`) is required. Returns a function.

```js
import { throttle } from '@pngwn/utils';

let count = 0;
const inc = throttle(() => count++, 50, true);

// the boolean causes the function to be called immediately, then the timer starts
// omitting it will cause the function to fire at the end of the timer

inc(); // count === 1
inc(); // count === 1
inc(); // count === 1

const error = throttle(undefined);
// Error: Expected a function, instead got: undefined
```
