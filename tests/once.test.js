import test from 'ava';
import { once } from '../src/once';

test('should return a function', t => {
  t.is(typeof once(() => {}), 'function');
});

test('should call the function callback', t => {
  const fn = once(() => 'i was called');
  const called = fn();
  t.is(called, 'i was called');
});

test('should call the function callback only once', t => {
  let counter = 0;
  const fn = once(() => counter++);
  fn();
  fn();

  t.is(counter, 1);
});

test('functions can take arguments', t => {
  const fn = once(str => str.toUpperCase());
  const called = fn('hello');
  t.is(called, 'HELLO');
});

test('functions can take many arguments', t => {
  const fn = once(
    (str, anotherstr, num, anothernum) =>
      `${str}-${anotherstr}-${num}-${anothernum}`
  );
  const called = fn('hello', 'friend', 1, 2);
  t.is(called, 'hello-friend-1-2');
});

test('subsequent calls should return the original return value', t => {
  const fn = once(str => str.toUpperCase());
  fn('hello');
  const called = fn('nothello');
  t.is(called, 'HELLO');
});

test('callback must be a function or it will throw', t => {
  t.plan(7);
  t.throws(() => once(undefined));
  t.throws(() => once(null));
  t.throws(() => once(false));
  t.throws(() => once([1, 2, 3]));
  t.throws(() => once({}));
  t.throws(() => once(1));
  t.throws(() => once('hello'));
});

test('error message should be helpful', t => {
  t.throws(
    () => once(undefined),
    'Expected a function, instead got: undefined'
  );
});
