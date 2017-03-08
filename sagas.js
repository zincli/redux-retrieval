'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = watchRetrievalActions;
exports.handleRetrieve = handleRetrieve;
exports.handleReRetrieve = handleReRetrieve;
exports.handleTurnPage = handleTurnPage;
exports.handleSwitchPageSize = handleSwitchPageSize;
exports.handleSwitchTab = handleSwitchTab;

var _effects = require('redux-saga/effects');

var _actions = require('./actions');

var _conditionsHelper = require('./conditions-helper');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked = [watchRetrievalActions, handleRetrieve, handleReRetrieve, handleTurnPage, handleSwitchPageSize, handleSwitchTab].map(regeneratorRuntime.mark);

var defaultOptions = exports.defaultOptions = {
  retrievedConditionsSelector: function retrievedConditionsSelector(state) {
    return state.retrievedConditions;
  },
  service: {}
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
          return [(0, _effects.takeLatest)(_actions.TYPES.RETRIEVE, handleRetrieve, options), (0, _effects.takeLatest)(_actions.TYPES.RE_RETRIEVE, handleReRetrieve), (0, _effects.takeLatest)(_actions.TYPES.TURN_PAGE, handleTurnPage), (0, _effects.takeLatest)(_actions.TYPES.SWITCH_PAGE_SIZE, handleSwitchPageSize), (0, _effects.takeLatest)(_actions.TYPES.SWITCH_TAB, handleSwitchTab)];

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function handleRetrieve(options, action) {
  var payload, meta, service, retrievedConditionsSelector, retrievedConditions, _ref, explicit, implicit, page, retrievedResult;

  return regeneratorRuntime.wrap(function handleRetrieve$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = action.payload, meta = action.meta;
          service = options.service, retrievedConditionsSelector = options.retrievedConditionsSelector;
          _context2.prev = 2;
          _context2.next = 5;
          return (0, _effects.select)(retrievedConditionsSelector);

        case 5:
          retrievedConditions = _context2.sent;
          _context2.next = 8;
          return (0, _effects.call)(_conditionsHelper.calculateConditions, meta, payload, retrievedConditions);

        case 8:
          _ref = _context2.sent;
          explicit = _ref.explicit;
          implicit = _ref.implicit;
          page = _ref.page;
          _context2.next = 14;
          return (0, _effects.call)([service, service.retrieve], _extends({}, explicit, implicit), { page: page });

        case 14:
          retrievedResult = _context2.sent;
          _context2.next = 17;
          return (0, _effects.put)((0, _actions.retrieveSuccess)(retrievedResult));

        case 17:
          _context2.next = 19;
          return (0, _effects.put)((0, _actions.recordConditions)({ explicit: explicit, implicit: implicit, page: page }));

        case 19:
          _context2.next = 25;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2['catch'](2);
          _context2.next = 25;
          return (0, _effects.put)((0, _actions.retrieveError)(_context2.t0));

        case 25:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[2, 21]]);
}

function handleReRetrieve() {
  return regeneratorRuntime.wrap(function handleReRetrieve$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.put)((0, _actions.retrieve)({}, { implicitly: true, keepExplicit: true }));

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

function handleTurnPage(_ref2) {
  var payload = _ref2.payload;
  return regeneratorRuntime.wrap(function handleTurnPage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.put)((0, _actions.retrieve)({}, { implicitly: true, keepExplicit: true, page: payload }));

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function handleSwitchPageSize(_ref3) {
  var payload = _ref3.payload,
      meta = _ref3.meta;
  return regeneratorRuntime.wrap(function handleSwitchPageSize$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.put)((0, _actions.retrieve)(_defineProperty({}, meta.name || 'pageSize', payload), { implicitly: true, keepExplicit: true, page: 1 }));

        case 2:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this);
}

function handleSwitchTab(_ref4) {
  var payload = _ref4.payload,
      meta = _ref4.meta;
  return regeneratorRuntime.wrap(function handleSwitchTab$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.put)((0, _actions.retrieve)(_defineProperty({}, meta.name || 'tab', payload), { implicitly: true, page: 1 }));

        case 2:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this);
}