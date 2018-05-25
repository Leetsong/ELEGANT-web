import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

import Layout from './layout';
import ELEGANT from './routers/elegant';
import TryItOut from './routers/tryitout';
import Download from './routers/download';
import Docs from './routers/docs';
import Stats from './routers/stats';
import NotFound from './routers/404';

export const ROUTER_INFO = [
  {
    path: '/',
    component: ELEGANT,
    title: 'ELEGANT',
    exact: true,
    isMenu: false
  },
  {
    path: '/tryitout',
    component: TryItOut,
    title: 'Try it out',
    isMenu: true
  },
  {
    path: '/download',
    component: Download,
    title: 'Download',
    isMenu: true
  },
  {
    path: '/stats',
    component: Stats,
    title: 'Stats',
    isMenu: true
  },
  {
    path: '/docs',
    component: Docs,
    title: 'Docs',
    isMenu: true
  },
  {
    component: NotFound,
    isMenu: false
  }
];

// reverse index
ROUTER_INFO.homeIdx = 0;
ROUTER_INFO.tryItOutIdx = 1;
ROUTER_INFO.downloadIdx = 2;
ROUTER_INFO.statsIdx = 3;
ROUTER_INFO.docsIdx = 4;
ROUTER_INFO.notFoundIdx = 5;

// the router
const router = ({ history }) => (
  <Router history={history}>
    <Layout />
  </Router>
);

router.propTypes = {
  history: PropTypes.object.isRequired
};

export default router;
