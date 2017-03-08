import { handleAction } from 'redux-actions';
import { TYPES } from './actions';

const defaultRetrievedConditions = {
  explicit: {},
  implicit: {},
}

export const retrievedConditions = handleAction(
  TYPES.RECORD_CONDITIONS,
  (state, { payload = {} }) => ({
    explicit: payload.explicit || {},
    implicit: payload.implicit || {},
    page: payload.page,
  }),
  { explicit: {}, implicit: {}, page: undefined },
);

export function retrievedResult(state = {}, action = {}) {
  switch (action.type) {
    case TYPES.RETRIEVE_SUCCESS:
      return action.payload || {};
    default:
      return state;
  }
}

export function retrieving(state = false, action = {}) {
  switch (action.type) {
    case TYPES.RETRIEVE:
      return true;
    case TYPES.RETRIEVE_SUCCESS:
    case TYPES.RETRIEVE_ERROR:
      return false;
    default:
      return state;
  }
}

export default ({
  retrievedConditions,
  retrievedResult,
  retrieving,
});
