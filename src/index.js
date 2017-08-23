import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/app.css';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
