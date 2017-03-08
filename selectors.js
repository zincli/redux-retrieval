'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeArray = makeArray;
exports.explicit = explicit;
exports.conditions = conditions;
exports.page = page;

var _sagas = require('./sagas');

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

function explicit(retrievedConditions) {
  return retrievedConditions.explicit;
}

function conditions(state) {
  return makeArray(explicit(_sagas.defaultOptions.retrievedConditionsSelector(state)));
}

function page(state) {
  return _sagas.defaultOptions.retrievedConditionsSelector(state).page;
}

exports.default = {
  makeArray: makeArray,
  explicit: explicit,
  conditions: conditions,
  page: page
};