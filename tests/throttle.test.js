import test from 'ava';
import { delay } from './_helper';

import { throttle } from '../src/throttle';

test('returns a function', t => {
  t.is(typeof throttle(() => {}), 'function');
});

test('first argument must be a function or it will throw', t => {
  t.plan(7);
  t.throws(() => throttle(undefined));
  t.throws(() => throttle(null));
  t.throws(() => throttle(false));
  t.throws(() => throttle([1, 2, 3]));
  t.throws(() => throttle({}));
  t.throws(() => throttle(1));
  t.throws(() => throttle('hello'));
});

test('error message should be helpful', t => {
  t.throws(
    () => throttle(undefined),
    'Expected a function, instead got: undefined'
  );
});

test('called once after every n ms - #1', async t => {
  let count = 0;
  const inc = throttle(() => count++, 50);

  inc();
  await delay(40, () => inc());
  await delay(40, () => inc());

  t.is(count, 1);
});

test('called once after every n ms - #2', async t => {
  let count = 0;
  const inc = throttle(() => count++, 50);

  inc();
  await delay(40, () => inc());
  await delay(40, () => inc());
  await delay(50, () => inc());

  t.is(count, 2);
});

test('with `callImmediately` set to true, it runs immediately and then once every n ms - #1', async t => {
  let count = 0;
  const inc = throttle(() => count++, 50, true);

  inc();
  await delay(40, () => inc());
  await delay(40, () => inc());

  t.is(count, 2);
});

test('with `callImmediately` set to true, it runs immediately and then once every n ms - #2', async t => {
  let count = 0;
  const inc = throttle(() => count++, 50, true);

  inc();
  await delay(40, () => inc());
  await delay(40, () => inc());
  await delay(75, () => inc());

  t.is(count, 3);
});

test('call intervals greater than the interval time will call the function normally', async t => {
  let count = 0;
  const inc = throttle(() => count++, 50, true);

  inc();
  await delay(75, () => inc());
  await delay(75, () => inc());

  t.is(count, 3);
});

test('falsey or negative interval values cause the function to work normally', async t => {
  let count = 0;
  const inc = throttle(() => count++, 0, true);

  inc();
  inc();
  inc();
  t.is(count, 3);
});
