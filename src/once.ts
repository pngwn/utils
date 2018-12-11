export function once(fn: Function): Function {
  if (typeof fn !== 'function') {
    throw new Error(`Expected a function, instead got: ${fn}`);
  }
  let value, called;
  return function wrappedFn() {
    if (called) return value;
    called = true;
    //@ts-ignore
    value = fn.apply(this, arguments);
    return value;
  };
}
