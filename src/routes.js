'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
//<Route path="athlete/:id" component={IndexPage}/>

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Layout}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
