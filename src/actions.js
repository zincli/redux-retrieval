import { createAction } from 'redux-actions';
import types from './types';

export const TYPES = types(
  'RETRIEVE',
  'RETRIEVE_SUCCESS',
  'RETRIEVE_ERROR',
  'RECORD_CONDITIONS',
  'RE_RETRIEVE',
  'TURN_PAGE',

  'ASYNC_PROCESS_START',
  'ASYNC_PROCESS_END'
);

export const retrieve = createAction(TYPES.RETRIEVE, undefined, (_, meta) => meta);
export const retrieveSuccess = createAction(TYPES.RETRIEVE_SUCCESS);
export const retrieveError = createAction(TYPES.RETRIEVE_ERROR);
export const recordConditions = createAction(TYPES.RECORD_CONDITIONS);
export const reRetrieve = createAction(TYPES.RE_RETRIEVE);
export const turnPage = createAction(TYPES.TURN_PAGE);

export const asyncProcessStart = createAction(TYPES.ASYNC_PROCESS_START);
export const asyncProcessEnd = createAction(TYPES.ASYNC_PROCESS_END);
