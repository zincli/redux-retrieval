import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { retrieve } from 'sharing/mock-server';
import App from './containers';
import initStore from './store';

const store = initStore({ appData: retrieve({}) });

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
