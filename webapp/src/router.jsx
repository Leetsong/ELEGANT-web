import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

import Layout from './layout';
import ELEGANT from './routers/elegant';
import Download from './routers/download';
import Docs from './routers/docs';
import Stats from './routers/stats';
import NotFound from './routers/404';

export const ROUTER_INFO = [
  {
    path: '/',
    component: ELEGANT,
    title: 'ELEGANT',
    exact: true
  },
  {
    path: '/download',
    component: Download,
    title: 'Download'
  },
  {
    path: '/stats',
    component: Stats,
    title: 'Stats'
  },
  {
    path: '/docs',
    component: Docs,
    title: 'Docs'
  },
  {
    component: NotFound
  }
];

const router = ({ history }) => (
  <Router history={history}>
    <Layout />
  </Router>
);

router.propTypes = {
  history: PropTypes.object.isRequired
};

export default router;
