import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import {askPermission, subscribeUser} from './subsription'

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();
askPermission().then(subscribeUser);