export function throttle(
  fn: Function,
  waitTime: number = 0,
  callImmediately: boolean = false
) {
  if (typeof fn !== 'function') {
    throw new Error(`Expected a function, instead got: ${fn}`);
  }
  let wait = false;
  let call = false;
  return function() {
    call = callImmediately && !wait;
    if (!wait) {
      wait = true;
      setTimeout(() => {
        wait = false;
        if (!callImmediately) {
          //@ts-ignore
          return fn.apply(this, arguments);
        }
      }, waitTime);
    }
    if (call || waitTime <= 0) {
      call = false;
      //@ts-ignore
      return fn.apply(this, arguments);
    }
  };
}
