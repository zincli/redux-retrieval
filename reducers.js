'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrievedConditions = retrievedConditions;
exports.retrievedResult = retrievedResult;
exports.asyncProcessing = asyncProcessing;

var _actions = require('./actions');

function retrievedConditions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.TYPES.RECORD_CONDITIONS:
      return action.payload;
    default:
      return state;
  }
}

function retrievedResult() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.TYPES.RETRIEVE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function asyncProcessing() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.TYPES.RETRIEVE:
    case _actions.TYPES.TURN_PAGE:
      return true;
    case _actions.TYPES.RETRIEVE_SUCCESS:
    case _actions.TYPES.RETRIEVE_ERROR:
      return false;
    default:
      return state;
  }
}

exports.default = {
  retrievedConditions: retrievedConditions,
  retrievedResult: retrievedResult,
  asyncProcessing: asyncProcessing
};