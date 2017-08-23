import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './styles/app.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
