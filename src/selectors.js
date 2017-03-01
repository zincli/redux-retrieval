/**
 * transform object conditions into array conditions
 * @param  {Object} conditions
 * @return {Object[]}
 */
export function makeArray(conditions) {
  const result = [];

  Object.keys(conditions).forEach((name) => {
    const value = conditions[name];

    if (Array.isArray(value)) {
      value.forEach(val => result.push({ name, value: val }));
    } else {
      result.push({ name, value });
    }
  });

  return result;
}

export default ({
  makeArray
})
