# futilities

Simple utility functions for when you need a simple utility function. Tree shakeable and stuff.

They don't handle all edge cases but are mostly sufficient.

## Install

```bash
yarn add futilities

# or

npm i futilities
```

## functions

### `merge`

`merge(obj1, obj2, obj3, ...)`

Deep merge for objects (not arrays). Can take many objects as parameters. Concatenates arrays, treats Date and RegExp as primitives. Immutable. Returns an object.

```js
import { merge } from 'futilities';

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

// obj3 overwrites obj2 which overwrites obj1 when merges are not possible
const merged = merge(obj1, obj2, obj3);

merged === {
  key1: /efg/,
  key2: [1, 2, 3, 4, 5, 6]
  key3: { key4: 'hello', key5: 'bye' },
  key99: 'i\'m extra'
};

// check the tests for more examples/ information on what it can do
```
