'use strict';

import React from 'react'
import { Route, Router, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import Previewer from './components/Previewer';
import NotFoundPage from './components/NotFoundPage';
//<Route path="athlete/:id" component={IndexPage}/>

const routes = (
    <Router>
  <Route path="/" component={Layout}>
    <IndexRoute component={Layout}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
  <Route path="/preview" component={Previewer}/>
  </Router>
);

export default routes;
