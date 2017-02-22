import { delay } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import retrieveSaga from 'redux-retrieval/sagas';
import { TYPES } from 'redux-retrieval/actions';
import { reset } from 'redux-form';
import { find } from '../mock-server';

export default function* rootSaga() {
  yield [
    retrieveSaga({
      apiClient: { find: mockRetrieve },
    }),
    takeLatest(TYPES.RETRIEVE_SUCCESS, resetForm),
    takeLatest(TYPES.RETRIEVE_ERROR, notifyError),
  ];
}

export function* mockRetrieve(conditions) {
  console.log('mock api calling: ', conditions);
  return yield delay(600, find(conditions));
}

export function notifyError() {

}

export function* resetForm() {
  yield put(reset('conditions'));
}
