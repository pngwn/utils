export function delay(ms, fn) {
  return new Promise(res => {
    setTimeout(() => {
      if (fn) fn();
      res();
    }, ms);
  });
}
