"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.attach = attach;
exports.update = update;
exports.drop = drop;
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