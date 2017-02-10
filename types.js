"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = types;
function types() {
  var result = {};

  for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
    names[_key] = arguments[_key];
  }

  names.forEach(function (name) {
    result[name] = "@@REDUX/RETRIEVAL/" + name;
  });

  return result;
}