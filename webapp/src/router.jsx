import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'dva/router';

import Layout from './layout';
import Home from './routers/home';

export const ROUTER_INFO = [
  {
    path: '',
    component: Home,
  }
];

const router = ({ history }) => (
  <Router history={history}>
    <Route path="/">
      <Layout />
    </Route>
  </Router>
);

router.propTypes = {
  history: PropTypes.object.isRequired
};

export default router;
