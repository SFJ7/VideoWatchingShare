import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware} from "redux";
import reducers from './reducers';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const middleware = [ReduxThunk]

const store = createStore(reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
