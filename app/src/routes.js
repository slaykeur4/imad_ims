'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LayoutAdmin from './components/admin/LayoutAdmin.js';
import IndexPageAdmin from './components/admin/IndexPageAdmin';
import AddProductPage from './components/admin/AddProductPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={LayoutAdmin}>
    <IndexRoute component={IndexPageAdmin}/>
    <Route path="product/add/" component={AddProductPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
