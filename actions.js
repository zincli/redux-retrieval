'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchTab = exports.switchPageSize = exports.turnPage = exports.reRetrieve = exports.recordConditions = exports.retrieveError = exports.retrieveSuccess = exports.retrieve = exports.TYPES = undefined;

var _reduxActions = require('redux-actions');

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPES = exports.TYPES = (0, _types2.default)('RETRIEVE', 'RETRIEVE_SUCCESS', 'RETRIEVE_ERROR', 'RECORD_CONDITIONS', 'RE_RETRIEVE', 'TURN_PAGE', 'SWITCH_PAGE_SIZE', 'SWITCH_TAB');

var retrieve = exports.retrieve = (0, _reduxActions.createAction)(TYPES.RETRIEVE, undefined, getMeta);
var retrieveSuccess = exports.retrieveSuccess = (0, _reduxActions.createAction)(TYPES.RETRIEVE_SUCCESS);
var retrieveError = exports.retrieveError = (0, _reduxActions.createAction)(TYPES.RETRIEVE_ERROR);
var recordConditions = exports.recordConditions = (0, _reduxActions.createAction)(TYPES.RECORD_CONDITIONS);
var reRetrieve = exports.reRetrieve = (0, _reduxActions.createAction)(TYPES.RE_RETRIEVE);
var turnPage = exports.turnPage = (0, _reduxActions.createAction)(TYPES.TURN_PAGE, undefined, getMeta);
var switchPageSize = exports.switchPageSize = (0, _reduxActions.createAction)(TYPES.SWITCH_PAGE_SIZE, undefined, getMeta);
var switchTab = exports.switchTab = (0, _reduxActions.createAction)(TYPES.SWITCH_TAB, undefined, getMeta);

function getMeta(_, meta) {
  return meta || {};
}