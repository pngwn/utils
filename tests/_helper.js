export async function timer(ms) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
