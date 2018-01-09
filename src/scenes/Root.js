import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import notification from 'middlewares/notification';

import reducer from '../reducers/index';
import SelectModules from "./SelectModules";


const history = createBrowserHistory();
const enhancer = applyMiddleware(thunk, routerMiddleware(history), notification, logger);
const store = createStore(reducer, {}, enhancer);

class Root extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SelectModules {...this.props}/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
