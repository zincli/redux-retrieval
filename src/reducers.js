import { TYPES } from './actions';

export function retrievedConditions(state = {}, action = {}) {
  switch (action.type) {
    case TYPES.RECORD_CONDITIONS:
      return action.payload;
    default:
      return state;
  }
}

export function retrievedResult(state = {}, action = {}) {
  switch (action.type) {
    case TYPES.RETRIEVE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export function asyncProcessing(state = false, action = {}) {
  switch (action.type) {
    case TYPES.ASYNC_PROCESS_START:
      return true;
    case TYPES.ASYNC_PROCESS_END:
      return false;
    default:
      return state;
  }
}

export default ({
  retrievedConditions,
  retrievedResult,
  asyncProcessing,
});
