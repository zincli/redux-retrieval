import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers';

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(

  )
)(createStore);


export default function initialize(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
