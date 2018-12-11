import test from 'ava';
import { merge } from '../src/merge';

test('add keys in target that do not exist at the root', t => {
  const src = { key1: 'value1', key2: 'value2' };
  const target = {};

  const res = merge(target, src);

  t.deepEqual(res, src);
});

test('merge should be immutable', t => {
  const src = { key1: 'value1', key2: 'value2' };
  const target = {};

  merge(target, src);

  t.deepEqual(target, {}, 'merge should be immutable');
});

test('merge existing simple keys in target at the roots', t => {
  const src = { key1: 'changed', key2: 'value2' };
  const target = { key1: 'value1', key3: 'value3' };

  const expected = {
    key1: 'changed',
    key2: 'value2',
    key3: 'value3',
  };

  t.deepEqual(merge(target, src), expected);
});

test('merge nested objects into target', t => {
  const src = {
    key1: {
      subkey1: 'changed',
      subkey3: 'added',
    },
  };
  const target = {
    key1: {
      subkey1: 'value1',
      subkey2: 'value2',
    },
  };

  const expected = {
    key1: {
      subkey1: 'changed',
      subkey2: 'value2',
      subkey3: 'added',
    },
  };

  t.deepEqual(merge(target, src), expected);
});

test('replace simple key with nested object in target', t => {
  const src = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
  };
  const target = {
    key1: 'value1',
    key2: 'value2',
  };

  const expected = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
    key2: 'value2',
  };

  t.deepEqual(merge(target, src), expected);
});

test('should add nested object in target', t => {
  const src = {
    b: {
      c: {},
    },
  };

  const target = {
    a: {},
  };

  const expected = {
    a: {},
    b: {
      c: {},
    },
  };
  t.deepEqual(merge(target, src), expected);
});

test('should replace object with simple key in target', t => {
  const src = { key1: 'value1' };
  const target = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
    key2: 'value2',
  };

  const expected = { key1: 'value1', key2: 'value2' };

  t.deepEqual(target, {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
    key2: 'value2',
  });
  t.deepEqual(merge(target, src), expected);
});

test('should replace objects with arrays', t => {
  const target = { key1: { subkey: 'one' } };
  const src = { key1: ['subkey'] };
  const expected = { key1: ['subkey'] };

  t.deepEqual(merge(target, src), expected);
});

test('should replace arrays with objects', t => {
  const target = { key1: ['subkey'] };
  const src = { key1: { subkey: 'one' } };
  const expected = { key1: { subkey: 'one' } };

  t.deepEqual(merge(target, src), expected);
});

test('should replace dates with arrays', t => {
  const target = { key1: new Date() };
  const src = { key1: ['subkey'] };
  const expected = { key1: ['subkey'] };

  t.deepEqual(merge(target, src), expected);
});

test('should replace null with arrays', t => {
  const target = {
    key1: null,
  };

  const src = {
    key1: ['subkey'],
  };

  const expected = {
    key1: ['subkey'],
  };

  t.deepEqual(merge(target, src), expected);
});

test('should work on array properties', t => {
  const src = {
    key1: ['one', 'three'],
    key2: ['four'],
  };
  const target = {
    key1: ['one', 'two'],
  };

  const expected = {
    key1: ['one', 'two', 'one', 'three'],
    key2: ['four'],
  };

  t.deepEqual(merge(target, src), expected);
});

test('should treat regular expressions like primitive values', t => {
  const target = { key1: /abc/ };
  const src = { key1: /efg/ };
  const expected = { key1: /efg/ };

  t.deepEqual(merge(target, src), expected);
  t.deepEqual(merge(target, src).key1.test('efg'), true);
  // t.end()
});

test('should treat dates like primitives', t => {
  const monday = new Date('2016-09-27T01:08:12.761Z');
  const tuesday = new Date('2016-09-28T01:18:12.761Z');

  const target = {
    key: monday,
  };
  const source = {
    key: tuesday,
  };

  const expected = {
    key: tuesday,
  };
  const actual = merge(target, source);

  t.deepEqual(actual, expected);
  t.is(actual.key.valueOf(), tuesday.valueOf());
});

test('should overwrite values when property is initialised but undefined', t => {
  const target1 = { value: [] };
  const target2 = { value: null };
  const target3 = { value: 2 };

  const src = { value: undefined };

  function hasUndefinedProperty(o) {
    t.truthy(o.hasOwnProperty('value'));
    t.is(o.value, undefined);
  }

  hasUndefinedProperty(merge(target1, src));
  hasUndefinedProperty(merge(target2, src));
  hasUndefinedProperty(merge(target3, src));
});

test('can merge an arbitrary number of objects', t => {
  const src1 = { key1: 'monday' };
  const src2 = { key2: 'tuesday' };
  const src3 = { key3: 'thursday' };
  const src4 = {
    key2: 'hoolabaloola',
    key4: {
      key5: 'hi-dee-hoo',
    },
  };

  const expected = {
    key1: 'monday',
    key2: 'hoolabaloola',
    key3: 'thursday',
    key4: {
      key5: 'hi-dee-hoo',
    },
  };

  t.deepEqual(merge(src1, src2, src3, src4), expected);
});
