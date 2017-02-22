import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(
    sagaMiddleware
  )
)(createStore);


export default function initialize(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);
  return store;
}
