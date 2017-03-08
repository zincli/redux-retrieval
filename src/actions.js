import { createAction } from 'redux-actions';
import types from './types';

export const TYPES = types(
  'RETRIEVE',
  'RETRIEVE_SUCCESS',
  'RETRIEVE_ERROR',
  'RECORD_CONDITIONS',
  'RE_RETRIEVE',
  'TURN_PAGE',
  'SWITCH_PAGE_SIZE',
  'SWITCH_TAB',
);

export const retrieve = createAction(TYPES.RETRIEVE, undefined, getMeta);
export const retrieveSuccess = createAction(TYPES.RETRIEVE_SUCCESS);
export const retrieveError = createAction(TYPES.RETRIEVE_ERROR);
export const recordConditions = createAction(TYPES.RECORD_CONDITIONS);
export const reRetrieve = createAction(TYPES.RE_RETRIEVE);
export const turnPage = createAction(TYPES.TURN_PAGE, undefined, getMeta);
export const switchPageSize = createAction(TYPES.SWITCH_PAGE_SIZE, undefined, getMeta);
export const switchTab = createAction(TYPES.SWITCH_TAB, undefined, getMeta);

function getMeta(_, meta) {
  return meta || {};
}
