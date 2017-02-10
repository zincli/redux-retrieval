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
