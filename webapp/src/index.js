import 'babel-polyfill';
import dva from 'dva';

// import some configurations for antd
import './antd.config';
// import prism styles for highlighting
import 'prismjs/themes/prism-okaidia.css';

import router from './router';
import menu from './models/menu';
import acpair from './models/acpair';

const app = dva();

// models
app.model(menu);
app.model(acpair);

// router
app.router(router);

// here we go
app.start('#root');
