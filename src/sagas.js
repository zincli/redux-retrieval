import { take, takeLatest, put, call, select } from 'redux-saga/effects';
import {
  TYPES,
  retrieveSuccess,
  retrieveError,
  recordConditions,
  asyncProcessStart,
  asyncProcessEnd,
} from './actions';
import { attach, update, drop } from './conditions-helper';
import { actionError } from './errors';

export const defaultOptions = {
  pageNumberParam: 'pageNumber',
  retrievedConditionsSelector: state => state.retrievedConditions
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
    takeLatest(TYPES.RE_RETRIEVE, handleReRetrieve, options),
    takeLatest(TYPES.TURN_PAGE, handleTurnPage, options),
  ]
}

export function* retrieve({ apiClient }, conditions) {
  try {
    yield put(asyncProcessStart());
    const retrievedResult = yield call([apiClient, apiClient.find], conditions);
    yield put(retrieveSuccess(retrievedResult));
    yield put(recordConditions(conditions));
  } catch (e) {
    yield put(retrieveError(e));
  } finally {
    yield put(asyncProcessEnd());
  }
}

export function* handleRetrieve(options, action) {
  const { payload, meta } = action;
  let conditions;

  if (meta && Object.keys(meta).length > 0) {
    const retrievedConditions = yield select(options.retrievedConditionsSelector);

    if (meta.attach) {
      conditions = attach(retrievedConditions, payload);
    } else if (meta.update) {
      conditions = update(retrievedConditions, payload);
    } else if (meta.drop) {
      conditions = drop(retrievedConditions, payload);
    } else {
      throw new Error(
        actionError(
          action,
          `unavailable meta options: ${JSON.stringify(action.meta)}`
        )
      );
    }
  } else {
    conditions = payload;
  }

  yield call(retrieve, options, {
    ...conditions,
    ...resetPaginationParams(options)
  });
}

export function* handleReRetrieve(options, action) {
  const conditions = yield select(options.retrievedConditionsSelector);
  yield call(retrieve, options, conditions);
}

export function* handleTurnPage(options, action) {
  const retrievedConditions = yield select(options.retrievedConditionsSelector);
  yield call(retrieve, options, {
    ...retrievedConditions,
    ...createPaginationParams(options, action.payload)
  });
}

function createPaginationParams(options, pageNumber) {
  return {
    [options.pageNumberParam]: pageNumber
  };
}

function resetPaginationParams(options) {
  return createPaginationParams(options, 1);
}
