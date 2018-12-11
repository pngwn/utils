interface O {
  [x: string]: any;
}

const isObject = (obj: O): boolean =>
  obj &&
  typeof obj === 'object' &&
  !Array.isArray(obj) &&
  !(obj instanceof RegExp) &&
  !(obj instanceof Date);

export function merge(...objects: O[]): O {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = merge(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}
