import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { retrieve } from 'redux-retrieval/actions';
import App from './containers';
import initStore from './store';

const store = initStore();

store.dispatch(retrieve());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
