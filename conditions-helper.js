"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.calculateConditions = calculateConditions;
exports.attach = attach;
exports.update = update;
exports.drop = drop;
function calculateConditions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _ref = arguments[2];
  var explicit = _ref.explicit,
      implicit = _ref.implicit,
      page = _ref.page;


  var conditions = void 0;
  var implicitConditions = implicit;

  if (options.implicitly) {
    // this might need to refactor to support attach/drop/replace
    implicitConditions = _extends({}, implicit, payload);

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
    page: options.implicitly && (options.page || page)
  };
}

function attach(src, target) {
  return merge(src, target, function (key, result) {
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

function update(src, target) {
  return merge(src, target, function (key, result) {
    result[key] = target[key];
  });
}

function drop(src, target) {
  return merge(src, target, function (key, result) {
    if (key in src) {
      if (Array.isArray(src[key])) {
        result[key] = src[key].filter(function (value) {
          return value !== target[key];
        });
      } else {
        delete result[key];
      }
    }
  });
}

function merge(src, target, handler) {
  var result = _extends({}, src);

  Object.keys(target).forEach(function (key) {
    handler(key, result);
  });

  return result;
}