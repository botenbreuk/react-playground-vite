export function mergeArrays<T>(...arrays: T[][]) {
  let jointArray: T[] = [];

  arrays.forEach(array => {
    jointArray = [...jointArray, ...array];
  });
  return [...new Set([...jointArray])];
}

export function arrayEquals(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }

  const elements = new Set([...a, ...b]);
  for (const x of elements) {
    const count1 = a.filter(e => e === x).length;
    const count2 = b.filter(e => e === x).length;
    if (count1 !== count2) {
      return false;
    }
  }

  return true;
}

export function sort<T>(
  v: keyof T | ((v: T) => string | number),
  order: 'asc' | 'desc' = 'asc'
) {
  function value(t: T) {
    if (typeof v === 'function') {
      return v(t);
    }

    return t[v];
  }

  return (a: T, b: T) => {
    const aValue = value(a);
    const bValue = value(b);

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  };
}
