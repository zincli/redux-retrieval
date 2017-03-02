import { delay } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import retrieveSaga from 'redux-retrieval/sagas';
import { TYPES } from 'redux-retrieval/actions';
import { reset } from 'redux-form';
import { retrieve } from 'sharing/mock-server';

export default function* rootSaga() {
  yield [
    retrieveSaga({
      service: { retrieve: mockRetrieve },
    }),
    takeLatest(TYPES.RETRIEVE_SUCCESS, resetForm),
    takeLatest(TYPES.RETRIEVE_ERROR, notifyError),
  ];
}

export function* mockRetrieve(conditions, { pageNumber }) {
  console.log('mock api calling: ', conditions, pageNumber);
  return yield delay(600, retrieve({
    ...conditions,
    pageNumber,
  }));
}

export function notifyError() {
  console.log('retrieve error');
}

export function* resetForm() {
  yield put(reset('conditions'));
}
