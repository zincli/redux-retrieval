'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrievedConditions = undefined;
exports.retrievedResult = retrievedResult;
exports.retrieving = retrieving;

var _reduxActions = require('redux-actions');

var _actions = require('./actions');

var defaultRetrievedConditions = {
  explicit: {},
  implicit: {}
};

var retrievedConditions = exports.retrievedConditions = (0, _reduxActions.handleAction)(_actions.TYPES.RECORD_CONDITIONS, function (state, _ref) {
  var _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? {} : _ref$payload;
  return {
    explicit: payload.explicit || {},
    implicit: payload.implicit || {},
    page: payload.page
  };
}, { explicit: {}, implicit: {}, page: undefined });

function retrievedResult() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.TYPES.RETRIEVE_SUCCESS:
      return action.payload || {};
    default:
      return state;
  }
}

function retrieving() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.TYPES.RETRIEVE:
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
  retrieving: retrieving
};