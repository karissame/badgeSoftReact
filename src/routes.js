'use strict';

import React from 'react'
import { Route, Router, IndexRoute, browserHistory} from 'react-router'
import Layout from './components/Layout';
import Previewer from './components/Previewer';
import NotFoundPage from './components/NotFoundPage';
//<Route path="athlete/:id" component={IndexPage}/>

const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}/>
      <Route path="/preview" component={Previewer}/>
    </Router>
);

export default routes;
