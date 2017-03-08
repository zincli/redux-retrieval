import { take, takeLatest, put, call, select } from 'redux-saga/effects';
import {
  TYPES,
  retrieve,
  retrieveSuccess,
  retrieveError,
  recordConditions,
} from './actions';
import { calculateConditions } from './conditions-helper';

export const defaultOptions = {
  retrievedConditionsSelector: state => state.retrievedConditions,
  service: {},
};

/**
 * listen to all actions need to be handled
 * @param  {Object}    [options={}]
 * @param  {String}    [options.pageNumberParam='pageNumber'] - the parameter name of page number for retrieval api
 * @param  {Function}  [options.retrievedConditionsSelector=state => state.retrievedConditions] - the selector for picking up retrievedConditions in state
 * @return {Generator}              [description]
 */
export default function* watchRetrievalActions(options = {}) {
  options = { ...defaultOptions, ...options };
  yield [
    takeLatest(TYPES.RETRIEVE, handleRetrieve, options),
    takeLatest(TYPES.RE_RETRIEVE, handleReRetrieve),
    takeLatest(TYPES.TURN_PAGE, handleTurnPage),
    takeLatest(TYPES.SWITCH_PAGE_SIZE, handleSwitchPageSize),
    takeLatest(TYPES.SWITCH_TAB, handleSwitchTab),
  ]
}

export function* handleRetrieve(options, action) {
  const { payload, meta } = action;
  const { service, retrievedConditionsSelector } = options;

  try {
    const retrievedConditions = yield select(retrievedConditionsSelector);
    const { explicit, implicit, page } = yield call(calculateConditions, meta, payload, retrievedConditions);
    const retrievedResult = yield call(
      [service, service.retrieve],
      {
        ...explicit,
        ...implicit,
      },
      { page }
    );
    yield put(retrieveSuccess(retrievedResult));
    yield put(recordConditions({ explicit, implicit, page }));
  } catch (e) {
    yield put(retrieveError(e));
  }
}

export function* handleReRetrieve() {
  yield put(retrieve({}, { implicitly: true, keepExplicit: true }));
}

export function* handleTurnPage({ payload }) {
  yield put(retrieve({}, { implicitly: true, keepExplicit: true, page: payload }));
}

export function* handleSwitchPageSize({ payload, meta }) {
  yield put(retrieve({ [meta.name || 'pageSize']: payload }, { implicitly: true, keepExplicit: true, page: 1 }));
}

export function* handleSwitchTab({ payload, meta }) {
  yield put(retrieve({ [meta.name || 'tab']: payload }, { implicitly: true, page: 1 }));
}
