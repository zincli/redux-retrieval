import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { retrieveSuccess } from 'redux-retrieval/actions';
import App from './containers';
import initStore from './store';
import { find } from './mock-server';

const store = initStore();

store.dispatch(retrieveSuccess(find({})));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
