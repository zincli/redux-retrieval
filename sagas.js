'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = watchRetrievalActions;
exports.retrieve = retrieve;
exports.handleRetrieve = handleRetrieve;
exports.handleReRetrieve = handleReRetrieve;
exports.handleTurnPage = handleTurnPage;

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _conditionsHelper = require('./conditions-helper');

var _errors = require('./errors');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked = [watchRetrievalActions, retrieve, handleRetrieve, handleReRetrieve, handleTurnPage].map(regeneratorRuntime.mark);

var defaultOptions = exports.defaultOptions = {
  pageNumberParam: 'pageNumber',
  retrievedConditionsSelector: function retrievedConditionsSelector(state) {
    return state.retrievedConditions;
  }
};

/**
 * listen to all actions need to be handled
 * @param  {Object}    [options={}]
 * @param  {String}    [options.pageNumberParam='pageNumber'] - the parameter name of page number for retrieval api
 * @param  {Function}  [options.retrievedConditionsSelector=state => state.retrievedConditions] - the selector for picking up retrievedConditions in state
 * @return {Generator}              [description]
 */
function watchRetrievalActions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return regeneratorRuntime.wrap(function watchRetrievalActions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _extends({}, defaultOptions, options);
          _context.next = 3;
          return [(0, _effects.takeLatest)(_actions.TYPES.RETRIEVE, handleRetrieve, options), (0, _effects.takeLatest)(_actions.TYPES.RE_RETRIEVE, handleReRetrieve, options), (0, _effects.takeLatest)(_actions.TYPES.TURN_PAGE, handleTurnPage, options)];

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function retrieve(_ref, conditions) {
  var apiClient = _ref.apiClient;
  var retrievedResult;
  return regeneratorRuntime.wrap(function retrieve$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.put)((0, _actions.asyncProcessStart)());

        case 3:
          _context2.next = 5;
          return (0, _effects.call)([apiClient, apiClient.find], conditions);

        case 5:
          retrievedResult = _context2.sent;
          _context2.next = 8;
          return (0, _effects.put)((0, _actions.retrieveSuccess)(retrievedResult));

        case 8:
          _context2.next = 10;
          return (0, _effects.put)((0, _actions.recordConditions)(conditions));

        case 10:
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 16;
          return (0, _effects.put)((0, _actions.retrieveError)(_context2.t0));

        case 16:
          _context2.prev = 16;
          _context2.next = 19;
          return (0, _effects.put)((0, _actions.asyncProcessEnd)());

        case 19:
          return _context2.finish(16);

        case 20:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 12, 16, 20]]);
}

function handleRetrieve(options, action) {
  var payload, meta, conditions, retrievedConditions;
  return regeneratorRuntime.wrap(function handleRetrieve$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          payload = action.payload, meta = action.meta;
          conditions = void 0;

          if (!(meta && Object.keys(meta).length > 0)) {
            _context3.next = 21;
            break;
          }

          _context3.next = 5;
          return (0, _effects.select)(options.retrievedConditionsSelector);

        case 5:
          retrievedConditions = _context3.sent;

          if (!meta.attach) {
            _context3.next = 10;
            break;
          }

          conditions = (0, _conditionsHelper.attach)(retrievedConditions, payload);
          _context3.next = 19;
          break;

        case 10:
          if (!meta.update) {
            _context3.next = 14;
            break;
          }

          conditions = (0, _conditionsHelper.update)(retrievedConditions, payload);
          _context3.next = 19;
          break;

        case 14:
          if (!meta.drop) {
            _context3.next = 18;
            break;
          }

          conditions = (0, _conditionsHelper.drop)(retrievedConditions, payload);
          _context3.next = 19;
          break;

        case 18:
          throw new Error((0, _errors.actionError)(action, 'unavailable meta options: ' + JSON.stringify(action.meta)));

        case 19:
          _context3.next = 22;
          break;

        case 21:
          conditions = payload;

        case 22:
          _context3.next = 24;
          return (0, _effects.call)(retrieve, options, _extends({}, conditions, resetPaginationParams(options)));

        case 24:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function handleReRetrieve(options, action) {
  var conditions;
  return regeneratorRuntime.wrap(function handleReRetrieve$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.select)(options.retrievedConditionsSelector);

        case 2:
          conditions = _context4.sent;
          _context4.next = 5;
          return (0, _effects.call)(retrieve, options, conditions);

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function handleTurnPage(options, action) {
  var retrievedConditions;
  return regeneratorRuntime.wrap(function handleTurnPage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.select)(options.retrievedConditionsSelector);

        case 2:
          retrievedConditions = _context5.sent;
          _context5.next = 5;
          return (0, _effects.call)(retrieve, options, _extends({}, retrievedConditions, createPaginationParams(options, action.payload)));

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function createPaginationParams(options, pageNumber) {
  return _defineProperty({}, options.pageNumberParam, pageNumber);
}

function resetPaginationParams(options) {
  return createPaginationParams(options, 1);
}