import React from 'react';
import Route from 'react-router';

import App from './App';
import Items from './Items';
import Users from './Users';

export default (
  <Route path="/" component={App}>
    <Route path="items" component={Items} />
    <Route path="users" component={Users} />
  </Route>
);
