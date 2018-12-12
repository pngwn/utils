export function debounce(
  fn: Function,
  time: number = 0,
  leading: boolean = false
): Function {
  if (typeof fn !== 'function') {
    throw new Error(`Expected a function, instead got: ${fn}`);
  }
  let timeout = null;

  return function bouncy() {
    if (time < 1) {
      //@ts-ignore
      return fn.apply(this, arguments);
    }
    const callNow = leading && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      // istanbul ignore else
      if (!callNow) {
        //@ts-ignore
        return fn.apply(this, arguments);
      }
    }, time);

    if (callNow) {
      //@ts-ignore
      return fn.apply(this, arguments);
    }
  };
}
