import { defaultOptions } from './sagas';

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

export function explicit(retrievedConditions) {
  return retrievedConditions.explicit;
}

export function conditions(state) {
  return makeArray(explicit(defaultOptions.retrievedConditionsSelector(state)));
}

export function page(state) {
  return defaultOptions.retrievedConditionsSelector(state).page;
}

export default ({
  makeArray,
  explicit,
  conditions,
  page,
})
