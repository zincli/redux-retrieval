"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeArray = makeArray;
/**
 * transform object conditions into array conditions
 * @param  {Object} conditions
 * @return {Object[]}
 */
function makeArray(conditions) {
  var result = [];

  Object.keys(conditions).forEach(function (name) {
    var value = conditions[name];

    if (Array.isArray(value)) {
      value.forEach(function (val) {
        return result.push({ name: name, value: val });
      });
    } else {
      result.push({ name: name, value: value });
    }
  });

  return result;
}

exports.default = {
  makeArray: makeArray
};