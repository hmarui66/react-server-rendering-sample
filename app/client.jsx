import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import AppContext from './AppContext';

ReactDOM.render(
  <Router history={browserHistory} render={(props) => <AppContext {...props}/>}>
    {routes}
  </Router>,
document.getElementById('app'))
