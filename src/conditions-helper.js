export function calculateConditions(options = {}, payload = {}, { explicit, implicit, page }) {

  let conditions;
  let implicitConditions = implicit;

  if (options.implicitly) {
    // this might need to refactor to support attach/drop/replace
    implicitConditions = {
      ...implicit,
      ...payload,
    };

    if (options.keepExplicit) {
      conditions = explicit;
    }
  } else {
    if (options.attach) {
      conditions = attach(explicit, payload);
    } else if (options.update) {
      conditions = update(explicit, payload);
    } else if (options.drop) {
      conditions = drop(explicit, payload);
    } else {
      conditions = payload;
    }
  }

  return {
    explicit: conditions,
    implicit: implicitConditions,
    // The page parameter is kind of special.
    // It would be reset in some cases but also need to reuse the current value
    // in other cases.
    page: options.implicitly && ( options.page || page ),
  };
}

export function attach(src, target) {
  return merge(src, target, (key, result) => {
    if (key in src) {
      if (Array.isArray(src[key])) {
        result[key] = src[key].concat(target[key]);
      } else {
        result[key] = [src[key], target[key]];
      }
    } else {
      result[key] = target[key];
    }
  });
}

export function update(src, target) {
  return merge(src, target, (key, result) => {
    result[key] = target[key];
  });
}

export function drop(src, target) {
  return merge(src, target, (key, result) => {
    if (key in src) {
      if (Array.isArray(src[key])) {
        result[key] = src[key].filter(value => value !== target[key]);
      } else {
        delete result[key];
      }
    }
  });
}

function merge(src, target, handler) {
  const result = { ...src };

  Object.keys(target).forEach((key) => {
    handler(key, result);
  });

  return result;
}
