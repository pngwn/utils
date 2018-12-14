import test from 'ava';
import { delay } from './_helper';

import { debounce } from '../src/debounce';

test('returns a function', t => {
  t.is(typeof debounce(() => {}), 'function');
});

test('first argument must be a function or it will throw', t => {
  t.plan(7);
  t.throws(() => debounce(undefined));
  t.throws(() => debounce(null));
  t.throws(() => debounce(false));
  t.throws(() => debounce([1, 2, 3]));
  t.throws(() => debounce({}));
  t.throws(() => debounce(1));
  t.throws(() => debounce('hello'));
});

test('error message should be helpful', t => {
  t.throws(
    () => debounce(undefined),
    'Expected a function, instead got: undefined'
  );
});

test('should execute callback after n milliseconds', async t => {
  t.plan(2);

  let count = 0;
  const fn = debounce(() => count++, 100);

  t.is(count, 0);

  await delay(50, () => fn());
  await delay(50, () => fn());
  await delay(50, () => fn());
  await delay(100);

  t.is(count, 1);
});

test('with `leading: true` should execute callback immediately and then after n milliseconds', async t => {
  t.plan(2);

  let count = 0;
  const fn = debounce(() => count++, 100, true);
  fn();
  t.is(count, 1);

  await delay(50, () => fn());
  await delay(50, () => fn());
  await delay(50, () => fn());
  await delay(100);

  t.is(count, 2);
});

test('invokes repeatedly when call interval > wait time', async t => {
  let count = 0;
  const fn = debounce(() => count++, 25);

  await delay(50, () => fn());
  await delay(50, () => fn());
  await delay(50, () => fn());
  await delay(100);

  t.is(count, 3);
});

test('invokes repeatedly when wait time === 0', t => {
  let count = 0;
  const fn = debounce(() => count++, 0);

  fn();
  fn();
  fn();

  t.is(count, 3);
});

test('invokes repeatedly when wait time is not set', t => {
  let count = 0;
  const fn = debounce(() => count++);

  fn();
  fn();
  fn();

  t.is(count, 3);
});

test('invokes repeatedly when wait time is a negative value (treated as 0)', t => {
  let count = 0;
  const fn = debounce(() => count++, -5);

  fn();
  fn();
  fn();

  t.is(count, 3);
});
